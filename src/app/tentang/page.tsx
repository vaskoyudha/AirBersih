'use client';

import {
    Droplets, Shield, Globe2, BookOpen, FileText,
    Github, Mail, ExternalLink,
} from 'lucide-react';

export default function TentangPage() {
    return (
        <div className="min-h-screen bg-grid">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                        <Droplets className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-3">AirBersih</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Platform Intelijen Risiko Kualitas Air Minum Indonesia — menjawab pertanyaan yang layak dijawab untuk 270 juta rakyat Indonesia.
                    </p>
                </div>

                {/* Mission */}
                <div className="glass-card p-8 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-cyan-400" />
                        Mengapa AirBersih?
                    </h2>
                    <div className="text-sm text-slate-400 space-y-3 leading-relaxed">
                        <p>
                            Indonesia memiliki tantangan besar dalam akses air minum aman. Hanya <strong className="text-white">11,9%</strong> populasi
                            memiliki akses air minum terkelola dengan aman, sementara <strong className="text-white">70%</strong> rumah tangga mengkonsumsi
                            air terkontaminasi E. coli.
                        </p>
                        <p>
                            Data kualitas air Indonesia sangat terfragmentasi — Kemenkes memantau sebagian parameter, Pamsimas melacak infrastruktur
                            di desa program, PDAM melayani perkotaan, dan puluhan ribu desa tidak memiliki pemantauan sama sekali.
                        </p>
                        <p>
                            AirBersih membangun platform terpadu yang menyatukan semua sumber ini menjadi satu peta risiko yang koheren untuk
                            <strong className="text-white"> 83.762 desa/kelurahan</strong> di seluruh Indonesia.
                        </p>
                    </div>
                </div>

                {/* Methodology */}
                <div className="glass-card p-8 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-cyan-400" />
                        Metodologi
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                title: 'Standar Kualitas Air',
                                desc: 'Mengacu pada Permenkes 492/2010 dan Permenkes No. 2/2023 untuk standar baku mutu air minum Indonesia, mencakup parameter mikrobiologis, kimia, dan fisik.',
                            },
                            {
                                title: 'Model Prediksi ML',
                                desc: 'XGBoost ensemble dengan fitur spasial (geografi, kedekatan industri/pertanian, cakupan sanitasi) untuk memprediksi risiko di desa tanpa data monitoring. SHAP values untuk explainability.',
                            },
                            {
                                title: 'Analisis Spasial',
                                desc: "Moran's I dan LISA (Local Indicators of Spatial Association) via PySAL untuk mengidentifikasi kluster kontaminasi dan autokorelasi spasial.",
                            },
                            {
                                title: 'WHO Water Safety Plan (RPAM)',
                                desc: 'Framework penilaian risiko mengikuti standar internasional WHO Water Safety Plan yang telah diadopsi Indonesia sebagai Rencana Pengamanan Air Minum.',
                            },
                            {
                                title: 'NLP Pipeline',
                                desc: 'Ekstraksi informasi otomatis dari laporan Pamsimas menggunakan Gemini API, dengan human-in-the-loop review untuk memastikan akurasi.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-white">{item.title}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Sources */}
                <div className="glass-card p-8 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                        Sumber Data & Referensi
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[
                            { name: 'Permenkes 492/2010', desc: 'Standar baku mutu air minum' },
                            { name: 'BPS Susenas WASH Module', desc: 'Data akses air & sanitasi tingkat kabupaten' },
                            { name: 'Pamsimas / SIMAS', desc: 'Data program air minum komunal' },
                            { name: 'WHO/UNICEF JMP', desc: 'Joint Monitoring Programme for Water Supply' },
                            { name: 'BNPB', desc: 'Data bencana & peringatan banjir' },
                            { name: 'BPS Geoportal', desc: 'Batas administrasi desa (83.762 desa)' },
                            { name: 'WHO Water Safety Plan', desc: 'Framework RPAM internasional' },
                            { name: 'RPJMN 2020-2024', desc: 'Target 100% akses air minum layak' },
                        ].map((source) => (
                            <div key={source.name} className="flex items-start gap-2 px-3 py-2 bg-slate-800/30 rounded-lg">
                                <FileText className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-medium text-white">{source.name}</p>
                                    <p className="text-[10px] text-slate-500">{source.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="glass-card p-8">
                    <h2 className="text-xl font-bold text-white mb-4">Teknologi</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'Next.js 15', 'TypeScript', 'MapLibre GL', 'PostGIS', 'Supabase',
                            'Tailwind CSS', 'Python', 'XGBoost', 'PySAL', 'Gemini API',
                            'PMTiles', 'Puppeteer', 'BullMQ', 'Chart.js',
                        ].map((tech) => (
                            <span key={tech} className="px-3 py-1.5 text-xs bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
