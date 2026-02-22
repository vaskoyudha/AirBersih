'use client';

import { useState } from 'react';
import { RISK_CLASSIFICATIONS } from '@/lib/constants/water-standards';
import {
    AlertTriangle, CloudRain, Droplets, Clock,
    CheckCircle, MapPin, Shield, TrendingUp,
    ChevronRight, Activity,
} from 'lucide-react';

const DEMO_FLOOD_ALERTS = [
    {
        id: '1',
        region: 'Jakarta Utara & Jakarta Timur',
        severity: 'berat',
        startedAt: '2025-02-18',
        source: 'BNPB',
        affectedSources: 145,
        recoveryStatus: 'aktif',
        estimatedRecovery: '7-14 hari',
        contaminationTypes: ['E. coli', 'Total Coliform', 'Turbidity'],
    },
    {
        id: '2',
        region: 'Kab. Semarang, Jawa Tengah',
        severity: 'sedang',
        startedAt: '2025-02-15',
        source: 'BPBD Jateng',
        affectedSources: 67,
        recoveryStatus: 'pemulihan',
        estimatedRecovery: '3-5 hari',
        contaminationTypes: ['E. coli', 'Turbidity'],
    },
    {
        id: '3',
        region: 'Kab. Bandung, Jawa Barat',
        severity: 'ringan',
        startedAt: '2025-02-10',
        source: 'BPBD Jabar',
        affectedSources: 23,
        recoveryStatus: 'pulih',
        estimatedRecovery: 'Selesai',
        contaminationTypes: ['Turbidity'],
    },
];

const TESTING_CHECKLIST = [
    { source: 'Sumur Gali RT 03', type: 'sumur_gali', priority: 'Tinggi', status: 'Belum diuji', elevation: 'Rendah' },
    { source: 'Mata Air Sendang Lor', type: 'mata_air', priority: 'Tinggi', status: 'Belum diuji', elevation: 'Rendah' },
    { source: 'PDAM Sambungan Kel. Karangayu', type: 'pdam', priority: 'Sedang', status: 'Diuji - Aman', elevation: 'Tinggi' },
    { source: 'Sumur Bor RW 12', type: 'sumur_bor', priority: 'Sedang', status: 'Belum diuji', elevation: 'Sedang' },
    { source: 'Pamsimas Desa Mijen', type: 'pamsimas', priority: 'Rendah', status: 'Diuji - Aman', elevation: 'Tinggi' },
];

export default function BanjirPage() {
    const [selectedAlert, setSelectedAlert] = useState(DEMO_FLOOD_ALERTS[0]);

    const severityConfig = {
        berat: { color: '#ef4444', bg: 'bg-red-500/10', text: 'text-red-400', label: 'Berat' },
        sedang: { color: '#f97316', bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Sedang' },
        ringan: { color: '#eab308', bg: 'bg-yellow-500/10', text: 'text-yellow-400', label: 'Ringan' },
    };

    const recoveryConfig = {
        aktif: { color: 'text-[#DC2626]', bg: 'bg-[#DC2626]/10 border-[#DC2626]/30', icon: AlertTriangle, label: 'Banjir Aktif' },
        pemulihan: { color: 'text-[#CA8A04]', bg: 'bg-[#CA8A04]/10 border-[#CA8A04]/30', icon: Activity, label: 'Pemulihan' },
        pulih: { color: 'text-[#10B981]', bg: 'bg-[#10B981]/10 border-[#10B981]/30', icon: CheckCircle, label: 'Pulih' },
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                {/* Header */}
                <div className="mb-10 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                            <CloudRain className="w-6 h-6 text-[#888]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-stark">Peringatan Kontaminasi Pasca-Banjir</h1>
                            <p className="text-sm text-[#888] mt-1">Monitoring otomatis dampak banjir pada kualitas air minum</p>
                        </div>
                    </div>
                </div>

                {/* Active Alerts Summary */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bento-box p-6 border-[#DC2626]/20 bg-[#DC2626]/5">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                            <span className="text-[11px] uppercase tracking-widest text-[#DC2626] font-semibold">Peringatan Aktif</span>
                        </div>
                        <p className="text-4xl font-bold tracking-stark text-[#DC2626]">2</p>
                        <p className="text-xs text-[#888] mt-1 font-mono">wilayah terdampak</p>
                    </div>
                    <div className="bento-box p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Droplets className="w-4 h-4 text-[#CA8A04]" />
                            <span className="text-[11px] uppercase tracking-widest text-[#CA8A04] font-semibold">Sumber Air Terdampak</span>
                        </div>
                        <p className="text-4xl font-bold tracking-stark text-[#CA8A04]">235</p>
                        <p className="text-xs text-[#888] mt-1 font-mono">perlu verifikasi</p>
                    </div>
                    <div className="bento-box p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-[#888]" />
                            <span className="text-[11px] uppercase tracking-widest text-[#888] font-semibold">Estimasi Pemulihan</span>
                        </div>
                        <p className="text-4xl font-bold tracking-stark text-white">7-14</p>
                        <p className="text-xs text-[#888] mt-1 font-mono">hari (kasus terparah)</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Alert List */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">Peringatan Banjir</h2>
                        <div className="space-y-3">
                            {DEMO_FLOOD_ALERTS.map((alert) => {
                                const sev = severityConfig[alert.severity as keyof typeof severityConfig];
                                const rec = recoveryConfig[alert.recoveryStatus as keyof typeof recoveryConfig];
                                return (
                                    <button
                                        key={alert.id}
                                        onClick={() => setSelectedAlert(alert)}
                                        className={`w-full bento-box p-5 text-left transition-colors border ${selectedAlert?.id === alert.id ? 'border-white bg-[#0A0A0A]' : 'border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-semibold tracking-stark text-white mb-3">{alert.region}</p>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className={`text-[10px] px-2 py-1 rounded-sm border uppercase tracking-widest font-mono ${sev.bg} ${sev.text} border-${sev.color}/30`} style={{ borderColor: `${sev.color}40` }}>
                                                        {sev.label}
                                                    </span>
                                                    <span className={`text-[10px] px-2 py-1 rounded-sm border uppercase tracking-widest font-mono ${rec.bg} ${rec.color}`} style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                                        {rec.label}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 transition-colors ${selectedAlert?.id === alert.id ? 'text-white' : 'text-[#444]'}`} />
                                        </div>
                                        <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-[#666] font-mono border-t border-white/5 pt-3">
                                            <span>📅 {alert.startedAt}</span>
                                            <span>💧 {alert.affectedSources} sumber</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Alert Detail */}
                    <div className="lg:col-span-2">
                        {selectedAlert && (
                            <div className="space-y-6">
                                {/* Status Banner */}
                                <div className={`bento-box p-8 ${selectedAlert.recoveryStatus === 'aktif' ? 'border-[#DC2626]/30 bg-[#050505]' : ''
                                    }`}>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                                        <MapPin className="w-5 h-5 text-[#888]" />
                                        <h3 className="text-xl font-bold text-white tracking-stark">{selectedAlert.region}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2">Tingkat Keparahan</p>
                                            <p className={`text-sm font-mono uppercase ${severityConfig[selectedAlert.severity as keyof typeof severityConfig].text}`}>
                                                {severityConfig[selectedAlert.severity as keyof typeof severityConfig].label}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2">Sumber Terdampak</p>
                                            <p className="text-xl font-bold tracking-stark text-white">{selectedAlert.affectedSources}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2">Estimasi Pemulihan</p>
                                            <p className="text-xl font-bold tracking-stark text-white">{selectedAlert.estimatedRecovery}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2">Sumber Informasi</p>
                                            <p className="text-sm font-medium text-[#CCC] mt-2">{selectedAlert.source}</p>
                                        </div>
                                    </div>

                                    {selectedAlert.recoveryStatus === 'aktif' && (
                                        <div className="mt-8 p-4 bg-[#DC2626]/10 rounded-md border border-[#DC2626]/20">
                                            <p className="text-xs uppercase tracking-widest text-[#DC2626] font-semibold flex items-center gap-2 mb-2">
                                                <AlertTriangle className="w-4 h-4" />
                                                Terdampak Banjir — Verifikasi Diperlukan
                                            </p>
                                            <p className="text-xs text-[#DC2626]/80 leading-relaxed font-mono">
                                                Semua sumber air di wilayah ini telah dinaikkan level risikonya. Masyarakat disarankan merebus air sebelum dikonsumsi.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Testing Checklist */}
                                <div className="bento-box p-8">
                                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-6 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-[#666]" />
                                        Daftar Pengujian Prioritas
                                    </h3>
                                    <div className="space-y-2">
                                        {TESTING_CHECKLIST.map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 px-4 py-3 bg-[#050505] border border-white/5 hover:bg-white/5 transition-colors rounded-md">
                                                <div className={`w-1.5 h-1.5 rounded-none ${item.status.includes('Aman') ? 'bg-[#10B981]' : 'bg-[#CA8A04] animate-pulse'
                                                    }`} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-white truncate font-medium">{item.source}</p>
                                                    <p className="text-[11px] uppercase tracking-widest text-[#666] font-mono mt-1">{item.type.replace(/_/g, ' ')} • Elevasi: {item.elevation}</p>
                                                </div>
                                                <span className={`text-[10px] uppercase tracking-widest font-mono border px-2 py-1 rounded-sm ${item.priority === 'Tinggi' ? 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30' :
                                                    item.priority === 'Sedang' ? 'bg-[#CA8A04]/10 text-[#CA8A04] border-[#CA8A04]/30' :
                                                        'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                                                    }`}>
                                                    {item.priority}
                                                </span>
                                                <span className={`text-[10px] uppercase tracking-widest font-mono ml-2 w-24 text-right ${item.status.includes('Aman') ? 'text-[#10B981]' : 'text-[#888]'}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contamination Types */}
                                <div className="bento-box p-8">
                                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-6 block">Kontaminan Terdeteksi</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAlert.contaminationTypes.map((ct) => (
                                            <span key={ct} className="text-xs px-3 py-1.5 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-md text-[#DC2626] font-mono">
                                                {ct}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
