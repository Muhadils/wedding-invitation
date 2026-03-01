import { NextResponse } from 'next/server';
import { getWeddingData, updateWeddingData } from '@/lib/db';
import { WeddingData } from '@/data/wedding-data';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    try {
        const currentData: WeddingData = await getWeddingData();
        return NextResponse.json(currentData.wishes || []);
    } catch (error) {
        console.error('Failed to fetch wishes:', error);
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

        const currentData: WeddingData = await getWeddingData();
        
        // Ensure wishes array exists
        if (!currentData.wishes) {
            currentData.wishes = [];
        }

        // Add the new wish
        currentData.wishes.push({
            id: newWish.id || Date.now(),
            name: newWish.name,
            attendance: newWish.attendance,
            message: newWish.message,
            timestamp: newWish.timestamp || new Date().toISOString(),
        });

        // Save the updated data
        const success = await updateWeddingData(currentData);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Failed to save wish' }, { status: 500 });
        }
    } catch (error) {
        console.error('Wish submission error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    // Protect route
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token || token.value !== 'true') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'Missing wish ID' }, { status: 400 });
        }

        const currentData: WeddingData = await getWeddingData();
        
        if (!currentData.wishes) {
            return NextResponse.json({ message: 'No wishes to delete' }, { status: 404 });
        }

        const initialLength = currentData.wishes.length;
        currentData.wishes = currentData.wishes.filter(wish => wish.id !== id);

        if (currentData.wishes.length === initialLength) {
            return NextResponse.json({ message: 'Wish not found' }, { status: 404 });
        }

        // Save the updated data
        const success = await updateWeddingData(currentData);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Failed to delete wish' }, { status: 500 });
        }
    } catch (error) {
        console.error('Wish deletion error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
