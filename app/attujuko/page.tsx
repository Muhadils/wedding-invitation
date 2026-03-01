'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaSave, FaSignOutAlt, FaImage, FaTrash } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<WeddingData | null>(null);
    const [activeTab, setActiveTab] = useState('couple');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/check');
            if (res.ok) {
                const { authenticated } = await res.json();
                if (authenticated) {
                    setIsAuthenticated(true);
                    fetchData();
                }
            }
        } catch (error) {
            console.error('Auth check failed', error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await fetch('/api/content');
            if (res.ok) {
                const weddingData = await res.json();
                setData(weddingData);
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
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
                setMessage({ type: 'error', text: 'Password salah!' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Terjadi kesalahan' });
        } finally {
            setLoading(false);
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
                fetchData(); // Refresh data after successful save
                setTimeout(() => setMessage(null), 3000);
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Gagal menyimpan perubahan' });
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
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const { url } = await res.json();
                // Add to gallery
                const newData = { ...data };
                // Generate a unique ID (max existing ID + 1 or Date.now())
                const nextId = Math.max(...newData.gallery.map(p => p.id || 0), 0) + 1;

                newData.gallery.push({
                    id: nextId,
                    url: url,
                    caption: 'Uploaded photo'
                });
                setData(newData);
                setMessage({ type: 'success', text: 'Foto berhasil diupload!' });
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Gagal upload foto' });
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index: number) => {
        if (!data) return;
        if (confirm('Yakin ingin menghapus foto ini?')) {
            const newData = { ...data };
            newData.gallery.splice(index, 1);
            setData(newData);
        }
    };

    const addEvent = () => {
        if (!data) return;
        const newData = { ...data };
        newData.events.push({
            name: 'Acara Baru',
            date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
            time: '00:00 - 00:00',
            location: {
                name: 'Lokasi Baru',
                address: 'Alamat Baru',
                googleMapsUrl: '', // Corrected initialization
                embedUrl: '',
            },
            title: 'Judul Acara Baru',
            // address: 'Alamat Lengkap Acara Baru', // Removed as it's part of location
            // mapUrl: '', // Removed as it's part of location
        });
        setData(newData);
    };

    const removeEvent = (index: number) => {
        if (!data) return;
        if (confirm('Yakin ingin menghapus acara ini?')) {
            const newData = { ...data };
            newData.events.splice(index, 1);
            setData(newData);
        }
    };

    const addStory = () => {
        if (!data) return;
        const newData = { ...data };
        newData.loveStory.push({
            year: new Date().getFullYear().toString(),
            title: 'Babak Baru',
            description: 'Sebuah cerita baru dimulai...',
        });
        setData(newData);
    };

    const removeStory = (index: number) => {
        if (!data) return;
        if (confirm('Yakin ingin menghapus cerita ini?')) {
            const newData = { ...data };
            newData.loveStory.splice(index, 1);
            setData(newData);
        }
    };

    const handleDeleteWish = async (wishId: number) => {
        if (!data) return;
        if (confirm('Yakin ingin menghapus ucapan ini?')) {
            try {
                const res = await fetch('/api/wishes', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: wishId }),
                });

                if (res.ok) {
                    const newData = { ...data };
                    newData.wishes = newData.wishes.filter(w => w.id !== wishId);
                    setData(newData);
                    setMessage({ type: 'success', text: 'Ucapan berhasil dihapus!' });
                } else {
                    throw new Error('Failed to delete wish');
                }
            } catch (error) {
                setMessage({ type: 'error', text: 'Gagal menghapus ucapan' });
            }
        }
    };

    const updateField = (path: string, value: any) => {
        if (!data) return;
        const newData = { ...data };
        const keys = path.split('.');
        let current: any = newData;

        for (let i = 0; i < keys.length - 1; i++) {
            // Handle array indices like events[0]
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
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-navy-800">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 pl-10 text-gray-900 bg-white"
                                    placeholder="Masukkan password admin"
                                />
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>
                        {message && (
                            <p className={`text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message.text}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-navy-700 text-white py-2 rounded-lg hover:bg-navy-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center">Loading data...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-navy-800">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                            <FaSave /> {loading ? 'Saving...' : 'Simpan Perubahan'}
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-gray-500 hover:text-red-500"
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-8">
                {message && (
                    <div className={`fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg z-50 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[600px]">
                    <div className="flex border-b">
                        {['couple', 'events', 'story', 'gallery', 'gift', 'wishes', 'music'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium capitalize transition-colors ${activeTab === tab
                                    ? 'border-b-2 border-gold-500 text-gold-600 bg-gold-50'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {activeTab === 'couple' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg text-navy-800 border-b pb-2">Groom (Pria)</h3>
                                    <InputField label="Nama Lengkap" value={data.couple.groom.fullName} onChange={(v) => updateField('couple.groom.fullName', v)} />
                                    <InputField label="Nama Panggilan" value={data.couple.groom.shortName} onChange={(v) => updateField('couple.groom.shortName', v)} />
                                    <InputField label="Nama Orang Tua" value={data.couple.groom.parents} onChange={(v) => updateField('couple.groom.parents', v)} />
                                    <InputField label="Instagram" value={data.couple.groom.instagram} onChange={(v) => updateField('couple.groom.instagram', v)} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg text-navy-800 border-b pb-2">Bride (Wanita)</h3>
                                    <InputField label="Nama Lengkap" value={data.couple.bride.fullName} onChange={(v) => updateField('couple.bride.fullName', v)} />
                                    <InputField label="Nama Panggilan" value={data.couple.bride.shortName} onChange={(v) => updateField('couple.bride.shortName', v)} />
                                    <InputField label="Nama Orang Tua" value={data.couple.bride.parents} onChange={(v) => updateField('couple.bride.parents', v)} />
                                    <InputField label="Instagram" value={data.couple.bride.instagram} onChange={(v) => updateField('couple.bride.instagram', v)} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'events' && (
                            <div className="space-y-8">
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={addEvent}
                                        className="bg-navy-700 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition"
                                    >
                                        Tambah Acara Baru
                                    </button>
                                </div>
                                {data.events.map((event, index) => (
                                    <div key={index} className="border rounded-xl p-6 bg-gray-50 relative">
                                        <button
                                            onClick={() => removeEvent(index)}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-lg"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                        <h3 className="font-bold text-lg text-navy-800 mb-4">{event.name}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InputField label="Judul Acara" value={event.name} onChange={(v) => updateField(`events[${index}].name`, v)} />
                                            <InputField label="Waktu" value={event.time} onChange={(v) => updateField(`events[${index}].time`, v)} />
                                            <InputField label="Tanggal" value={event.date} onChange={(v) => updateField(`events[${index}].date`, v)} />
                                            <InputField label="Lokasi" value={event.location.name} onChange={(v) => updateField(`events[${index}].location.name`, v)} />
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                                <textarea
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 text-gray-900 bg-white"
                                                    value={event.location.address}
                                                    onChange={(e) => updateField(`events[${index}].location.address`, e.target.value)}
                                                    rows={3}
                                                />
                                            </div>
                                            <InputField label="Link Google Maps" value={event.location.googleMapsUrl} onChange={(v) => updateField(`events[${index}].location.googleMapsUrl`, v)} />
                                            <InputField label="Link Embed Google Maps" value={event.location.embedUrl} onChange={(v) => updateField(`events[${index}].location.embedUrl`, v)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'story' && (
                            <div className="space-y-6">
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={addStory}
                                        className="bg-navy-700 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition"
                                    >
                                        Tambah Cerita Baru
                                    </button>
                                </div>
                                {data.loveStory.map((story, index) => (
                                    <div key={index} className="border rounded-xl p-4 bg-gray-50 flex gap-4 items-start relative">
                                        <button
                                            onClick={() => removeStory(index)}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-lg"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <InputField label="Tahun" value={story.year} onChange={(v) => updateField(`loveStory[${index}].year`, v)} />
                                            <InputField label="Judul" value={story.title} onChange={(v) => updateField(`loveStory[${index}].title`, v)} />
                                            <div className="md:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Cerita</label>
                                                <textarea
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 text-gray-900 bg-white"
                                                    value={story.description}
                                                    onChange={(e) => updateField(`loveStory[${index}].description`, e.target.value)}
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-navy-800">Gallery Photos</h3>
                                    <label className="bg-navy-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-navy-800 transition flex items-center gap-2">
                                        <FaImage /> Upload Foto Baru
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {data.gallery.map((photo, index) => (
                                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                                            <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'gift' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg text-navy-800">Daftar Rekening / Kado Digital</h3>
                                    <button
                                        onClick={() => {
                                            const newData = { ...data };
                                            if (!newData.gifts) newData.gifts = [];
                                            newData.gifts.push({ bankName: 'BCA', accountNumber: '', accountHolder: '' });
                                            setData(newData);
                                        }}
                                        className="bg-navy-700 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition"
                                    >
                                        Tambah Rekening
                                    </button>
                                </div>
                                
                                {data.gifts?.map((gift, index) => (
                                    <div key={index} className="border rounded-xl p-6 bg-gray-50 relative">
                                        <button
                                            onClick={() => {
                                                const newData = { ...data };
                                                newData.gifts?.splice(index, 1);
                                                setData(newData);
                                            }}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-lg"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <InputField label="Nama Bank" value={gift.bankName} onChange={(v) => updateField(`gifts[${index}].bankName`, v)} />
                                            <InputField label="Nomor Rekening" value={gift.accountNumber} onChange={(v) => updateField(`gifts[${index}].accountNumber`, v)} />
                                            <InputField label="Nama Pemilik" value={gift.accountHolder} onChange={(v) => updateField(`gifts[${index}].accountHolder`, v)} />
                                        </div>
                                    </div>
                                ))}
                                {(!data.gifts || data.gifts.length === 0) && (
                                    <p className="text-center text-gray-500 py-8">Belum ada rekening yang ditambahkan.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'wishes' && (
                            <div>
                                <h3 className="font-bold text-lg text-navy-800 mb-6">Ucapan & Harapan</h3>
                                <div className="space-y-4">
                                    {(data.wishes || []).map((wish) => (
                                        <div key={wish.id} className="border rounded-lg p-4 bg-gray-50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-navy-700">{wish.name}</p>
                                                    <p className="text-sm text-gray-500 capitalize">Kehadiran: {wish.attendance}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{new Date(wish.timestamp).toLocaleString('id-ID')}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteWish(wish.id)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <p className="mt-3 text-gray-800 italic">"{wish.message}"</p>
                                        </div>
                                    ))}
                                    {(!data.wishes || data.wishes.length === 0) && (
                                        <p className="text-center text-gray-500 py-8">Belum ada ucapan.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'music' && (
                            <div className="max-w-md space-y-4">
                                <h3 className="font-bold text-lg text-navy-800 border-b pb-2">Background Music</h3>
                                <InputField label="Judul Lagu" value={data.music.title} onChange={(v) => updateField('music.title', v)} />
                                <InputField label="Artist" value={data.music.artist} onChange={(v) => updateField('music.artist', v)} />
                                <InputField label="URL File Lagu" value={data.music.url} onChange={(v) => updateField('music.url', v)} />
                                <p className="text-sm text-gray-500">Upload file lagu ke folder public/music dan masukkan path-nya di sini (misal: /music/lagu-baru.mp3)</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputField = ({ label, value, onChange, type = 'text' }: { label: string, value: string | undefined, onChange: (v: string) => void, type?: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 text-gray-900 bg-white"
        />
    </div>
);
