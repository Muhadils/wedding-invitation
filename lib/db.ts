import { weddingData as defaultData, WeddingData } from '@/data/wedding-data';
import { supabase } from '@/lib/supabase';

export async function getWeddingData(): Promise<WeddingData> {
    try {
        // 1. Ambil Pengaturan Utama (Couple, Events, Music, dll)
        const { data: settings, error: settingsError } = await supabase
            .from('wedding_settings')
            .select('*')
            .maybeSingle();

        // 2. Ambil Ucapan (Wishes)
        const { data: wishesData, error: wishesError } = await supabase
            .from('wishes')
            .select('*')
            .order('timestamp', { ascending: false });

        // 3. Ambil Galeri (Gallery)
        const { data: galleryData, error: galleryError } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (settingsError || wishesError || galleryError) {
            console.error('Error fetching data from Supabase:', { settingsError, wishesError, galleryError });
        }

        // Helper function to safely parse and merge JSON data
        const safeData = (dbValue: any, defaultValue: any) => {
            if (!dbValue) return defaultValue;
            if (Array.isArray(dbValue) && dbValue.length === 0) return defaultValue;
            return dbValue;
        };

        // Merge Data with Fallbacks
        return {
            ...defaultData,
            couple: settings?.couple || defaultData.couple,
            events: safeData(settings?.events, defaultData.events),
            loveStory: safeData(settings?.love_story, defaultData.loveStory),
            gifts: safeData(settings?.gifts, defaultData.gifts),
            music: settings?.music || defaultData.music,
            countdown: settings?.countdown || defaultData.countdown,
            
            // Wishes & Gallery (Dinamis)
            wishes: Array.isArray(wishesData) ? wishesData : defaultData.wishes,
            gallery: Array.isArray(galleryData) && galleryData.length > 0 
                ? galleryData.map((item: any, index: number) => ({ 
                    id: index + 1, 
                    url: item.url, 
                    caption: item.caption || '' 
                })) 
                : defaultData.gallery,
        };
    } catch (error) {
        console.error('Error in getWeddingData:', error);
        return defaultData;
    }
}

export async function updateWeddingData(newData: WeddingData): Promise<boolean> {
    return false; // Handled in API route
}

export async function initDb() {
    // Not needed on Vercel
}
