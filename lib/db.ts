import { weddingData as defaultData, WeddingData } from '@/data/wedding-data';
import { supabase } from '@/lib/supabase';

export async function getWeddingData(): Promise<WeddingData> {
    try {
        // Fetch dynamic wishes from Supabase
        const { data: wishesData, error: wishesError } = await supabase
            .from('wishes')
            .select('*')
            .order('timestamp', { ascending: false });

        // Fetch dynamic gallery from Supabase
        const { data: galleryData, error: galleryError } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (wishesError || galleryError) {
            console.error('Error fetching dynamic data from Supabase:', wishesError || galleryError);
        }

        // Merge default data with wishes and gallery from Supabase
        return {
            ...defaultData,
            wishes: wishesData && wishesData.length > 0 ? wishesData : defaultData.wishes,
            gallery: galleryData && galleryData.length > 0 
                ? galleryData.map((item: any, index: number) => ({ id: index + 1, url: item.url, caption: item.caption })) 
                : defaultData.gallery,
        };
    } catch (error) {
        console.error('Error in getWeddingData:', error);
        return defaultData;
    }
}

export async function updateWeddingData(newData: WeddingData): Promise<boolean> {
    return false; // Not supported on Vercel
}

export async function initDb() {
    // Not needed on Vercel
}
