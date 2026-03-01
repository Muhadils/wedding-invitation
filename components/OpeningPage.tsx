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

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-white overflow-hidden"
                >
                    {/* Top Section: Image */}
                    <div className="relative w-full h-[60%] overflow-hidden z-10 flex items-center justify-center bg-black">
                        {/* Gradients for subtle background effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-70 z-10" />
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-20" />

                        {/* Circular Framed Image */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-4 border-gold-400 overflow-hidden shadow-2xl flex items-center justify-center bg-gray-800 z-30"
                        >
                            <img
                                src={weddingData.gallery[0]?.url || "/images/couple-1.jpg"}
                                alt="Couple"
                                className="w-full h-full object-cover object-center transform scale-105"
                            />
                            {/* Inner glow effect */}
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(230,184,0,0.5)]" />
                        </motion.div>
                    </div>

                    {/* Bottom Section: Content */}
                    <div className="relative flex-1 w-full bg-black flex flex-col items-center justify-evenly -mt-8 pt-4 px-4 z-20 text-center">

                        {/* Couple Names */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="w-full flex flex-col items-center justify-center mb-6"
                        >
                            {/* Helper function to format name with first letter capitalized and rest lowercase */}
                            {(() => {
                                const toTitleCase = (str: string) => {
                                    if (!str) return '';
                                    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                                };
                                return (
                                    <>
                                        <h1 className="font-alex-brush text-5xl sm:text-6xl md:text-8xl text-gold-400 leading-tight px-4 break-words" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            {toTitleCase(weddingData.couple.groom.shortName)}
                                        </h1>
                                        <span className="font-alex-brush text-3xl sm:text-4xl md:text-5xl text-gold-400 leading-tight px-4 break-words my-2 block" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            &
                                        </span>
                                        <h1 className="font-alex-brush text-5xl sm:text-6xl md:text-8xl text-gold-400 leading-tight px-4 break-words" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            {toTitleCase(weddingData.couple.bride.shortName)}
                                        </h1>
                                    </>
                                );
                            })()}
                            {/* Optional: Decorative '&' background if needed, but sticking to clean reference for now */}
                        </motion.div>

                        {/* Guest Section */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-center w-full max-w-xs mb-8"
                        >
                            <p className="text-gray-400 text-sm mb-4 tracking-wider">
                                Kepada Yth. Bapak/Ibu/Saudara/i
                            </p>
                            <div className="bg-[#111] border border-gray-800 rounded-2xl px-6 py-5 shadow-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <h2 className="text-white text-xl font-bold tracking-wide">
                                    {guestName || "Tamu Undangan"}
                                </h2>
                            </div>
                            <p className="text-gray-400 text-sm mt-4 tracking-wide">
                                di Tempat
                            </p>
                        </motion.div>

                        {/* Bottom Actions */}
                        <div className="w-full max-w-md flex items-center justify-center relative mt-auto mb-8">
                            {/* Music Icon - Bottom Left */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="absolute left-0 bottom-2"
                            >
                                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gold-500 animate-[spin_4s_linear_infinite]">
                                    <FaMusic size={14} />
                                </div>
                            </motion.div>

                            {/* Open Button */}
                            <motion.button
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleOpen}
                                className="px-8 py-4 bg-gold text-white font-bold rounded-full shadow-[0_0_20px_rgba(230,184,0,0.5)] flex items-center gap-3 text-sm tracking-widest uppercase"
                            >
                                <FaEnvelopeOpen className="text-lg" />
                                <span>Buka Undangan</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
