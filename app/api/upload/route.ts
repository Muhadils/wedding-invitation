import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        // 1. Periksa Login (Next.js 15 way)
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token');

        if (!token || token.value !== 'true') {
            console.error('Unauthorized: No admin token found');
            return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `gallery-${Date.now()}-${file.name.replace(/\s/g, '_')}`;

        // 2. Upload ke Supabase Storage (Bucket: gallery)
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('gallery')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Supabase Storage Error:', uploadError);
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        // 3. Ambil URL Publik
        const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(filename);

        // 4. Catat di Database agar muncul di Gallery
        const { error: dbError } = await supabase
            .from('gallery')
            .insert([{ url: publicUrl, caption: file.name }]);

        if (dbError) {
            console.error('Supabase Database Error:', dbError);
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            url: publicUrl
        });
    } catch (error: any) {
        console.error('Global Upload Error:', error);
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
    }
}
