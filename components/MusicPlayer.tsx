'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

interface MusicPlayerProps {
    shouldPlay: boolean;
    weddingData: WeddingData;
}

export default function MusicPlayer({ shouldPlay, weddingData }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        console.log('MusicPlayer: shouldPlay changed to', shouldPlay);
        const attemptAutoPlay = async () => {
            if (shouldPlay && audioRef.current) {
                console.log('MusicPlayer: Attempting autoplay...');
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                    setShowControls(true);
                    console.log('MusicPlayer: Autoplay successful.');
                } catch (error) {
                    setIsPlaying(false);
                    setShowControls(false);
                    console.error('MusicPlayer: Autoplay failed:', error);
                }
            } else {
                console.log('MusicPlayer: Autoplay not attempted. shouldPlay:', shouldPlay, 'audioRef.current:', audioRef.current);
            }
        };
        attemptAutoPlay();
    }, [shouldPlay, weddingData.music?.url || '']);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && showControls) {
            timer = setTimeout(() => {
                setShowControls(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, showControls]);


    const togglePlay = async () => {
        if (!audioRef.current) {
            console.log('MusicPlayer: audioRef.current is null on togglePlay.');
            return;
        }

        if (isPlaying) {
            console.log('MusicPlayer: Pausing audio.');
            audioRef.current.pause();
            setIsPlaying(false);
            setShowControls(false);
        } else {
            console.log('MusicPlayer: Attempting to play audio.');
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                setShowControls(true);
                console.log('MusicPlayer: Play successful.');
            } catch (error) {
                setIsPlaying(false);
                setShowControls(false);
                console.error('MusicPlayer: Play failed:', error);
            }
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            setShowControls(true);
            console.log('MusicPlayer: Mute toggled to', !isMuted);
        } else {
            console.log('MusicPlayer: audioRef.current is null on toggleMute.');
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                loop
                src={weddingData.music.url}
                onError={(e) => {
                    console.error('MusicPlayer: Audio loading error:', e);
                    setIsPlaying(false);
                    setShowControls(false);
                }}
            />

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-8 right-8 z-50"
                // Removed onMouseEnter and onMouseLeave events
            >
                <div className="glass-gold rounded-full p-4 shadow-2xl">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white shadow-lg glow"
                    >
                        {isPlaying ? (
                            <motion.div
                                key="pause"
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaPause className="text-lg" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ rotate: 180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaPlay className="text-lg ml-1" />
                            </motion.div>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showControls && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-full right-full mr-2 mb-3 glass-gold rounded-2xl p-3 min-w-[200px]"
                            >
                                <div className="mb-3 text-center">
                                    <p className="font-elegant text-sm font-semibold text-navy-800">
                                        {weddingData.music.title}
                                    </p>
                                    <p className="text-xs text-navy-600">{weddingData.music.artist}</p>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={toggleMute}
                                        className="text-gold-600 hover:text-gold-700 transition-colors"
                                    >
                                        {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
                                    </button>
                                </div>

                                {isPlaying && (
                                    <div className="flex justify-center gap-1 mt-2">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ scaleY: [1, 1.5, 1] }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    delay: i * 0.2,
                                                }}
                                                className="w-1 h-3 bg-gold-500 rounded-full"
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}
