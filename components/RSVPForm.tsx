'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaHeart, FaCheckCircle } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

interface RSVPFormProps {
    weddingData?: WeddingData;
}

export default function RSVPForm({ weddingData }: RSVPFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        attendance: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(false); // Reset submitted state for new submissions

        try {
            const res = await fetch('/api/wishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                }),
            });

            if (res.ok) {
                setSubmitted(true);
                // Refresh the page to show the new wish in WishesSection
                window.location.reload();
            } else {
                // Handle API error
                alert('Gagal mengirim ucapan. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Failed to submit wish:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        }
    };

    return (
        <section className="section bg-gradient-to-b from-cream-50 to-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="text-gold-500 text-5xl mb-6">✉</div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-800 mb-4">
                        Konfirmasi Kehadiran
                    </h2>
                    <p className="font-elegant text-lg md:text-xl text-navy-600">
                        Mohon konfirmasi kehadiran Anda dan berikan ucapan untuk kami
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="glass rounded-3xl p-8 md:p-12"
                >
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block font-semibold text-navy-700 mb-2">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none transition-colors bg-white/80 text-navy-800"
                                    placeholder="Masukkan nama Anda"
                                />
                            </div>

                            {/* Attendance */}
                            <div>
                                <label className="block font-semibold text-navy-700 mb-3">
                                    Konfirmasi Kehadiran <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-3">
                                    {[
                                        { value: 'hadir', label: 'Ya, saya akan hadir', icon: '✅' },
                                        { value: 'tidak hadir', label: 'Maaf, saya tidak bisa hadir', icon: '❌' },
                                        { value: 'belum pasti', label: 'Masih belum pasti', icon: '❓' },
                                    ].map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.attendance === option.value
                                                    ? 'border-gold-500 bg-gold-50'
                                                    : 'border-gray-200 bg-white/50 hover:border-gold-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="attendance"
                                                value={option.value}
                                                required
                                                checked={formData.attendance === option.value}
                                                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                                                className="w-5 h-5 text-gold-500 focus:ring-gold-500"
                                            />
                                            <span className="text-2xl">{option.icon}</span>
                                            <span className="font-elegant text-lg text-navy-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block font-semibold text-navy-700 mb-2">
                                    Ucapan & Doa <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={5}
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none transition-colors bg-white/80 text-navy-800 resize-none"
                                    placeholder="Tuliskan ucapan dan doa untuk kami..."
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full btn-primary flex items-center justify-center gap-3 !py-4"
                            >
                                <FaPaperPlane />
                                Kirim Ucapan
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="text-green-500 text-7xl mb-6"
                            >
                                <FaCheckCircle className="inline" />
                            </motion.div>
                            <h3 className="font-display text-3xl font-bold text-navy-800 mb-3">
                                Terima Kasih! 🎉
                            </h3>
                            <p className="font-elegant text-lg text-navy-600">
                                Ucapan Anda telah berhasil dikirim
                            </p>
                            <div className="mt-6">
                                <FaHeart className="text-gold-500 text-3xl inline animate-pulse" />
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
