'use client';

import { I18nProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <I18nProvider>
            <Navbar />
            <main className="pt-16 min-h-screen">{children}</main>
        </I18nProvider>
    );
}
