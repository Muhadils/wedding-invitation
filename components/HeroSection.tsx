'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { WeddingData } from '@/data/wedding-data';

interface HeroSectionProps {
    weddingData: WeddingData;
}

export default function HeroSection({ weddingData }: HeroSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    return (
        <section ref={ref} className="section relative min-h-screen overflow-hidden bg-black text-white">
            {/* Parallax Background & Overlay */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                {/* Main Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${weddingData.couple?.heroImage || weddingData.gallery[0]?.url || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070'})` }} 
                />
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/60" />
            </motion.div>

            {/* Floating White Particles */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 4 + 1 + 'px',
                            height: Math.random() * 4 + 1 + 'px',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.4 + 0.1,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 text-center h-full flex flex-col justify-center items-center py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    {/* Top Ornament */}
                    <motion.div variants={itemVariants} className="text-white text-5xl md:text-6xl mb-6">
                        ✦
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-white text-sm md:text-lg tracking-[0.4em] mb-8 uppercase font-bold"
                    >
                        The Wedding Celebration
                    </motion.h2>

                                            {/* Groom Name */}
                                        <motion.div variants={itemVariants} className="mb-2 relative">
                                             {/* Helper function to format name with first letter capitalized and rest lowercase */}
                                             {(() => {
                                                    const toTitleCase = (str: string) => {
                                                        if (!str) return '';
                                                        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                                                    };
                                                    return (
                                                        <h1 className="font-alex-brush text-6xl sm:text-7xl md:text-[10rem] text-white break-words px-2"
                                                            style={{
                                                                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                                                            }}>
                                                            {toTitleCase(weddingData.couple.groom.shortName)}
                                                        </h1>
                                                    );
                                                })()}                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent absolute -bottom-2 left-0 z-10"
                        />
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-gray-200 font-elegant text-xl mb-1">
                        {weddingData.couple.groom.fullName}
                    </motion.p>
                    <motion.p variants={itemVariants} className="text-gray-400 text-sm italic mb-12 max-w-lg">
                        {weddingData.couple.groom.parents}
                    </motion.p>
                    
                                        {/* Ampersand */}
                                        <motion.div
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.2, rotate: 180 }}
                                            className="text-white font-alex-brush text-5xl my-4 cursor-default"
                                            style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
                                        >
                                            &
                                        </motion.div>

                                            {/* Bride Name */}
                                        <motion.div variants={itemVariants} className="mb-2 relative mt-6">
                                            {/* Helper function to format name with first letter capitalized and rest lowercase */}
                                            {(() => {
                                                    const toTitleCase = (str: string) => {
                                                        if (!str) return '';
                                                        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                                                    };
                                                    return (
                                                        <h1 className="font-alex-brush text-6xl sm:text-7xl md:text-[10rem] text-white break-words px-2"
                                                            style={{
                                                                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                                                            }}>
                                                            {toTitleCase(weddingData.couple.bride.shortName)}
                                                        </h1>
                                                    );
                                                })()}
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        whileInView={{ width: '100%' }}
                                                                        className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent absolute -bottom-2 left-0 z-10"
                                                                    />                                        </motion.div>
                    
                                                                                <motion.p variants={itemVariants} className="text-gray-200 font-elegant text-xl mb-1">
                    
                                                                                    {weddingData.couple.bride.fullName}                                        </motion.p>
                                        <motion.p variants={itemVariants} className="text-gray-400 text-sm italic mb-8 max-w-lg">
                                            {weddingData.couple.bride.parents}
                                        </motion.p>
                    

                    {/* Date Box */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl px-10 py-6 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="font-elegant text-2xl md:text-3xl text-white relative z-10">
                            {new Date(weddingData.events[0].date).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="text-white/50 text-sm tracking-widest animate-pulse">
                    SCROLL DOWN
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent mx-auto mt-2" />
            </motion.div>
        </section>
    );
}
