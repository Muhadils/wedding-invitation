'use client';

import { useState, useEffect } from 'react';

export const usePersonalization = () => {
    const [guestName, setGuestName] = useState<string | null>(null);

    useEffect(() => {
        // Get guest name from URL parameter ?to=NamaGuest
        const urlParams = new URLSearchParams(window.location.search);
        const toParam = urlParams.get('to');

        if (toParam) {
            setGuestName(decodeURIComponent(toParam));
        }
    }, []);

    return { guestName };
};
