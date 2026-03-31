import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getWeddingData } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        // Gunakan getWeddingData agar mendapatkan data lengkap (Settings + Gallery + Wishes)
        const data = await getWeddingData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in GET /api/content:', error);
        return NextResponse.json({ message: 'Error fetching content' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token || token.value !== 'true') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const newData = await request.json();
        
        // Gunakan upsert agar data dibuat jika ID 1 belum ada
        const { error } = await supabase
            .from('wedding_settings')
            .upsert({
                id: 1, // Pastikan mengincar baris yang sama
                couple: newData.couple,
                events: newData.events,
                love_story: newData.loveStory,
                gifts: newData.gifts,
                music: newData.music,
                countdown: newData.countdown,
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Update settings error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
