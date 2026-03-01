import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    // Protect route
    const cookieStore = await cookies();
    const token = (await cookieStore).get('admin_token');

    if (!token || token.value !== 'true') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Create unique filename
        const filename = `upload-${Date.now()}-${file.name.replace(/\s/g, '_')}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('gallery')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(filename);

        return NextResponse.json({
            success: true,
            url: publicUrl
        });
    } catch (error) {
        console.error('Supabase Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
