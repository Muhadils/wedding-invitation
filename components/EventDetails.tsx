'use client';

import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { weddingData, downloadCalendar, type WeddingData } from '@/data/wedding-data';
import BackgroundSlideshow from './BackgroundSlideshow';

interface EventCardProps {
    event: typeof weddingData.events[0];
    index: number;
    eventIndex: number;
}

const EventCard = ({ event, index, eventIndex }: EventCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-zinc-900/80 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 max-w-lg mx-auto shadow-xl transition-all duration-300"
    >
        {/* Event Name */}
        <motion.h3
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center"
        >
            {event.name}
        </motion.h3>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6 opacity-50" />

        {/* Date */}
        <div className="flex items-start gap-4 mb-4">
            <div className="text-blue-500 text-2xl mt-1">
                <FaCalendarAlt />
            </div>
            <div>
                <p className="font-semibold text-gray-400 mb-1">Tanggal</p>
                <p className="font-elegant text-lg text-white">
                    {new Date(event.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-4 mb-4">
            <div className="text-cyan-400 text-2xl mt-1">
                <FaClock />
            </div>
            <div>
                <p className="font-semibold text-gray-400 mb-1">Waktu</p>
                <p className="font-elegant text-lg text-white">{event.time}</p>
            </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4 mb-6">
            <div className="text-red-500 text-2xl mt-1">
                <FaMapMarkerAlt />
            </div>
            <div>
                <p className="font-semibold text-gray-400 mb-1">Lokasi</p>
                <p className="font-elegant text-lg text-white font-semibold mb-1">
                    {event.location.name}
                </p>
                <p className="text-sm text-gray-500">{event.location.address}</p>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
                href={event.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white text-black py-3 px-6 rounded-full text-center font-bold hover:bg-gray-200 transition-all duration-300 shadow-lg"
            >
                Lihat Peta
            </a>
            <button
                onClick={() => downloadCalendar(eventIndex)}
                className="flex-1 bg-transparent border border-white/40 text-white py-3 px-6 rounded-full text-center font-bold hover:bg-white/10 transition-all duration-300"
            >
                <FaCalendarAlt className="inline mr-2" />
                Simpan
            </button>
        </div>
    </motion.div>
);

interface EventDetailsProps {
    weddingData: WeddingData;
}

export default function EventDetails({ weddingData }: EventDetailsProps) {
    return (
        <section className="section bg-black relative overflow-hidden py-24">
            <BackgroundSlideshow images={weddingData.gallery} overlayOpacity={0.7} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] z-0" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="text-white text-5xl mb-6">⚘</div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                        Rangkaian Acara
                    </h2>
                    <p className="font-elegant text-lg md:text-xl text-gray-400 max-w-2xl mx-auto italic">
                        Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i
                        untuk hadir pada acara pernikahan kami
                    </p>
                </motion.div>

                {/* Event Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {Array.isArray(weddingData.events) && weddingData.events.map((event, index) => (
                        <EventCard key={index} event={event} index={index} eventIndex={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
