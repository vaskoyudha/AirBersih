'use client';

import { I18nProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <I18nProvider>
            <Navbar />
            {/* pt-14 matches the navbar h-14 (56px) precisely */}
            <main className="pt-14">{children}</main>
        </I18nProvider>
    );
}
