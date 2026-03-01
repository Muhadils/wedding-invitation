'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningPage from '@/components/OpeningPage';
import MusicPlayer from '@/components/MusicPlayer';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import EventDetails from '@/components/EventDetails';
import PhotoGallery from '@/components/PhotoGallery';
import LoveStory from '@/components/LoveStory';
import LocationMap from '@/components/LocationMap';
import GiftSection from '@/components/GiftSection';
import RSVPForm from '@/components/RSVPForm';
import WishesSection from '@/components/WishesSection';
import Footer from '@/components/Footer';
import { WeddingData } from '@/data/wedding-data';

interface ClientWrapperProps {
    guestName: string | null;
    weddingData: WeddingData;
}

export default function ClientWrapper({ guestName, weddingData }: ClientWrapperProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [playMusic, setPlayMusic] = useState(false);

    const handleOpen = () => {
        setIsOpened(true);
        setPlayMusic(true);
    };

    return (
        <main className="min-h-screen bg-white">
            <AnimatePresence>
                {!isOpened && (
                    <OpeningPage
                        guestName={guestName}
                        onOpen={handleOpen}
                        onMusicToggle={setPlayMusic}
                        weddingData={weddingData}
                    />
                )}
            </AnimatePresence>

            {isOpened && (
                <div className="animate-fade-in">
                    <MusicPlayer shouldPlay={playMusic} weddingData={weddingData} />
                    <HeroSection weddingData={weddingData} />
                    <CountdownTimer weddingData={weddingData} />
                    <EventDetails weddingData={weddingData} />
                    <PhotoGallery weddingData={weddingData} />
                    <LocationMap weddingData={weddingData} />
                    <GiftSection weddingData={weddingData} />
                    <RSVPForm />
                    <WishesSection />
                    <Footer weddingData={weddingData} />
                </div>
            )}
        </main>
    );
}
