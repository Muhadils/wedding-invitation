'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

interface LocationMapProps {
    weddingData: WeddingData;
}

export default function LocationMap({ weddingData }: LocationMapProps) {
    const events = Array.isArray(weddingData.events) ? weddingData.events : [];

    if (events.length === 0) return null;

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
                    <div className="text-gold-500 text-5xl mb-6 glow">📍</div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-200 mb-4 tracking-wide">
                        Lokasi Acara
                    </h2>
                </motion.div>

                <div className="space-y-16">
                    {events.map((event, index) => (
                        <div key={index} className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
                            {/* Location Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col justify-center order-2 lg:order-none"
                            >
                                <div className="bg-zinc-900/80 backdrop-blur-md border border-gold-500/30 rounded-3xl p-8 md:p-10 shadow-[0_0_30px_rgba(230,184,0,0.1)]">
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-gold-200 mb-4 text-center">
                                        {event.name}
                                    </h3>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent my-6 opacity-30" />
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="text-gold-500 text-4xl mt-1">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <p className="font-elegant text-lg text-white font-semibold mb-1">
                                                {event.location.name}
                                            </p>
                                            <p className="font-elegant text-base md:text-lg text-gray-300 leading-relaxed">
                                                {event.location.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <a
                                            href={event.location.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-gradient-to-r from-gold-500 to-gold-700 text-white py-4 px-6 rounded-full text-center font-semibold hover:shadow-[0_0_20px_rgba(230,184,0,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                                        >
                                            <FaDirections className="text-xl" />
                                            Buka di Google Maps
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(event.location.address);
                                                alert('Alamat telah disalin!');
                                            }}
                                            className="w-full bg-zinc-800 border border-gold-500/30 text-gold-200 py-4 px-6 rounded-full text-center font-semibold hover:bg-zinc-700 hover:border-gold-500 hover:scale-105 transition-all duration-300"
                                        >
                                            Salin Alamat
                                        </button>
                                    </div>
                                    <div className="mt-8 p-4 bg-gold-500/10 border border-gold-500/20 rounded-2xl">
                                        <p className="text-sm text-gold-200 text-center font-elegant">
                                            💡 <strong>Tips:</strong> Kami sarankan untuk berangkat lebih awal
                                            untuk menghindari kemacetan dan mendapatkan tempat parkir yang nyaman.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Map Embed */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="h-[400px] lg:h-full min-h-[400px] order-1 lg:order-none"
                            >
                                <div className="rounded-3xl overflow-hidden h-full shadow-2xl border border-gold-500/30">
                                    {event.location?.embedUrl ? (
                                        <iframe
                                            src={event.location.embedUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-gray-500 italic">
                                            Peta belum tersedia
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
