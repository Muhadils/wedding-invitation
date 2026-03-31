'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelopeOpen, FaMusic } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

interface OpeningPageProps {
    guestName: string | null;
    onOpen: () => void;
    onMusicToggle: (play: boolean) => void;
    weddingData: WeddingData;
}

export default function OpeningPage({ guestName, onOpen, onMusicToggle, weddingData }: OpeningPageProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleOpen = () => {
        setIsVisible(false);
        onMusicToggle(true); // Start music when opening
        setTimeout(() => {
            onOpen();
        }, 800);
    };

    const toTitleCase = (str: string) => {
        if (!str) return '';
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
                >
                    {/* Background Image - With subtle overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={weddingData.gallery[0]?.url || "/images/couple-1.jpg"}
                            alt="Background"
                            className="w-full h-full object-cover scale-100"
                        />
                        {/* Reduced black overlay and gradient by 10% */}
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-16 px-6 text-center">
                        
                        {/* Top Section: Header & Names */}
                        <div className="flex flex-col items-center space-y-6 pt-4">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <span className="text-white uppercase tracking-[0.5em] text-[10px] sm:text-xs font-bold bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                                    The Wedding Of
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="flex flex-wrap items-center justify-center gap-3 sm:gap-5"
                            >
                                <h1 className="font-alex-brush text-5xl sm:text-6xl text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                                    {toTitleCase(weddingData.couple.groom.shortName)}
                                </h1>
                                <span className="font-alex-brush text-3xl sm:text-4xl text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                                    &
                                </span>
                                <h1 className="font-alex-brush text-5xl sm:text-6xl text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                                    {toTitleCase(weddingData.couple.bride.shortName)}
                                </h1>
                            </motion.div>
                        </div>

                        {/* Middle Section: Empty */}
                        <div className="flex-1" />

                        {/* Bottom Section: Guest & Minimalist Button */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="w-full max-w-lg space-y-6 pb-2"
                        >
                            <div className="space-y-2">
                                <p className="text-white text-[10px] tracking-[0.2em] uppercase font-medium opacity-90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                    Kepada Yth. Bapak/Ibu/Saudara/i
                                </p>
                                <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-wide break-words" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                    {guestName || "Tamu Undangan"}
                                </h2>
                            </div>

                            {/* Clean White Button */}
                            <div className="flex flex-col items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleOpen}
                                    className="group relative flex items-center justify-center gap-2.5 px-8 py-3 bg-white text-black font-bold rounded-full transition-all duration-300 border border-white/50"
                                >
                                    <FaEnvelopeOpen className="text-[12px] opacity-80" />
                                    <span className="uppercase tracking-[0.2em] text-[9px] sm:text-[10px] leading-none">
                                        Buka Undangan
                                    </span>
                                </motion.button>

                                {/* Music Info Indicator - Clean */}
                                <div className="flex items-center gap-1.5 text-white/60 text-[6px] tracking-[0.2em] uppercase font-bold">
                                    <div className="w-3.5 h-3.5 rounded-full border border-white/30 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                                        <FaMusic size={6} />
                                    </div>
                                    <span className="leading-none">Music Auto Play</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
