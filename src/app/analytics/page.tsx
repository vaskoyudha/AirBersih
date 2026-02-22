'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { RISK_CLASSIFICATIONS } from '@/lib/constants/water-standards';
import {
    BarChart3, TrendingUp, Globe2, ArrowUpRight, ArrowDownRight,
    Droplets, Shield, Map, Download, Filter,
} from 'lucide-react';

// Demo province data
const PROVINCE_DATA = [
    { name: 'DKI Jakarta', code: '31', score: 35, trend: -5, coverage: 92, population: 10560000 },
    { name: 'Jawa Barat', code: '32', score: 52, trend: -3, coverage: 68, population: 49570000 },
    { name: 'Jawa Tengah', code: '33', score: 45, trend: -8, coverage: 75, population: 36740000 },
    { name: 'Jawa Timur', code: '35', score: 48, trend: -4, coverage: 72, population: 40670000 },
    { name: 'DI Yogyakarta', code: '34', score: 28, trend: -12, coverage: 88, population: 3880000 },
    { name: 'Bali', code: '51', score: 22, trend: -6, coverage: 90, population: 4320000 },
    { name: 'Sumatera Utara', code: '12', score: 58, trend: 2, coverage: 55, population: 14800000 },
    { name: 'Sumatera Barat', code: '13', score: 42, trend: -3, coverage: 62, population: 5530000 },
    { name: 'Kalimantan Timur', code: '64', score: 65, trend: 5, coverage: 45, population: 3720000 },
    { name: 'Kalimantan Selatan', code: '63', score: 68, trend: 3, coverage: 42, population: 4120000 },
    { name: 'Sulawesi Selatan', code: '73', score: 55, trend: -2, coverage: 58, population: 9080000 },
    { name: 'Papua', code: '94', score: 82, trend: 1, coverage: 25, population: 4300000 },
    { name: 'Papua Barat', code: '91', score: 78, trend: 2, coverage: 28, population: 1130000 },
    { name: 'NTT', code: '53', score: 72, trend: -1, coverage: 35, population: 5540000 },
    { name: 'NTB', code: '52', score: 55, trend: -4, coverage: 52, population: 5240000 },
    { name: 'Riau', code: '14', score: 50, trend: 1, coverage: 48, population: 6900000 },
    { name: 'Lampung', code: '18', score: 48, trend: -2, coverage: 55, population: 9010000 },
    { name: 'Aceh', code: '11', score: 52, trend: -3, coverage: 50, population: 5370000 },
].sort((a, b) => a.score - b.score);

const CONTAMINATION_STATS = [
    { type: 'Mikrobiologis', percentage: 62, affected: '183M', color: '#ef4444', description: 'E. coli & coliform — tersebar terutama di Jawa dan wilayah padat penduduk' },
    { type: 'Nitrat', percentage: 28, affected: '82M', color: '#f97316', description: 'Dari limpasan pertanian dan pupuk — dominan di daerah pertanian intensif' },
    { type: 'Logam Berat', percentage: 15, affected: '44M', color: '#eab308', description: 'Fe, Mn, Pb dari aktivitas pertambangan — dominan di Kalimantan & Sulawesi' },
    { type: 'Arsen/Fluorida', percentage: 8, affected: '23M', color: '#8b5cf6', description: 'Dari geologi akuifer — daerah karst dan vulkanik' },
];

function getRiskColor(score: number) {
    if (score < 20) return RISK_CLASSIFICATIONS.aman.color;
    if (score < 40) return RISK_CLASSIFICATIONS.risiko_rendah.color;
    if (score < 60) return RISK_CLASSIFICATIONS.risiko_sedang.color;
    if (score < 80) return RISK_CLASSIFICATIONS.risiko_tinggi.color;
    return RISK_CLASSIFICATIONS.berbahaya.color;
}

export default function AnalyticsPage() {
    const { t } = useI18n();
    const [sortBy, setSortBy] = useState<'score' | 'coverage' | 'population'>('score');

    const sortedProvinces = [...PROVINCE_DATA].sort((a, b) => {
        if (sortBy === 'score') return a.score - b.score;
        if (sortBy === 'coverage') return b.coverage - a.coverage;
        return b.population - a.population;
    });

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                {/* === HEADER === */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-stark">
                        Analitik Nasional
                    </h1>
                    <p className="text-[#888] text-sm">Gambaran komprehensif keamanan air minum Indonesia</p>
                </div>

                {/* === TOP STATS === */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Populasi Air Aman', value: '11,9%', sub: 'Safely managed', icon: Shield, trend: '+2.1%' },
                        { label: 'Desa Terpantau', value: '35.847', sub: 'dari 83.762', icon: Map, trend: '+1.542' },
                        { label: 'Risiko Rata-rata', value: '48.3', sub: 'Skor nasional', icon: BarChart3, trend: '-3.2' },
                        { label: 'Sumber Air', value: '156.234', sub: 'Terinventarisasi', icon: Droplets, trend: '+12.450' },
                    ].map((stat) => (
                        <div key={stat.label} className="bento-box p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white/5 border border-white/5">
                                    <stat.icon className="w-4 h-4 text-[#888]" />
                                </div>
                                <span className={`text-[11px] font-mono flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-[#10B981]' : 'text-[#DC2626]'}`}>
                                    {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-3xl font-semibold text-white tracking-stark bg-transparent">{stat.value}</p>
                            <p className="text-[11px] uppercase tracking-widest text-[#666] mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* === CONTAMINATION TYPES === */}
                <div className="mb-10">
                    <h2 className="text-base font-semibold text-white mb-4 tracking-stark">Jenis Kontaminasi</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CONTAMINATION_STATS.map((item) => (
                            <div key={item.type} className="bento-box p-6 group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-none" style={{ backgroundColor: item.color }} />
                                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[#888] group-hover:text-white transition-colors">{item.type}</h3>
                                </div>
                                <p className="text-4xl font-semibold mb-1 tracking-stark" style={{ color: item.color }}>
                                    {item.percentage}%
                                </p>
                                <p className="text-[11px] uppercase tracking-widest text-[#666] mb-4">{item.affected} orang terdampak</p>
                                {/* Bar */}
                                <div className="w-full h-1 bg-[#222] rounded-none overflow-hidden">
                                    <div
                                        className="h-full rounded-none transition-all duration-1000"
                                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                    />
                                </div>
                                <p className="text-[11px] text-[#777] leading-relaxed mt-4">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === PROVINCIAL RANKING === */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-white tracking-stark">Peringkat Provinsi</h2>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#666]" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'score' | 'coverage' | 'population')}
                                className="px-3 py-1.5 bg-[#0A0A0A] border border-white/10 rounded-md text-xs text-[#888] focus:outline-none focus:border-white/30 transition-colors uppercase tracking-widest"
                            >
                                <option value="score">Skor Risiko</option>
                                <option value="coverage">Cakupan Data</option>
                                <option value="population">Populasi</option>
                            </select>
                        </div>
                    </div>

                    <div className="bento-box overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5 bg-[#050505]">
                                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#666] font-semibold">#</th>
                                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#666] font-semibold">Provinsi</th>
                                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#666] font-semibold">Skor Risiko</th>
                                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#666] font-semibold">Tren</th>
                                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#666] font-semibold">Cakupan</th>
                                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#666] font-semibold">Populasi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedProvinces.map((prov, i) => (
                                        <tr key={prov.code} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 text-xs text-[#666] font-mono">{i + 1}</td>
                                            <td className="px-6 py-4 text-sm text-[#CCC] font-medium group-hover:text-white transition-colors">{prov.name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-none" style={{ backgroundColor: getRiskColor(prov.score) }} />
                                                    <span className="text-xs font-mono w-6" style={{ color: getRiskColor(prov.score) }}>
                                                        {prov.score}
                                                    </span>
                                                    <div className="w-24 h-1 bg-[#222] rounded-none overflow-hidden">
                                                        <div
                                                            className="h-full rounded-none"
                                                            style={{ width: `${prov.score}%`, backgroundColor: getRiskColor(prov.score) }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-mono flex items-center gap-1 ${prov.trend < 0 ? 'text-[#10B981]' : 'text-[#DC2626]'}`}>
                                                    {prov.trend < 0 ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                                                    {Math.abs(prov.trend)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-[#888] font-mono">{prov.coverage}%</td>
                                            <td className="px-6 py-4 text-xs text-[#888] font-mono">{(prov.population / 1000000).toFixed(1)}M</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* === EXPORT === */}
                <div className="flex gap-4">
                    <button className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-widest text-black bg-white rounded-md hover:bg-[#EAEAEA] transition-colors">
                        <Download className="w-4 h-4" />
                        Unduh CSV
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-widest text-white bg-transparent border border-white/10 rounded-md hover:bg-white/5 transition-colors">
                        <Download className="w-4 h-4 text-[#888]" />
                        Unduh GeoJSON
                    </button>
                </div>
            </div>
        </div>
    );
}
