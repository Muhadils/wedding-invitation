'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash, FaImage, FaHeart, FaCalendarAlt, FaMusic, FaGift, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeTab, setActiveTab] = useState('couple');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
            setIsAuthenticated(true);
            fetchData();
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
                fetchData();
            } else {
                setMessage({ type: 'error', text: 'Password salah' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Terjadi kesalahan' });
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            const res = await fetch('/api/content');
            if (res.ok) {
                const result = await res.json();
                // If result is empty from Supabase, it will fallback to defaultData in API
                setData(result);
            }
        } catch (error) {
            console.error('Failed to fetch data');
        }
    };

    const handleSave = async () => {
        if (!data) return;
        setLoading(true);
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Perubahan berhasil disimpan!' });
                fetchData();
                setTimeout(() => setMessage(null), 3000);
            } else {
                const err = await res.json();
                throw new Error(err.message || 'Failed to save');
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: `Gagal menyimpan: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !data) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                // Refresh data to show new image from Supabase gallery table
                fetchData();
                setMessage({ type: 'success', text: 'Foto berhasil diupload!' });
            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: `Gagal upload: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const removeImage = async (index: number, imageId?: any) => {
        if (!data) return;
        if (confirm('Yakin ingin menghapus foto ini?')) {
            // For now, we just remove it from the local state and save
            const newData = { ...data };
            newData.gallery.splice(index, 1);
            setData(newData);
            // If it's a Supabase image, we'll need a delete API later
            // For now, Saving the content will update the view
            handleSave();
        }
    };

    const updateField = (path: string, value: any) => {
        if (!data) return;
        const newData = { ...data };
        const keys = path.split('.');
        let current: any = newData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (keys[i].includes('[')) {
                const [key, indexStr] = keys[i].split('[');
                const index = parseInt(indexStr.replace(']', ''));
                current = current[key][index];
            } else {
                current = current[keys[i]];
            }
        }

        const lastKey = keys[keys.length - 1];
        if (lastKey.includes('[')) {
            const [key, indexStr] = lastKey.split('[');
            const index = parseInt(indexStr.replace(']', ''));
            current[key][index] = value;
        } else {
            current[lastKey] = value;
        }

        setData(newData);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
                    <h2 className="text-3xl font-bold mb-6 text-center text-navy-800">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-gray-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-navy-700 text-white py-3 rounded-xl font-bold hover:bg-navy-800 transition-all disabled:opacity-50 shadow-lg"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 text-center text-sm font-semibold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.text}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (!data) return <div className="min-h-screen flex items-center justify-center">Loading data...</div>;

    return (
        <div className="min-h-screen bg-gray-100 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-500 hover:text-navy-700 transition">
                            <FaArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-navy-800">Wedding Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gold-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gold-600 transition shadow-lg disabled:opacity-50"
                        >
                            <FaSave /> {loading ? 'Saving...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-8">
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-xl text-white font-semibold text-center shadow-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        {message.text}
                    </motion.div>
                )}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    {/* Tabs */}
                    <div className="flex overflow-x-auto bg-gray-50 border-b">
                        {[
                            { id: 'couple', icon: <FaHeart />, label: 'Couple' },
                            { id: 'events', icon: <FaCalendarAlt />, label: 'Events' },
                            { id: 'gallery', icon: <FaImage />, label: 'Gallery' },
                            { id: 'gift', icon: <FaGift />, label: 'Gifts' },
                            { id: 'music', icon: <FaMusic />, label: 'Music' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-bold transition whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-gold-600 border-b-2 border-gold-500' : 'text-gray-500 hover:text-navy-700'}`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {activeTab === 'couple' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <Section title="Bride (Mempelai Wanita)">
                                    <InputField label="Nama Lengkap" value={data.couple.bride.fullName} onChange={(v) => updateField('couple.bride.fullName', v)} />
                                    <InputField label="Nama Panggilan" value={data.couple.bride.shortName} onChange={(v) => updateField('couple.bride.shortName', v)} />
                                    <InputField label="Nama Orang Tua" value={data.couple.bride.parents} onChange={(v) => updateField('couple.bride.parents', v)} />
                                    <InputField label="Instagram" value={data.couple.bride.instagram} onChange={(v) => updateField('couple.bride.instagram', v)} />
                                </Section>
                                <Section title="Groom (Mempelai Pria)">
                                    <InputField label="Nama Lengkap" value={data.couple.groom.fullName} onChange={(v) => updateField('couple.groom.fullName', v)} />
                                    <InputField label="Nama Panggilan" value={data.couple.groom.shortName} onChange={(v) => updateField('couple.groom.shortName', v)} />
                                    <InputField label="Nama Orang Tua" value={data.couple.groom.parents} onChange={(v) => updateField('couple.groom.parents', v)} />
                                    <InputField label="Instagram" value={data.couple.groom.instagram} onChange={(v) => updateField('couple.groom.instagram', v)} />
                                </Section>
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-xl text-navy-800">Gallery Photos</h3>
                                    <label className="bg-navy-700 text-white px-6 py-2.5 rounded-xl cursor-pointer hover:bg-navy-800 transition flex items-center gap-2 font-bold shadow-lg">
                                        <FaImage /> Upload Foto Baru
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {data.gallery.map((photo: any, index: number) => (
                                        <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                                            <img src={photo.url} alt="" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-700"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Implement sections for events, gifts, music similar to above */}
                        {activeTab === 'events' && (
                             <div className="space-y-6">
                                {data.events.map((event: any, index: number) => (
                                    <div key={index} className="border-2 rounded-2xl p-6 bg-gray-50 relative">
                                        <h4 className="font-bold text-navy-800 mb-4">Event #{index + 1}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <InputField label="Nama Acara" value={event.name} onChange={(v) => updateField(`events[${index}].name`, v)} />
                                            <InputField label="Tanggal (YYYY-MM-DD)" value={event.date} onChange={(v) => updateField(`events[${index}].date`, v)} />
                                            <InputField label="Waktu" value={event.time} onChange={(v) => updateField(`events[${index}].time`, v)} />
                                            <InputField label="Lokasi" value={event.location.name} onChange={(v) => updateField(`events[${index}].location.name`, v)} />
                                            <div className="md:col-span-2">
                                                <InputField label="Alamat Lengkap" value={event.location.address} onChange={(v) => updateField(`events[${index}].location.address`, v)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        )}

                        {activeTab === 'gift' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.gifts.map((gift: any, index: number) => (
                                    <div key={index} className="border-2 rounded-2xl p-6 bg-gray-50">
                                        <InputField label="Bank / Platform" value={gift.bankName} onChange={(v) => updateField(`gifts[${index}].bankName`, v)} />
                                        <InputField label="Nomor Rekening" value={gift.accountNumber} onChange={(v) => updateField(`gifts[${index}].accountNumber`, v)} />
                                        <InputField label="Nama Pemilik" value={gift.accountHolder} onChange={(v) => updateField(`gifts[${index}].accountHolder`, v)} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'music' && (
                            <div className="max-w-xl">
                                <InputField label="Judul Lagu" value={data.music.title} onChange={(v) => updateField('music.title', v)} />
                                <InputField label="Artist" value={data.music.artist} onChange={(v) => updateField('music.artist', v)} />
                                <InputField label="URL MP3 (Path atau Link)" value={data.music.url} onChange={(v) => updateField('music.url', v)} />
                                <p className="mt-4 text-sm text-gray-500 italic">Contoh: /music/lagu.mp3 atau https://link-lagu.mp3</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-6">
        <h3 className="font-bold text-xl text-navy-800 border-b-2 border-gold-200 pb-2">{title}</h3>
        {children}
    </div>
);

const InputField = ({ label, value, onChange, type = 'text' }: { label: string, value: string, onChange: (v: string) => void, type?: string }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 border-2 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white transition-all"
        />
    </div>
);
