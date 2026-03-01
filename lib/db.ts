import fs from 'fs/promises';
import path from 'path';
import { weddingData as defaultData, WeddingData } from '@/data/wedding-data';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export async function getWeddingData(): Promise<WeddingData> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        const parsed = JSON.parse(data);

        // Merge with defaultData to ensure new fields (like countdown) exist
        const mergedData: WeddingData = {
            ...defaultData, // Start with all default properties
            ...parsed, // Overlay with parsed data from db.json
            countdown: parsed.countdown || defaultData.countdown, // Ensure countdown is handled
            events: (parsed.events || []).map((parsedEvent: any) => {
                // Find corresponding default event by name or index for embedUrl fallback
                const correspondingDefaultEvent = defaultData.events.find(
                    (de) => de.name === parsedEvent.name
                ) || defaultData.events[parsed.events.indexOf(parsedEvent)];

                return {
                    ...correspondingDefaultEvent, // Take defaults for properties not in parsedEvent
                    ...parsedEvent, // Overlay with parsedEvent properties
                    location: {
                        ...correspondingDefaultEvent?.location, // Take default location properties
                        ...parsedEvent.location, // Overlay with parsedEvent location properties
                        embedUrl: parsedEvent.location.embedUrl || correspondingDefaultEvent?.location?.embedUrl || '' // Prefer parsed, fallback to default, then empty string
                    }
                };
            }).concat(
                // Add any events from defaultData that are not in parsed.events (based on name)
                defaultData.events.filter(
                    (defaultEvent) => !(parsed.events || []).some((pe: any) => pe.name === defaultEvent.name)
                )
            ),
            // Ensure wishes and gallery are also merged properly
            wishes: parsed.wishes || defaultData.wishes,
            gallery: parsed.gallery || defaultData.gallery,
            music: parsed.music || defaultData.music,
        };
        return mergedData;
    } catch (error) {
        // If db.json doesn't exist, return default data and create the file
        await initDb();
        return defaultData;
    }
}

export async function updateWeddingData(newData: WeddingData): Promise<boolean> {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(newData, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing to db.json:', error);
        return false;
    }
}

export async function initDb() {
    try {
        // Check if file exists
        await fs.access(DB_PATH);
    } catch {
        // If not, write default data
        await fs.writeFile(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
    }
}
