import { weddingData as defaultData, WeddingData } from '@/data/wedding-data';
import { supabase } from '@/lib/supabase';

export async function getWeddingData(): Promise<WeddingData> {
    try {
        // 1. Ambil Pengaturan Utama
        const { data: settings, error: settingsError } = await supabase
            .from('wedding_settings')
            .select('*')
            .eq('id', 1)
            .maybeSingle();

        // 2. Ambil Ucapan
        const { data: wishesData, error: wishesError } = await supabase
            .from('wishes')
            .select('*')
            .order('timestamp', { ascending: false });

        // 3. Ambil Galeri
        const { data: galleryData, error: galleryError } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (settingsError || wishesError || galleryError) {
            console.error('Supabase Error:', { settingsError, wishesError, galleryError });
        }

        // Helper untuk memastikan data adalah array dan tidak kosong
        const ensureArray = (data: any, fallback: any[]) => {
            return Array.isArray(data) && data.length > 0 ? data : fallback;
        };

        // Jika data dari database ada, prioritaskan data tersebut
        // Gabungkan bride/groom dengan default secara mendalam (deep merge sederhana)
        const bride = { ...defaultData.couple.bride, ...(settings?.couple?.bride || {}) };
        const groom = { ...defaultData.couple.groom, ...(settings?.couple?.groom || {}) };

        const mergedData: WeddingData = {
            couple: {
                bride,
                groom,
                heroImage: settings?.couple?.heroImage || defaultData.couple.heroImage,
            },
            events: ensureArray(settings?.events, defaultData.events),
            loveStory: ensureArray(settings?.love_story, defaultData.loveStory),
            gifts: ensureArray(settings?.gifts, defaultData.gifts || []),
            music: settings?.music || defaultData.music,
            countdown: settings?.countdown || defaultData.countdown,
            wishes: Array.isArray(wishesData) ? wishesData : defaultData.wishes,
            gallery: Array.isArray(galleryData) && galleryData.length > 0 
                ? galleryData.map((item: any, index: number) => ({ 
                    id: index + 1, 
                    url: item.url, 
                    caption: item.caption || '' 
                })) 
                : defaultData.gallery,
        };

        return JSON.parse(JSON.stringify(mergedData));
    } catch (error) {
        console.error('Critical error in getWeddingData:', error);
        return defaultData;
    }
}

export async function updateWeddingData(newData: WeddingData): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('wedding_settings')
            .upsert({
                id: 1,
                couple: newData.couple,
                events: newData.events,
                love_story: newData.loveStory,
                gifts: newData.gifts,
                music: newData.music,
                countdown: newData.countdown,
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' });
        
        return !error;
    } catch (e) {
        console.error('Failed to update data:', e);
        return false;
    }
}

export async function initDb() {
    // Placeholder if database initialization is needed
}
