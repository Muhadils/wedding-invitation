import { weddingData as defaultData, WeddingData } from '@/data/wedding-data';
import { supabase } from '@/lib/supabase';

export async function getWeddingData(): Promise<WeddingData> {
    try {
        // Fetch only dynamic wishes from Supabase
        const { data: wishesData, error } = await supabase
            .from('wishes')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) {
            console.error('Error fetching wishes from Supabase:', error);
            // Fallback to default wishes if Supabase fails
            return defaultData;
        }

        // Merge default data with wishes from Supabase
        return {
            ...defaultData,
            wishes: wishesData || defaultData.wishes,
        };
    } catch (error) {
        console.error('Error in getWeddingData:', error);
        return defaultData;
    }
}

// Keep these for backward compatibility or local development
export async function updateWeddingData(newData: WeddingData): Promise<boolean> {
    return false; // Not supported on Vercel
}

export async function initDb() {
    // Not needed on Vercel
}
