'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaImage } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

interface PhotoGalleryProps {
    weddingData: WeddingData;
}

export default function PhotoGallery({ weddingData }: PhotoGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const photos = Array.isArray(weddingData.gallery) ? weddingData.gallery : [];

    return (
        <section className="section bg-black relative py-20 min-h-[400px]">
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="text-gold-500 text-5xl mb-6">❀</div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-200 mb-4">Galeri Kami</h2>
                    <p className="font-elegant text-lg text-gray-400 italic">Momen indah perjalanan cinta kami</p>
                </motion.div>

                {photos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-gray-500 py-20 border-2 border-dashed border-gray-800 rounded-3xl">
                        <FaImage size={48} className="mb-4 opacity-20" />
                        <p>Belum ada foto di galeri.</p>
                        <p className="text-sm">Silakan upload melalui halaman admin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {photos.map((photo, index) => (
                            <motion.div
                                key={photo.id || index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative aspect-square cursor-pointer rounded-2xl overflow-hidden border border-gold-500/20 group"
                                onClick={() => setSelectedImage(photo.url)}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.caption || ''}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-gold-200 text-sm font-bold border border-gold-500 px-4 py-2 rounded-full">Perbesar</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-gold-500 p-2" onClick={() => setSelectedImage(null)}>
                            <FaTimes size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            src={selectedImage}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
