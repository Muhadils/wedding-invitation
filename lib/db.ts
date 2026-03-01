import { weddingData as defaultData, WeddingData } from '@/data/wedding-data';
import { supabase } from '@/lib/supabase';

export async function getWeddingData(): Promise<WeddingData> {
    try {
        // 1. Ambil Pengaturan Utama (Couple, Events, Music, dll)
        const { data: settings, error: settingsError } = await supabase
            .from('wedding_settings')
            .select('*')
            .single();

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

        if (settingsError) console.error('Error fetching settings from Supabase:', settingsError);

        // Merge Data
        return {
            ...defaultData,
            // Prioritaskan data dari database jika ada
            couple: settings?.couple || defaultData.couple,
            events: settings?.events && settings.events.length > 0 ? settings.events : defaultData.events,
            loveStory: settings?.love_story && settings.love_story.length > 0 ? settings.love_story : defaultData.loveStory,
            gifts: settings?.gifts && settings.gifts.length > 0 ? settings.gifts : defaultData.gifts,
            music: settings?.music || defaultData.music,
            countdown: settings?.countdown || defaultData.countdown,
            
            // Wishes & Gallery (Dinamis)
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
    // Dipindahkan ke app/api/content/route.ts
    return false; 
}

export async function initDb() {
    // Tidak diperlukan lagi
}
