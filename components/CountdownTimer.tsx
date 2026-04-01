'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import { WeddingData } from '@/data/wedding-data';
import BackgroundSlideshow from './BackgroundSlideshow';

interface CountdownItemProps {
    value: number;
    label: string;
    delay: number;
}

const CountdownItem = ({ value, label, delay }: CountdownItemProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 min-w-[100px] md:min-w-[140px] shadow-xl"
    >
        <motion.div
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-2"
        >
            {String(value).padStart(2, '0')}
        </motion.div>
        <p className="text-gray-300 text-xs md:text-sm uppercase tracking-wider font-bold">
            {label}
        </p>
    </motion.div>
);

interface CountdownTimerProps {
    weddingData: WeddingData;
}

export default function CountdownTimer({ weddingData }: CountdownTimerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            return (
                <div className="text-center relative z-10">
                    <motion.h3
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="font-script text-5xl md:text-7xl text-white"
                    >
                        The Day Has Arrived! 🎉
                    </motion.h3>
                </div>
            );
        }

        return (
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
                <CountdownItem value={days} label="Hari" delay={0.2} />
                <CountdownItem value={hours} label="Jam" delay={0.3} />
                <CountdownItem value={minutes} label="Menit" delay={0.4} />
                <CountdownItem value={seconds} label="Detik" delay={0.5} />
            </div>
        );
    };

    return (
        <section className="section bg-black relative overflow-hidden text-white py-24">
            <BackgroundSlideshow images={weddingData.gallery} overlayOpacity={0.7} />
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 z-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }} />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                {/* Top Ornament */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-white text-5xl mb-6"
                >
                    ✧
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider"
                >
                    Counting Down to Forever
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="font-elegant text-lg md:text-xl text-gray-400 mb-12 italic"
                >
                    Our special day is approaching
                </motion.p>

                {/* Countdown */}
                {(() => {
                    const firstEvent = Array.isArray(weddingData.events) && weddingData.events.length > 0 ? weddingData.events[0] : null;
                    let targetDate: Date;
                    
                    try {
                        if (firstEvent && firstEvent.date) {
                            const timeMatch = firstEvent.time.match(/(\d{1,2})[:.](\d{2})/);
                            let timeStr = "08:00";
                            
                            if (timeMatch) {
                                timeStr = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
                            }
                            
                            const dateString = `${firstEvent.date}T${timeStr}:00`;
                            targetDate = new Date(dateString);
                        } else {
                            targetDate = new Date(weddingData.countdown?.targetDate || '2026-06-15T08:00:00');
                        }
                    } catch (e) {
                        targetDate = new Date(weddingData.countdown?.targetDate || '2026-06-15T08:00:00');
                    }

                    if (isNaN(targetDate.getTime())) {
                        targetDate = new Date('2026-06-15T08:00:00');
                    }

                    return <Countdown date={targetDate} renderer={renderer} />;
                })()}

                {/* Bottom Ornament */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-white text-5xl mt-12"
                >
                    ✧
                </motion.div>
            </div>
        </section>
    );
}
