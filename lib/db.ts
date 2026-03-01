import fs from 'fs/promises';
import path from 'path';
import { weddingData as defaultData, WeddingData } from '@/data/wedding-data';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export async function getWeddingData(): Promise<WeddingData> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        const parsed = JSON.parse(data);

        // Merge with defaultData to ensure all required fields exist
        return {
            ...defaultData,
            ...parsed,
            events: (parsed.events || defaultData.events).map((parsedEvent: any, index: number) => {
                const defaultEvent = defaultData.events[index] || defaultData.events[0];
                return {
                    ...defaultEvent,
                    ...parsedEvent,
                    location: {
                        ...defaultEvent.location,
                        ...parsedEvent.location,
                    }
                };
            }),
        };
    } catch (error) {
        // Fallback to default data if db.json is not found or cannot be read
        console.warn('Database not found or inaccessible, using default data');
        return defaultData;
    }
}

export async function updateWeddingData(newData: WeddingData): Promise<boolean> {
    try {
        // Only attempt to write if we're in a local environment where writing is possible
        if (process.env.NODE_ENV === 'development') {
            await fs.writeFile(DB_PATH, JSON.stringify(newData, null, 2), 'utf-8');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error writing to db.json:', error);
        return false;
    }
}

export async function initDb() {
    // Only initialize in development
    if (process.env.NODE_ENV === 'development') {
        try {
            await fs.access(DB_PATH);
        } catch {
            await fs.writeFile(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
        }
    }
}
