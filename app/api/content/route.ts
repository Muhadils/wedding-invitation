import { NextResponse } from 'next/server';
import { getWeddingData, updateWeddingData } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
    // Protect route
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token || token.value !== 'true') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await getWeddingData();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    // Protect route
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token || token.value !== 'true') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const newData = await request.json();
        const success = await updateWeddingData(newData);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Failed to save' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
    }
}
