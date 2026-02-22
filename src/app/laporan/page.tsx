'use client';

import { RISK_CLASSIFICATIONS, SAFETY_GRADES, WATER_SOURCE_TYPES } from '@/lib/constants/water-standards';
import {
    Download, Shield, Droplets, AlertTriangle,
    TrendingUp, MapPin, FileText, BarChart3,
    ChevronRight, CheckCircle, XCircle,
} from 'lucide-react';

// Demo data for a village report card
const DEMO_DESA = {
    name: 'Desa Karangjati',
    kecamatan: 'Bergas',
    kabupaten: 'Semarang',
    provinsi: 'Jawa Tengah',
    bpsCode: '33.22.06.2003',
    population: 4523,
    households: 1234,
    grade: 'C' as const,
    riskScore: 52,
    riskClassification: 'risiko_sedang',
    isMeasured: true,
    lastUpdated: '2025-02-15',
};

const DEMO_SOURCES = [
    { name: 'Sumur Gali RW 03', type: 'sumur_gali', status: 'risiko_tinggi', risk: 72, householdsServed: 45, lastTested: '2025-01-15' },
    { name: 'Mata Air Sendang', type: 'mata_air', status: 'risiko_rendah', risk: 25, householdsServed: 180, lastTested: '2025-02-01' },
    { name: 'Pamsimas SAB 01', type: 'pamsimas', status: 'aman', risk: 12, householdsServed: 320, lastTested: '2025-02-10' },
    { name: 'Sumur Bor RT 07', type: 'sumur_bor', status: 'risiko_sedang', risk: 48, householdsServed: 85, lastTested: '2024-12-20' },
    { name: 'PAH Kelompok B', type: 'pah', status: 'risiko_rendah', risk: 30, householdsServed: 28, lastTested: '2024-11-15' },
];

const DEMO_INCIDENTS = [
    { date: '2025-01-15', description: 'Kontaminasi coliform pada Sumur Gali RW 03 — kadar 12 per 100ml (batas: 0)', severity: 'Tinggi' },
    { date: '2024-09-20', description: 'Kekeruhan melebihi batas pada Mata Air Sendang pasca-hujan lebat — 8 NTU (batas: 5)', severity: 'Sedang' },
    { date: '2024-06-10', description: 'Laporan masyarakat air berbau di RT 07 — dikonfirmasi kandungan besi tinggi 0.5 mg/l (batas: 0.3)', severity: 'Rendah' },
];

const DEMO_RECOMMENDATIONS = [
    { priority: 1, action: 'Lakukan desinfeksi dan perbaikan sanitasi di sekitar Sumur Gali RW 03 — sumber utama risiko mikrobiologis', impact: 'Tinggi' },
    { priority: 2, action: 'Perpanjang jaringan instalasi Pamsimas ke RT 07 dan RT 08 yang saat ini mengandalkan sumur tidak terlindungi', impact: 'Tinggi' },
    { priority: 3, action: 'Pasang filter besi (iron removal) pada Sumur Bor RT 07', impact: 'Sedang' },
    { priority: 4, action: 'Tingkatkan frekuensi pengujian dari tahunan menjadi kuartalan untuk semua sumber air', impact: 'Rendah' },
];

function getRiskColor(score: number) {
    if (score < 20) return RISK_CLASSIFICATIONS.aman.color;
    if (score < 40) return RISK_CLASSIFICATIONS.risiko_rendah.color;
    if (score < 60) return RISK_CLASSIFICATIONS.risiko_sedang.color;
    if (score < 80) return RISK_CLASSIFICATIONS.risiko_tinggi.color;
    return RISK_CLASSIFICATIONS.berbahaya.color;
}

export default function LaporanPage() {
    const grade = SAFETY_GRADES[DEMO_DESA.grade];
    const riskClass = RISK_CLASSIFICATIONS[DEMO_DESA.riskClassification as keyof typeof RISK_CLASSIFICATIONS];

    const kecamatanAvg = 48;
    const kabupatenAvg = 45;

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                {/* === HEADER === */}
                <div className="flex items-start justify-between mb-10 pb-6 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-[#888]" />
                            <h1 className="text-3xl font-bold text-white tracking-stark">Kartu Laporan Keamanan Air</h1>
                        </div>
                        <p className="text-sm text-[#888]">Dihasilkan otomatis dari model prediksi & data lapangan • {DEMO_DESA.lastUpdated}</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded-md hover:bg-[#EAEAEA] transition-colors">
                        <Download className="w-4 h-4" />
                        Unduh Laporan
                    </button>
                </div>

                {/* === VILLAGE IDENTITY === */}
                <div className="bento-box p-8 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-semibold text-white tracking-stark bg-transparent">{DEMO_DESA.name}</h2>
                            <p className="text-sm text-[#888] mt-1">
                                Kec. {DEMO_DESA.kecamatan}, Kab. {DEMO_DESA.kabupaten}, {DEMO_DESA.provinsi}
                            </p>
                            <p className="text-[11px] uppercase tracking-widest text-[#666] mt-4 font-mono">Kode BPS: {DEMO_DESA.bpsCode} • Pop: {DEMO_DESA.population.toLocaleString()} • KK: {DEMO_DESA.households.toLocaleString()}</p>
                        </div>

                        {/* Grade */}
                        <div className="text-center">
                            <div
                                className="w-20 h-20 rounded-md flex items-center justify-center text-4xl font-bold border"
                                style={{ backgroundColor: grade.color + '1A', color: grade.color, borderColor: grade.color + '40' }}
                            >
                                {grade.grade}
                            </div>
                            <p className="text-[10px] uppercase tracking-widest mt-3 font-semibold" style={{ color: grade.color }}>{grade.labelId}</p>
                        </div>
                    </div>
                </div>

                {/* === RISK CLASSIFICATION === */}
                <div className="bento-box p-8 mb-6">
                    <h3 className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#666]" />
                        Klasifikasi Risiko
                    </h3>

                    <div className="flex items-center gap-6 mb-8">
                        <div>
                            <div className="w-16 h-16 rounded-md flex items-center justify-center text-2xl font-bold border" style={{ backgroundColor: riskClass.color + '1A', color: riskClass.color, borderColor: riskClass.color + '40' }}>
                                {DEMO_DESA.riskScore}
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-bold tracking-stark" style={{ color: riskClass.color }}>{riskClass.labelId}</p>
                            <p className="text-xs text-[#888] flex items-center gap-2 mt-1 font-mono">
                                <span className={`w-1.5 h-1.5 rounded-none ${DEMO_DESA.isMeasured ? 'bg-[#10B981]' : 'bg-[#CA8A04]'}`} />
                                {DEMO_DESA.isMeasured ? 'Verified Field Data' : 'ML Prediction'}
                            </p>
                        </div>
                    </div>

                    {/* Risk factors breakdown */}
                    <div className="space-y-3">
                        {[
                            { label: 'Microbial', value: 65, color: '#DC2626' },
                            { label: 'Nitrates', value: 35, color: '#EA580C' },
                            { label: 'Heavy Metals', value: 20, color: '#CA8A04' },
                            { label: 'Chemical', value: 10, color: '#8b5cf6' },
                        ].map((factor) => (
                            <div key={factor.label} className="flex items-center gap-4">
                                <span className="text-[11px] uppercase tracking-widest text-[#666] w-32">{factor.label}</span>
                                <div className="flex-1 h-1 bg-[#222] rounded-none overflow-hidden">
                                    <div className="h-full rounded-none" style={{ width: `${factor.value}%`, backgroundColor: factor.color }} />
                                </div>
                                <span className="text-xs font-mono w-10 text-right" style={{ color: factor.color }}>{factor.value}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Comparison */}
                    <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                        <div className="text-center border-r border-white/5">
                            <p className="text-2xl font-bold tracking-stark" style={{ color: getRiskColor(DEMO_DESA.riskScore) }}>{DEMO_DESA.riskScore}</p>
                            <p className="text-[10px] uppercase tracking-widest text-[#666] mt-1">Village</p>
                        </div>
                        <div className="text-center border-r border-white/5">
                            <p className="text-2xl font-bold tracking-stark" style={{ color: getRiskColor(kecamatanAvg) }}>{kecamatanAvg}</p>
                            <p className="text-[10px] uppercase tracking-widest text-[#666] mt-1">District Avg</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold tracking-stark" style={{ color: getRiskColor(kabupatenAvg) }}>{kabupatenAvg}</p>
                            <p className="text-[10px] uppercase tracking-widest text-[#666] mt-1">Regency Avg</p>
                        </div>
                    </div>
                </div>

                {/* === WATER SOURCE INVENTORY === */}
                <div className="bento-box p-8 mb-6">
                    <h3 className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-[#666]" />
                        Inventaris Sumber Air ({DEMO_SOURCES.length} sumber)
                    </h3>
                    <div className="space-y-2">
                        {DEMO_SOURCES.map((source, i) => (
                            <div key={i} className="flex items-center gap-4 px-4 py-3 bg-[#050505] border border-white/5 rounded-md hover:bg-white/5 transition-colors">
                                <div className="w-1 h-8 rounded-none" style={{ backgroundColor: getRiskColor(source.risk) }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold tracking-stark text-white">{source.name}</p>
                                    <p className="text-[11px] uppercase tracking-widest text-[#666] mt-1 font-mono">
                                        {WATER_SOURCE_TYPES[source.type as keyof typeof WATER_SOURCE_TYPES]?.labelId || source.type} • {source.householdsServed} KK • Last tested: {source.lastTested}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-mono font-bold tracking-stark" style={{ color: getRiskColor(source.risk) }}>{source.risk}</p>
                                    <p className="text-[10px] uppercase tracking-widest" style={{ color: getRiskColor(source.risk) }}>
                                        {RISK_CLASSIFICATIONS[source.status as keyof typeof RISK_CLASSIFICATIONS]?.labelId || source.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === CONTAMINATION INCIDENTS === */}
                <div className="bento-box p-8 mb-6">
                    <h3 className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#666]" />
                        Insiden Kontaminasi
                    </h3>
                    <div className="space-y-4">
                        {DEMO_INCIDENTS.map((inc, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`w-2 h-2 rounded-none mt-1.5 ${inc.severity === 'Tinggi' ? 'bg-[#DC2626]' : inc.severity === 'Sedang' ? 'bg-[#CA8A04]' : 'bg-[#10B981]'
                                        }`} />
                                    {i < DEMO_INCIDENTS.length - 1 && <div className="w-px flex-1 bg-white/5 mt-2" />}
                                </div>
                                <div className="pb-4">
                                    <p className="text-[11px] uppercase tracking-widest text-[#666] font-mono mb-1">{inc.date}</p>
                                    <p className="text-sm text-[#CCC] leading-relaxed">{inc.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === RECOMMENDATIONS === */}
                <div className="bento-box p-8 mb-6">
                    <h3 className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-6 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#666]" />
                        Rekomendasi Tindakan
                    </h3>
                    <div className="space-y-3">
                        {DEMO_RECOMMENDATIONS.map((rec) => (
                            <div key={rec.priority} className="flex gap-4 px-4 py-4 bg-[#050505] border border-white/5 rounded-md">
                                <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[10px] font-mono text-[#AAA]">{rec.priority}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-[#CCC] leading-relaxed">{rec.action}</p>
                                    <span className={`inline-block text-[10px] uppercase tracking-widest mt-3 px-2 py-1 rounded-sm border ${rec.impact === 'Tinggi' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30' :
                                        rec.impact === 'Sedang' ? 'bg-[#CA8A04]/10 text-[#CA8A04] border-[#CA8A04]/30' :
                                            'bg-[#blue-500]/10 text-[#888] border-white/10'
                                        }`}>
                                        Impact: {rec.impact}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === METHODOLOGY === */}
                <div className="bento-box p-8 mb-20 bg-[#050505]">
                    <h3 className="text-[10px] font-semibold text-[#666] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BarChart3 className="w-3 h-3 text-[#666]" />
                        Data Model & Architecture
                    </h3>
                    <div className="text-[11px] text-[#888] space-y-2 font-mono">
                        <p>• Data Input: Ministry of Health, Pamsimas API</p>
                        <p>• Pipeline : XGBoost ensemble, 95% conf</p>
                        <p>• Spatial  : Moran&apos;s I & LISA via PySAL</p>
                        <p>• Standard : Permenkes 492/2010 & WHO RPAM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
