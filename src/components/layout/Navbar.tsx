'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, locale, setLocale } = useI18n();

    const navItems = [
        { href: '/map', label: t('nav.map') },
        { href: '/analytics', label: t('nav.analytics') },
        { href: '/laporan', label: t('nav.reports') },
        { href: '/lapor', label: t('nav.report') },
        { href: '/banjir', label: t('nav.flood') },
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(16px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.055)',
            }}
        >
            {/* Bottom hairline — subtle cyan tint structural accent */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.12) 30%, rgba(6,182,212,0.12) 70%, transparent 100%)',
                }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">

                    {/* Wordmark */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        {/* Logo mark — 4px dot grid square */}
                        <div
                            className="w-5 h-5 relative shrink-0"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px p-0.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="rounded-none"
                                        style={{
                                            backgroundColor: i === 0
                                                ? 'rgba(6,182,212,0.7)'
                                                : `rgba(255,255,255,${0.08 + i * 0.04})`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <span className="text-[13px] font-semibold text-white tracking-tight">
                            AirBersih
                        </span>
                        <span
                            className="hidden sm:block text-[9px] text-white/18 font-mono uppercase tracking-[0.22em] pl-3"
                            style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            Intelligence
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative px-4 py-1 text-[12px] text-white/35 hover:text-white/90 transition-colors duration-150 font-medium group"
                            >
                                {item.label}
                                {/* Hover underline — structural not decorative */}
                                <span
                                    className="absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                                    style={{ background: 'rgba(255,255,255,0.2)' }}
                                    aria-hidden="true"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Right — locale toggle + mobile trigger */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setLocale(locale === 'id' ? 'en' : 'id')}
                            className="text-[10px] font-mono text-white/25 hover:text-white/70 transition-colors duration-150 tracking-widest uppercase border border-white/[0.07] hover:border-white/[0.14] px-2 py-0.5 rounded-sm"
                        >
                            {locale === 'id' ? 'EN' : 'ID'}
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-1 text-white/30 hover:text-white/80 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    className="md:hidden"
                    style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        background: 'rgba(0,0,0,0.95)',
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-0">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="py-3 text-[12px] text-white/35 hover:text-white/80 transition-colors font-medium"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
