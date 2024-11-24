'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-8 h-8" /> // Placeholder with same dimensions
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
                <MoonIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            )}
        </button>
    );
}
