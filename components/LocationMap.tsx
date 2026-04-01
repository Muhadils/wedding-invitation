'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';
import BackgroundSlideshow from './BackgroundSlideshow';

interface LocationMapProps {
    weddingData: WeddingData;
}

export default function LocationMap({ weddingData }: LocationMapProps) {
    const events = Array.isArray(weddingData.events) ? weddingData.events : [];

    if (events.length === 0) return null;

    return (
        <section className="section bg-black relative overflow-hidden text-white border-t border-white/5 py-24">
            <BackgroundSlideshow images={weddingData.gallery} overlayOpacity={0.8} />
            {/* Background - Simplified (No pattern for cleaner look) */}
            <div className="container mx-auto px-6 relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="text-white/80 text-4xl mb-4">📍</div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide">
                        Lokasi Acara
                    </h2>
                </motion.div>

                <div className="space-y-12">
                    {events.map((event, index) => (
                        <div key={index} className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch">
                            {/* Location Info Card - Simplified */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="flex flex-col justify-center order-2 lg:order-none"
                            >
                                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-white mb-4">
                                            {event.name}
                                        </h3>
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="text-red-500 text-2xl mt-1">
                                                <FaMapMarkerAlt />
                                            </div>

                                            <div>
                                                <p className="text-lg text-white font-medium mb-1">
                                                    {event.location.name}
                                                </p>
                                                <p className="text-gray-400 leading-relaxed">
                                                    {event.location.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mt-4">
                                        <a
                                            href={event.location.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-white text-black py-3.5 px-6 rounded-xl text-center font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
                                        >
                                            <FaDirections className="text-lg" />
                                            Petunjuk Jalan
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(event.location.address);
                                                alert('Alamat telah disalin!');
                                            }}
                                            className="w-full bg-zinc-800 text-white py-3.5 px-6 rounded-xl text-center font-bold hover:bg-zinc-700 transition-all border border-white/5"
                                        >
                                            Salin Alamat
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Map Embed - Returned to Normal Colors */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="h-[350px] lg:h-auto min-h-[350px] order-1 lg:order-none"
                            >
                                <div className="rounded-2xl overflow-hidden h-full border border-white/10 shadow-lg">
                                    {event.location?.embedUrl ? (
                                        <iframe
                                            src={event.location.embedUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }} // Removed filters for natural look
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-gray-500 italic">
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
