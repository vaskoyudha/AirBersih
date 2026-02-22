'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { RISK_CLASSIFICATIONS } from '@/lib/constants/water-standards';
import { ArrowRight, ArrowUpRight, Activity } from 'lucide-react';

// Map risk id to row class for left-bar accent
const RISK_ROW_CLASS: Record<string, string> = {
  aman: 'risk-row-safe',
  risiko_rendah: 'risk-row-low',
  risiko_sedang: 'risk-row-moderate',
  risiko_tinggi: 'risk-row-high',
  berbahaya: 'risk-row-danger',
};

export default function HomePage() {
  const { t } = useI18n();

  const stats = [
    { value: '83,762', label: t('stats.villages_monitored'), sub: 'desa' },
    { value: '2.4M+', label: t('stats.data_points'), sub: 'records' },
    { value: '38', label: t('stats.provinces'), sub: 'provinsi' },
    { value: '156K+', label: t('stats.water_sources'), sub: 'sumber air' },
  ];

  const features = [
    {
      index: '01',
      title: 'Peta Risiko Interaktif',
      desc: 'Choropleth 5 tingkat risiko untuk 83.000+ desa. Sumber air individual, animasi waktu, lapisan overlay.',
      href: '/map',
      tag: 'Spatial',
    },
    {
      index: '02',
      title: 'Model Prediksi ML',
      desc: 'Prediksi risiko kontaminasi untuk desa tanpa data monitoring via ensemble ML dengan kuantifikasi ketidakpastian.',
      href: '/analytics',
      tag: 'Machine Learning',
    },
    {
      index: '03',
      title: 'Pipeline NLP Pamsimas',
      desc: 'Ekstraksi terstruktur dari laporan Pamsimas — nama desa, jenis sumber air, insiden kontaminasi.',
      href: '/nlp',
      tag: 'NLP',
    },
    {
      index: '04',
      title: 'Kartu Laporan Desa',
      desc: 'PDF report card per desa — nilai keamanan air A–E, inventaris sumber air, rekomendasi tindakan.',
      href: '/laporan',
      tag: 'Reporting',
    },
    {
      index: '05',
      title: 'Laporan Masyarakat',
      desc: 'Form ringan tanpa login — GPS otomatis, klasifikasi keparahan, skor kredibilitas komunitas.',
      href: '/lapor',
      tag: 'Crowdsource',
    },
    {
      index: '06',
      title: 'Peringatan Pasca-Banjir',
      desc: 'Deteksi otomatis risiko kontaminasi saat banjir dengan protokol pemulihan dan pelacakan.',
      href: '/banjir',
      tag: 'Alert',
    },
  ];

  const riskLevels = Object.values(RISK_CLASSIFICATIONS);

  return (
    <div className="min-h-screen bg-black text-white noise">
      {/* ─── GLOBAL BACKGROUND — dot grid pinned behind everything ─── */}
      <div
        className="fixed inset-0 pointer-events-none select-none bg-dot-grid"
        style={{ zIndex: 0, opacity: 0.4 }}
        aria-hidden="true"
      />

      {/* ─── STRUCTURAL GLOWS — large, positional, 3-4% opacity ─── */}
      {/* Top-right: cyan anchor — data intelligence theme */}
      <div
        className="fixed pointer-events-none select-none"
        style={{
          top: 0, right: 0, width: '70vw', height: '70vh',
          background: 'radial-gradient(ellipse at 100% 0%, rgba(6,182,212,0.04) 0%, transparent 65%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      {/* Bottom-left: safe/green anchor — positive data signal */}
      <div
        className="fixed pointer-events-none select-none"
        style={{
          bottom: 0, left: 0, width: '60vw', height: '60vh',
          background: 'radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.03) 0%, transparent 70%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ─── PAGE CONTENT — above background layers ─── */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ─── HERO ────────────────────────────────────────────────── */}
        <section className="pt-32 pb-0 px-6 lg:px-8 max-w-7xl mx-auto">

          {/* Eyebrow — with live status indicator */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-dot-live"
                title="System live"
              />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em]">
                AirBersih / v2.1
              </span>
            </div>
            <span className="w-6 h-px bg-white/[0.08]" />
            <span className="text-[10px] font-mono text-white/15 uppercase tracking-[0.25em]">
              Permenkes 492/2010
            </span>
            <span className="w-6 h-px bg-white/[0.08]" />
            <span className="text-[10px] font-mono text-white/15 uppercase tracking-[0.25em]">
              WHO WSP Framework
            </span>
          </div>

          {/* Asymmetric hero grid */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-end pb-16 border-b border-white/[0.05]">
            <div>
              <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.93] tracking-[-0.04em] text-white mb-8 max-w-3xl">
                {t('hero.title')}
              </h1>
              <p className="text-[15px] text-white/35 leading-relaxed max-w-xl font-normal">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex lg:flex-col gap-3 shrink-0">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-black bg-white hover:bg-white/90 transition-colors duration-150 whitespace-nowrap"
              >
                {t('hero.cta')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/analytics"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white/40 border border-white/[0.1] hover:border-white/20 hover:text-white/80 transition-colors duration-150 whitespace-nowrap"
              >
                {t('hero.secondary_cta')}
              </Link>
            </div>
          </div>

          {/* Stat strip — premium with left-bar stat dividers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/[0.05]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  'py-8 relative',
                  i === 0 ? 'pr-6 lg:pr-8' : 'px-6 lg:px-8',
                  i > 0 ? 'border-l border-white/[0.05]' : '',
                  i >= 2 ? 'border-t lg:border-t-0 border-white/[0.05]' : '',
                ].join(' ')}
              >
                {/* Faint left-edge micro-highlight on hover */}
                <p className="text-[2.4rem] font-bold tracking-[-0.04em] text-white leading-none mb-1.5 tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[10px] text-white/25 uppercase tracking-[0.18em] font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── RISK MATRIX + DATA SOURCES ──────────────────────────── */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.05]">
          {/* Section label */}
          <div className="pt-16 pb-6 flex items-center gap-4">
            <Activity className="w-3 h-3 text-white/15" />
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em]">
              Intelligence Layer — Risk Classification Matrix
            </span>
          </div>

          <div className="pb-16 grid lg:grid-cols-[1fr_380px] gap-0">

            {/* Left: risk classification table — Bloomberg terminal style */}
            <div className="lg:border-r border-white/[0.05] lg:pr-16">
              {/* Table header */}
              <div
                className="rounded-t-lg overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        background: 'rgba(255,255,255,0.015)',
                      }}
                    >
                      <th className="py-2.5 px-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] font-normal w-16">Kode</th>
                      <th className="py-2.5 px-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] font-normal">Klasifikasi</th>
                      <th className="py-2.5 px-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] font-normal w-24 text-right">Skor</th>
                      <th className="py-2.5 px-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] font-normal w-32 text-right">EN Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskLevels.map((risk, i) => (
                      <tr
                        key={risk.id}
                        className={`group transition-colors ${RISK_ROW_CLASS[risk.id] ?? ''}`}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-mono text-white/18 tabular-nums">
                            R{String(i + 1).padStart(2, '0')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: risk.color, boxShadow: `0 0 6px ${risk.color}60` }}
                            />
                            <span className="text-[13px] font-medium text-white/75 group-hover:text-white/95 transition-colors">
                              {risk.labelId}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-[11px] font-mono text-white/25 tabular-nums">
                            {risk.score[0]}–{risk.score[1]}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className="text-[10px] font-mono uppercase tracking-[0.1em]"
                            style={{ color: risk.color, opacity: 0.85 }}
                          >
                            {risk.labelEn}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coverage micro-bars — visual density indicator */}
              <div className="mt-5 flex items-center gap-1.5">
                {[12, 18, 25, 28, 17].map((pct, i) => (
                  <div
                    key={i}
                    className="h-0.5 rounded-none transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: riskLevels[i]?.color ?? '#555',
                      opacity: 0.45,
                    }}
                  />
                ))}
                <span className="text-[10px] font-mono text-white/15 ml-2 whitespace-nowrap">coverage dist.</span>
              </div>
            </div>

            {/* Right: data sources — structured list */}
            <div className="hidden lg:flex flex-col justify-between pl-16 py-0">
              <div>
                <p className="eyebrow mb-6">Data Sources</p>
                <ul className="flex flex-col gap-0">
                  {([
                    ['Kemenkes RI', 'Ministry of Health', '#10B981'],
                    ['Pamsimas', 'Community Water Program', '#84CC16'],
                    ['PDAM', 'Regional Water Authority', '#06B6D4'],
                    ['Community', 'Crowdsourced Reports', '#CA8A04'],
                    ['BMKG', 'Weather & Flood Data', '#EA580C'],
                  ] as [string, string, string][]).map(([id, label, accent]) => (
                    <li
                      key={id}
                      className="flex items-center justify-between py-3.5 group"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.035)' }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-px h-3 rounded-none"
                          style={{ backgroundColor: accent, opacity: 0.5 }}
                        />
                        <span className="text-[13px] font-medium text-white/70 group-hover:text-white/95 transition-colors">
                          {id}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/18">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom metadata block */}
              <div className="mt-10 pt-5 border-t border-white/[0.04]">
                <p className="eyebrow mb-3">Compliance</p>
                <p className="text-[10px] font-mono text-white/18 leading-[1.9]">
                  Permenkes 492/2010<br />
                  WHO Water Safety Plan<br />
                  SNI 6775:2008 — PDAM<br />
                  Update cadence: real-time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CAPABILITY INDEX ──────────────────────────────────────── */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.05]">

          <div className="py-16 flex items-end justify-between border-b border-white/[0.05] mb-0">
            <div>
              <p className="eyebrow mb-4">Platform Capabilities</p>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] text-white leading-tight max-w-lg">
                End-to-end intelligence.<br />
                From raw reports to spatial risk.
              </h2>
            </div>
            <Link
              href="/map"
              className="hidden lg:inline-flex items-center gap-2 text-[11px] font-mono text-white/25 hover:text-white/70 transition-colors shrink-0"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Feature rows — high-density, Linear-esque index list */}
          <div>
            {features.map((feature, i) => (
              <Link
                key={feature.index}
                href={feature.href}
                className="group flex items-start lg:items-center gap-6 lg:gap-12 py-5 transition-colors -mx-6 lg:-mx-8 px-6 lg:px-8"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.035)' }}
              >
                {/* Index */}
                <span className="text-[10px] font-mono text-white/15 w-6 shrink-0 mt-0.5 lg:mt-0 tabular-nums">
                  {feature.index}
                </span>

                {/* Title */}
                <span className="text-[14px] font-semibold text-white/65 group-hover:text-white transition-colors w-52 shrink-0 leading-snug">
                  {feature.title}
                </span>

                {/* Desc */}
                <span className="hidden lg:block text-[12px] text-white/25 leading-relaxed flex-1">
                  {feature.desc}
                </span>

                {/* Tag + arrow */}
                <div className="flex items-center gap-4 shrink-0 ml-auto lg:ml-0">
                  <span className="hidden lg:block text-[9px] font-mono text-white/15 uppercase tracking-[0.18em] border border-white/[0.07] px-2 py-0.5 rounded-sm">
                    {feature.tag}
                  </span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 text-white/15 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── CTA ─────────────────────────────────────────────────── */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="py-24 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-center">
            <div>
              {/* Faint structural glow behind CTA heading */}
              <div
                className="pointer-events-none absolute"
                style={{
                  width: '500px',
                  height: '300px',
                  background: 'radial-gradient(ellipse at 0% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)',
                  transform: 'translateY(-50%)',
                }}
                aria-hidden="true"
              />
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white leading-[1.05] mb-5 relative">
                Deploy National Intelligence.
              </h2>
              <p className="text-[14px] text-white/30 max-w-md leading-relaxed">
                Indonesia's most comprehensive water quality risk index. Open, transparent, and built for the people who need it most.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/map"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px] font-semibold text-black bg-white hover:bg-white/90 transition-colors duration-150 whitespace-nowrap"
              >
                Launch Platform <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tentang"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px] font-medium text-white/35 border border-white/[0.08] hover:border-white/20 hover:text-white/70 transition-colors duration-150 whitespace-nowrap"
              >
                Tentang Proyek
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ──────────────────────────────────────────────── */}
        <footer
          className="px-6 lg:px-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-7xl mx-auto py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <span className="text-[12px] font-semibold text-white/50">AirBersih</span>
              <span className="text-[10px] font-mono text-white/12">© 2025</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono text-white/18">Permenkes 492/2010</span>
              <span className="text-[10px] font-mono text-white/18">WHO Water Safety Plan</span>
              <Link
                href="/tentang"
                className="text-[10px] font-mono text-white/22 hover:text-white/60 transition-colors"
              >
                Tentang
              </Link>
            </div>
          </div>
        </footer>

      </div>{/* /relative z-1 */}
    </div>
  );
}
