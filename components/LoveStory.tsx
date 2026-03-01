'use client';

import { motion } from 'framer-motion';
import { WeddingData } from '@/data/wedding-data';

interface TimelineItemProps {
    item: WeddingData['loveStory'][0];
    index: number;
    isLeft: boolean;
}

const TimelineItem = ({ item, index, isLeft }: TimelineItemProps) => (
    <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 mb-12 md:mb-16`}
    >
        {/* Content */}
        <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900/50 backdrop-blur-sm border border-gold-500/30 rounded-3xl p-6 md:p-8 inline-block max-w-md shadow-[0_0_20px_rgba(230,184,0,0.1)] hover:shadow-[0_0_30px_rgba(230,184,0,0.2)] transition-all duration-300"
            >
                <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg glow">
                        {item.year}
                    </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gold-200 mb-3">
                    {item.title}
                </h3>
                <p className="font-elegant text-base md:text-lg text-gray-300 leading-relaxed">
                    {item.description}
                </p>
            </motion.div>
        </div>

        {/* Timeline Dot */}
        <div className="relative z-10">
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.2, duration: 0.6, type: 'spring' }}
                viewport={{ once: true }}
                className="w-6 h-6 bg-gold-500 rounded-full border-4 border-zinc-900 shadow-[0_0_15px_rgba(230,184,0,0.6)]"
            />
        </div>

        {/* Spacer for the other side */}
        <div className="flex-1 hidden md:block" />
    </motion.div>
);

interface LoveStoryProps {
    weddingData: WeddingData;
}

export default function LoveStory({ weddingData }: LoveStoryProps) {
    return (
        <section className="section bg-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, var(--gold) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="text-gold-500 text-5xl mb-6 glow">♥</div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-200 mb-4 tracking-wide">
                        Kisah Cinta Kami
                    </h2>
                    <p className="font-elegant text-lg md:text-xl text-gray-400 max-w-2xl mx-auto italic">
                        Perjalanan indah yang membawa kami ke hari bahagia ini
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold-500 to-transparent transform -translate-x-1/2 hidden md:block opacity-50" />

                    {/* Timeline Items */}
                    {weddingData.loveStory.map((item, index) => (
                        <TimelineItem
                            key={index}
                            item={item}
                            index={index}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>

                {/* Bottom Decoration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="text-gold-500 text-6xl floating glow">∞</div>
                    <p className="font-script text-3xl md:text-4xl text-gradient-gold mt-4">
                        Forever & Always
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
