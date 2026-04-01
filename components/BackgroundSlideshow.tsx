'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData } from '@/data/wedding-data';

interface BackgroundSlideshowProps {
    images: { url: string }[];
    overlayOpacity?: number;
}

export default function BackgroundSlideshow({ images, overlayOpacity = 0.6 }: BackgroundSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Ganti gambar setiap 5 detik

        return () => clearInterval(timer);
    }, [images.length]);

    if (!images || images.length === 0) return null;

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[currentIndex].url})` }}
                />
            </AnimatePresence>
            {/* Overlay untuk memastikan teks tetap terbaca */}
            <div 
                className="absolute inset-0 bg-black" 
                style={{ opacity: overlayOpacity }}
            />
        </div>
    );
}
