import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token');

        if (!token || token.value !== 'true') {
            return NextResponse.json({ error: 'Sesi login habis. Silakan login ulang.' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
        }

        // Validasi ukuran file (Maks 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File terlalu besar. Maksimal 5MB.' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `img-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

        // 1. Upload ke Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('gallery')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: true
            });

        if (uploadError) {
            console.error('Storage Error:', uploadError);
            return NextResponse.json({ error: `Gagal simpan ke Storage: ${uploadError.message}` }, { status: 500 });
        }

        // 2. Ambil URL Publik
        const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(filename);

        // 3. Catat ke Database
        const { error: dbError } = await supabase
            .from('gallery')
            .insert([{ url: publicUrl, caption: file.name }]);

        if (dbError) {
            console.error('Database Error:', dbError);
            return NextResponse.json({ error: `Gagal catat ke Database: ${dbError.message}` }, { status: 500 });
        }

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: `Terjadi kesalahan: ${error.message}` }, { status: 500 });
    }
}
