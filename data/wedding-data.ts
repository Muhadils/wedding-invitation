// WEDDING DATA CONFIGURATION
// Edit this file to customize your wedding invitation

export interface WeddingData {
    couple: {
        bride: {
            fullName: string;
            shortName: string;
            instagram?: string;
            parents: string;
        };
        groom: {
            fullName: string;
            shortName: string;
            instagram?: string;
            parents: string;
        };
    };
    events: Array<{
        name: string;
        date: string; // Format: YYYY-MM-DD
        time: string;
        location: {
            name: string;
            address: string;
            googleMapsUrl: string;
            embedUrl: string;
        };
    }>;
    gallery: Array<{
        id: number;
        url: string;
        caption?: string;
    }>;
    loveStory: Array<{
        year: string;
        title: string;
        description: string;
    }>;
    wishes: Array<{
        id: number;
        name: string;
        message: string;
        attendance: 'hadir' | 'tidak hadir' | 'belum pasti';
        timestamp: string;
    }>;
    music: {
        url: string;
        title: string;
        artist: string;
    };
    countdown: {
        targetDate: string;
    };
    gifts?: Array<{
        bankName: string;
        accountNumber: string;
        accountHolder: string;
        qrCode?: string;
    }>;
}

export const weddingData: WeddingData = {
    couple: {
        bride: {
            fullName: 'Salma Azzahra',
            shortName: 'Salma',
            instagram: '@salmaazzahra',
            parents: 'Putri dari Bapak [Nama Ayah Salma] & Ibu [Nama Ibu Salma]',
        },
        groom: {
            fullName: 'Andri Kurniawan',
            shortName: 'Andri',
            instagram: '@andrikurniawan',
            parents: 'Putra dari Bapak [Nama Ayah Andri] & Ibu [Nama Ibu Andri]',
        },
    },
    countdown: {
        targetDate: '2026-06-15T08:00:00',
    },
    events: [
        {
            name: 'Akad Nikah',
            date: '2026-06-15',
            time: '08:00 - 10:00 WIB',
            location: {
                name: 'Masjid Agung Jakarta',
                address: 'Jl. Medan Merdeka Timur No.10, Jakarta Pusat, DKI Jakarta 10110',
                googleMapsUrl: 'https://maps.google.com/?q=-6.1751,106.8650',
                embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666!2d106.8650!3d-6.1751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMzAuNCJTIDEwNsKwNTEnNTQuMCJF!5e0!3m2!1sen!2sid!4v1234567890',
            },
        },
    ],
    gallery: [
        { id: 1, url: '/images/gallery/IMG_2689.JPEG', caption: 'Our Wedding Photo' },
        { id: 2, url: '/images/gallery/photo2.jpg', caption: 'Our love story' },
        { id: 3, url: '/images/gallery/photo3.jpg', caption: 'Together forever' },
        { id: 4, url: '/images/gallery/photo4.jpg', caption: 'Beautiful memories' },
        { id: 5, url: '/images/gallery/photo5.jpg', caption: 'Endless love' },
        { id: 6, url: '/images/gallery/photo6.jpg', caption: 'Perfect match' },
    ],
    loveStory: [
        {
            year: '2020',
            title: 'Pertama Kali Bertemu',
            description: 'Kami bertemu pertama kali di kampus saat acara orientasi mahasiswa baru. Takdir mempertemukan kami di tempat yang sama.',
        },
        {
            year: '2021',
            title: 'Menjadi Lebih Dekat',
            description: 'Seiring berjalannya waktu, kami semakin dekat dan menyadari bahwa kami memiliki banyak kesamaan dan visi yang sama.',
        },
        {
            year: '2023',
            title: 'Lamaran',
            description: 'Di bawah langit bintang yang indah, dia mengatakan kata-kata yang telah lama kutunggu. Dan aku menjawab "Ya!"',
        },
        {
            year: '2026',
            title: 'Menikah',
            description: 'Hari yang kami tunggu-tunggu akhirnya tiba. Kami akan memulai babak baru kehidupan kami bersama.',
        },
    ],
    wishes: [
        {
            id: 1,
            name: 'Dian Sastro',
            message: 'Selamat menempuh hidup baru! Semoga langgeng sampai kakek nenek ❤️',
            attendance: 'hadir',
            timestamp: '2026-05-10T10:30:00',
        },
        {
            id: 2,
            name: 'Budi Santoso',
            message: 'Barakallah! Semoga menjadi keluarga sakinah mawaddah warahmah 🤲',
            attendance: 'hadir',
            timestamp: '2026-05-11T14:20:00',
        },
        {
            id: 3,
            name: 'Rina Anggraeni',
            message: 'Congratulations! Wishing you both a lifetime of love and happiness 💕',
            attendance: 'hadir',
            timestamp: '2026-05-12T09:15:00',
        },
    ],
    music: {
        url: '/music/WhatsApp Video 2026-02-16 at 21.44.38.mp3', // Replace with your music file
        title: 'Perfect',
        artist: 'Ed Sheeran',
    },
    gifts: [
        {
            bankName: 'BCA',
            accountNumber: '1234567890',
            accountHolder: 'Salma Azzahra'
        },
        {
            bankName: 'Mandiri',
            accountNumber: '0987654321',
            accountHolder: 'Andri Kurniawan'
        }
    ]
};

// Helper function to get countdown target date
export const getCountdownDate = (): Date => {
    return new Date(weddingData.events[0].date + 'T' + weddingData.events[0].time.split(' - ')[0]);
};

// Helper function to generate calendar event
export const generateCalendarEvent = (eventIndex: number = 0) => {
    const event = weddingData.events[eventIndex];
    const dateStr = event.date.replace(/-/g, '');
    const startTime = event.time.split(' - ')[0].replace(/:/g, '');
    const endTime = event.time.split(' - ')[1]?.replace(/:/g, '').replace(' WIB', '') || '';

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${dateStr}T${startTime}00
DTEND:${dateStr}T${endTime}00
SUMMARY:${event.name} - ${weddingData.couple.bride.shortName} & ${weddingData.couple.groom.shortName}
DESCRIPTION:Pernikahan ${weddingData.couple.bride.fullName} dan ${weddingData.couple.groom.fullName}
LOCATION:${event.location.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    return icsContent;
};

// Helper function to download calendar file
export const downloadCalendar = (eventIndex: number = 0) => {
    const icsContent = generateCalendarEvent(eventIndex);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'wedding-invitation.ics';
    link.click();
};
