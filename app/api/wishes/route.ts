import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('wishes')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Failed to fetch wishes from Supabase:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newWish = await request.json();

        // Basic validation
        if (!newWish.name || !newWish.attendance || !newWish.message) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('wishes')
            .insert([
                {
                    name: newWish.name,
                    attendance: newWish.attendance,
                    message: newWish.message,
                    timestamp: new Date().toISOString(),
                }
            ])
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Wish submission error to Supabase:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    // Protect route
    const cookieStore = await cookies();
    const token = (await cookieStore).get('admin_token');

    if (!token || token.value !== 'true') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'Missing wish ID' }, { status: 400 });
        }

        const { error } = await supabase
            .from('wishes')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Wish deletion error on Supabase:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
