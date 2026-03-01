import ClientWrapper from '@/components/ClientWrapper';
import { getWeddingData } from '@/lib/db';

interface HomeProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const resolvedSearchParams = await searchParams;
    const guestName = typeof resolvedSearchParams.to === 'string' ? resolvedSearchParams.to : null;

    // Fetch dynamic data on the server
    const weddingData = await getWeddingData();

    return (
        <ClientWrapper
            guestName={guestName}
            weddingData={weddingData}
        />
    );
}
