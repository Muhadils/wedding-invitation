'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaTimes } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface PhotoGalleryProps {
    weddingData: WeddingData;
}

export default function PhotoGallery({ weddingData }: PhotoGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <section className="section bg-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, var(--gold) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="text-gold-500 text-5xl mb-6 glow">❀</div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-200 mb-4 tracking-wide">
                        Galeri Kami
                    </h2>
                    <p className="font-elegant text-lg md:text-xl text-gray-400 italic">
                        Momen-momen indah perjalanan cinta kami
                    </p>
                </motion.div>

                {/* Swiper Gallery */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        effect="fade"
                        loop={Array.isArray(weddingData.gallery) && weddingData.gallery.length > 1}
                        className="rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(230,184,0,0.15)] border border-gold-500/20"
                    >
                        {Array.isArray(weddingData.gallery) && weddingData.gallery.map((photo) => (
                            <SwiperSlide key={photo.id}>
                                <div
                                    className="relative aspect-[16/10] cursor-pointer group"
                                    onClick={() => setSelectedImage(photo.id)}
                                >
                                    <img
                                        src={photo.url}
                                        alt={photo.caption || `Gallery ${photo.id}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                                    {photo.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="font-elegant text-lg md:text-2xl text-gold-200">{photo.caption}</p>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Grid Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-5xl mx-auto"
                >
                    {Array.isArray(weddingData.gallery) && weddingData.gallery.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            className="relative aspect-square cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-gold-500/20 group"
                            onClick={() => setSelectedImage(photo.id)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.caption || `Gallery ${photo.id}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-gold-200 font-semibold tracking-wide border border-gold-500 px-4 py-2 rounded-full backdrop-blur-sm">Lihat</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-gold-500 transition-colors z-10 p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={weddingData.gallery.find(p => p.id === selectedImage)?.url}
                            alt="Gallery enlarged"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                        {weddingData.gallery.find(p => p.id === selectedImage)?.caption && (
                            <p className="absolute bottom-8 text-gold-200 font-elegant text-xl">
                                {weddingData.gallery.find(p => p.id === selectedImage)?.caption}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
