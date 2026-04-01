'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaTwitter, FaCopy, FaCheck } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { WeddingData } from '@/data/wedding-data';
import BackgroundSlideshow from './BackgroundSlideshow';

interface FooterProps {
    weddingData: WeddingData;
}

export default function Footer({ weddingData }: FooterProps) {
    const [currentUrl, setCurrentUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);
    
    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const shareMessage = `🎉 Undangan Pernikahan ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}\n\n📅 ${new Date(weddingData.events[0].date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}\n\nLihat undangan lengkap di: ${currentUrl}`;

    const handleShare = (platform: string) => {
        const encodedMessage = encodeURIComponent(shareMessage);
        const encodedUrl = encodeURIComponent(currentUrl);

        const urls = {
            whatsapp: `https://wa.me/?text=${encodedMessage}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
        };

        window.open(urls[platform as keyof typeof urls], '_blank');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="bg-black relative overflow-hidden border-t border-white/10">
            <BackgroundSlideshow images={weddingData.gallery} overlayOpacity={0.8} />
            <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
                {/* Share Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                        Bagikan Undangan Ini
                    </h3>
                    <p className="font-elegant text-lg text-gray-500 mb-8 italic">
                        Bantu kami menyebarkan kabar bahagia ini
                    </p>

                    {/* Share Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleShare('whatsapp')}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold shadow-lg transition-all"
                        >
                            <FaWhatsapp className="text-xl" />
                            WhatsApp
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleShare('facebook')}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-full font-semibold shadow-lg transition-all"
                        >
                            <FaFacebook className="text-xl" />
                            Facebook
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleShare('twitter')}
                            className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-semibold shadow-lg transition-all"
                        >
                            <FaTwitter className="text-xl" />
                            Twitter
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-gray-200 transition-all"
                        >
                            {copied ? <FaCheck className="text-xl" /> : <FaCopy className="text-xl" />}
                            {copied ? 'Tersalin!' : 'Salin Link'}
                        </motion.button>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setShowQR(!showQR)}
                            className="text-white/60 hover:text-white font-semibold underline decoration-white/20"
                        >
                            {showQR ? 'Sembunyikan' : 'Tampilkan'} QR Code
                        </motion.button>
                    </div>

                    {showQR && currentUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 inline-block bg-white rounded-3xl p-6 shadow-2xl"
                        >
                            <QRCodeSVG
                                value={currentUrl}
                                size={200}
                                level="H"
                                includeMargin
                                fgColor="#000000"
                                bgColor="#ffffff"
                            />
                        </motion.div>
                    )}
                </motion.div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12 opacity-30" />

                {/* Couple Names */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    {(() => {
                        const toTitleCase = (str: string) => {
                            if (!str) return '';
                            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                        };
                        return (
                            <h2 className="font-alex-brush text-3xl md:text-4xl lg:text-6xl text-white mb-4">
                                {toTitleCase(weddingData.couple.bride.shortName)} & {toTitleCase(weddingData.couple.groom.shortName)}
                            </h2>
                        );
                    })()}
                    <p className="font-alex-brush text-xl text-gray-500">
                        {new Date(weddingData.events[0].date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                </motion.div>

                {/* Bottom Ornament & Credits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                >
                    <div className="text-white text-4xl opacity-20">❈</div>
                    
                    <div className="space-y-2">
                        <a 
                            href="https://instagram.com/_pecandufilter" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm font-medium tracking-wide block"
                        >
                            Open jasa undangan digital di IG <span className="font-bold underline">@_PECANDUFILTER</span>
                        </a>
                        
                        <p className="text-gray-600 text-[10px] tracking-[0.2em] uppercase">
                            Copyright © {new Date().getFullYear()} • @_pecandufilter
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
