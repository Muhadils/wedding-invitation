'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaUser, FaClock } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

type Wish = WeddingData['wishes'][0];

interface WishesSectionProps {
    weddingData?: WeddingData;
}

export default function WishesSection({ weddingData }: WishesSectionProps) {
    const [allWishes, setAllWishes] = useState<Wish[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWishes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/wishes');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            if (Array.isArray(data)) {
                setAllWishes(data); 
            } else {
                setAllWishes([]);
            }
        } catch (e: any) {
            setError(e.message || 'Failed to fetch wishes');
            setAllWishes([]);
            console.error('Failed to fetch wishes:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWishes();
    }, []);

    const getAttendanceBadge = (attendance: string) => {
        const badges = {
            'hadir': { color: 'bg-green-100 text-green-700', text: '✅ Hadir' },
            'tidak hadir': { color: 'bg-red-100 text-red-700', text: '❌ Tidak Hadir' },
            'belum pasti': { color: 'bg-gray-100 text-gray-700', text: '❓ Belum Pasti' },
        };
        return badges[attendance as keyof typeof badges] || badges['belum pasti'];
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <section className="section bg-black relative overflow-hidden text-white border-t border-white/10">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="text-pink-500 text-5xl mb-6">
                        <FaHeart className="inline" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                        Ucapan & Doa
                    </h2>
                    <p className="font-elegant text-lg md:text-xl text-gray-400">
                        Terima kasih atas ucapan dan doa dari keluarga dan sahabat
                    </p>
                </motion.div>

                {/* Wishes Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allWishes.map((wish, index) => (
                        <motion.div
                            key={wish.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:shadow-xl transition-shadow shadow-lg"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-sky-400">
                                        <FaUser />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-lg font-bold text-white">
                                            {wish.name}
                                        </h4>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <FaClock className="text-[10px]" />
                                            <span>{formatTimestamp(wish.timestamp)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance Badge */}
                            <div className="mb-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getAttendanceBadge(wish.attendance).color}`}>
                                    {getAttendanceBadge(wish.attendance).text}
                                </span>
                            </div>

                            {/* Message */}
                            <p className="font-elegant text-base text-gray-300 leading-relaxed italic">
                                &quot;{wish.message}&quot;
                            </p>

                            {/* Decorative Element */}
                            <div className="mt-4 text-right">
                                <FaHeart className="text-pink-500/40 inline text-sm" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
