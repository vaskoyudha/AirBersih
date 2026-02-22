'use client';

import {
    BarChart3, Map, Database, Calendar,
    CheckCircle, AlertCircle, Minus,
} from 'lucide-react';

const COVERAGE_DATA = [
    { province: 'DKI Jakarta', code: '31', totalDesa: 267, withData: 245, withRecent: 210, sources: ['Kemenkes', 'BPS', 'PDAM'], lastUpdate: '2025-02-10' },
    { province: 'Jawa Barat', code: '32', totalDesa: 5962, withData: 4150, withRecent: 2800, sources: ['Pamsimas', 'BPS'], lastUpdate: '2025-01-28' },
    { province: 'Jawa Tengah', code: '33', totalDesa: 8562, withData: 6421, withRecent: 4200, sources: ['Pamsimas', 'Kemenkes', 'BPS'], lastUpdate: '2025-02-12' },
    { province: 'Jawa Timur', code: '35', totalDesa: 8501, withData: 6120, withRecent: 3900, sources: ['Pamsimas', 'BPS'], lastUpdate: '2025-01-15' },
    { province: 'DI Yogyakarta', code: '34', totalDesa: 438, withData: 385, withRecent: 320, sources: ['Kemenkes', 'BPS', 'Pamsimas'], lastUpdate: '2025-02-08' },
    { province: 'Bali', code: '51', totalDesa: 716, withData: 642, withRecent: 500, sources: ['Kemenkes', 'PDAM'], lastUpdate: '2025-02-05' },
    { province: 'Sumatera Utara', code: '12', totalDesa: 6103, withData: 3350, withRecent: 1800, sources: ['Pamsimas', 'BPS'], lastUpdate: '2024-12-20' },
    { province: 'Kalimantan Timur', code: '64', totalDesa: 1032, withData: 465, withRecent: 280, sources: ['BPS'], lastUpdate: '2024-11-15' },
    { province: 'Sulawesi Selatan', code: '73', totalDesa: 3030, withData: 1760, withRecent: 900, sources: ['Pamsimas', 'BPS'], lastUpdate: '2025-01-05' },
    { province: 'Papua', code: '94', totalDesa: 5419, withData: 1354, withRecent: 450, sources: ['BPS'], lastUpdate: '2024-09-10' },
    { province: 'NTT', code: '53', totalDesa: 3270, withData: 1145, withRecent: 600, sources: ['Pamsimas'], lastUpdate: '2024-10-22' },
    { province: 'Aceh', code: '11', totalDesa: 6513, withData: 3256, withRecent: 1500, sources: ['Pamsimas', 'BPS'], lastUpdate: '2024-12-01' },
];

function getCoverageColor(pct: number): string {
    if (pct >= 80) return '#22c55e';
    if (pct >= 60) return '#84cc16';
    if (pct >= 40) return '#eab308';
    if (pct >= 20) return '#f97316';
    return '#ef4444';
}

export default function DataCoveragePage() {
    const totalDesa = COVERAGE_DATA.reduce((s, p) => s + p.totalDesa, 0);
    const totalWithData = COVERAGE_DATA.reduce((s, p) => s + p.withData, 0);
    const totalRecent = COVERAGE_DATA.reduce((s, p) => s + p.withRecent, 0);

    return (
        <div className="min-h-screen bg-grid">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        <span className="gradient-text">Cakupan Data</span>
                    </h1>
                    <p className="text-slate-400">Transparansi tentang di mana data kualitas air tersedia dan di mana tidak</p>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="glass-card p-5 text-center">
                        <Database className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{((totalWithData / totalDesa) * 100).toFixed(1)}%</p>
                        <p className="text-xs text-slate-500">Desa dengan data</p>
                        <p className="text-[10px] text-slate-600">{totalWithData.toLocaleString()} dari {totalDesa.toLocaleString()}</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{((totalRecent / totalDesa) * 100).toFixed(1)}%</p>
                        <p className="text-xs text-slate-500">Data terkini (&lt;6 bulan)</p>
                        <p className="text-[10px] text-slate-600">{totalRecent.toLocaleString()} desa</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{((1 - totalWithData / totalDesa) * 100).toFixed(1)}%</p>
                        <p className="text-xs text-slate-500">Tanpa data (prediksi ML)</p>
                        <p className="text-[10px] text-slate-600">{(totalDesa - totalWithData).toLocaleString()} desa</p>
                    </div>
                </div>

                {/* Province Table */}
                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50">
                                    <th className="text-left px-4 py-3 text-xs text-slate-500">Provinsi</th>
                                    <th className="text-left px-4 py-3 text-xs text-slate-500">Total Desa</th>
                                    <th className="text-left px-4 py-3 text-xs text-slate-500">Dengan Data</th>
                                    <th className="text-left px-4 py-3 text-xs text-slate-500">Cakupan</th>
                                    <th className="text-left px-4 py-3 text-xs text-slate-500">Sumber</th>
                                    <th className="text-left px-4 py-3 text-xs text-slate-500">Update Terakhir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COVERAGE_DATA.map((prov) => {
                                    const pct = Math.round((prov.withData / prov.totalDesa) * 100);
                                    return (
                                        <tr key={prov.code} className="border-b border-slate-800/50 hover:bg-cyan-500/5">
                                            <td className="px-4 py-3 text-sm text-white font-medium">{prov.province}</td>
                                            <td className="px-4 py-3 text-xs text-slate-400">{prov.totalDesa.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-xs text-slate-400">{prov.withData.toLocaleString()}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: getCoverageColor(pct) }} />
                                                    </div>
                                                    <span className="text-xs font-mono" style={{ color: getCoverageColor(pct) }}>{pct}%</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {prov.sources.map(s => (
                                                        <span key={s} className="text-[9px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">{s}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-500">{prov.lastUpdate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
