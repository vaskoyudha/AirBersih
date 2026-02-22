'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import id from './id.json';
import en from './en.json';

type Locale = 'id' | 'en';
const translations = { id, en };

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const keys = path.split('.');
    let current: unknown = obj;
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = (current as Record<string, unknown>)[key];
        } else {
            return path;
        }
    }
    return typeof current === 'string' ? current : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('id');

    const t = (key: string): string => {
        return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) throw new Error('useI18n must be used within I18nProvider');
    return context;
}
