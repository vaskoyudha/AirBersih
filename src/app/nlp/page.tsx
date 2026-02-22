'use client';

import { useState } from 'react';
import {
    Upload, FileText, CheckCircle, Clock, AlertCircle,
    Eye, ChevronRight, Loader2, X, FileSearch,
} from 'lucide-react';

interface DocumentStatus {
    id: string;
    name: string;
    status: 'processing' | 'completed' | 'error';
    progress: number;
    extractions: number;
    confidence: number;
}

const DEMO_DOCUMENTS: DocumentStatus[] = [
    { id: '1', name: 'Laporan_Pamsimas_2024_Kab_Semarang.pdf', status: 'completed', progress: 100, extractions: 24, confidence: 0.87 },
    { id: '2', name: 'Monitoring_KPSPAM_Jateng_Q3.docx', status: 'completed', progress: 100, extractions: 18, confidence: 0.92 },
    { id: '3', name: 'Laporan_Infrastruktur_SPAM_Demak.pdf', status: 'processing', progress: 65, extractions: 0, confidence: 0 },
    { id: '4', name: 'Evaluasi_Program_STBM_2024.pdf', status: 'error', progress: 45, extractions: 0, confidence: 0 },
];

const DEMO_EXTRACTIONS = [
    { type: 'Desa', value: 'Desa Karangjati, Kec. Bergas, Kab. Semarang', confidence: 0.95, reviewed: true },
    { type: 'Sumber Air', value: 'Sumur Bor kedalaman 45m — kondisi: Baik', confidence: 0.91, reviewed: true },
    { type: 'Insiden', value: 'Kontaminasi coliform terdeteksi pada pengujian Jan 2024', confidence: 0.78, reviewed: false },
    { type: 'Infrastruktur', value: 'Perpipaan distribusi 2.3km — rusak ringan di titik sambungan RT 04', confidence: 0.84, reviewed: false },
    { type: 'Cakupan', value: '234 KK terlayani dari total 312 KK (75%)', confidence: 0.93, reviewed: true },
    { type: 'KPSPAM', value: 'Kelompok Pengelola aktif — iuran Rp 5.000/m³', confidence: 0.88, reviewed: false },
];

export default function NlpPage() {
    const [documents, setDocuments] = useState<DocumentStatus[]>(DEMO_DOCUMENTS);
    const [selectedDoc, setSelectedDoc] = useState<string | null>('1');
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        const newDocs = files.map((f, i) => ({
            id: `new-${Date.now()}-${i}`,
            name: f.name,
            status: 'processing' as const,
            progress: 0,
            extractions: 0,
            confidence: 0,
        }));
        setDocuments(prev => [...newDocs, ...prev]);
    };

    return (
        <div className="min-h-screen bg-grid">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        <span className="gradient-text">Pipeline NLP Pamsimas</span>
                    </h1>
                    <p className="text-slate-400">Ekstraksi otomatis informasi terstruktur dari laporan program air minum</p>
                </div>

                {/* Upload Area */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`glass-card p-8 text-center mb-8 transition-all cursor-pointer ${isDragging ? 'border-cyan-400/50 bg-cyan-500/5' : ''
                        }`}
                >
                    <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <p className="text-sm text-white mb-1">Seret & letakkan dokumen PDF atau Word</p>
                    <p className="text-xs text-slate-500 mb-4">Atau klik untuk memilih file — mendukung upload batch hingga 50 dokumen</p>
                    <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm text-cyan-300 hover:bg-cyan-500/15 transition-all cursor-pointer">
                        <FileSearch className="w-4 h-4" />
                        Pilih File
                        <input type="file" multiple accept=".pdf,.doc,.docx" className="hidden" />
                    </label>
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Document List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-sm font-semibold text-white mb-3">Dokumen ({documents.length})</h2>
                        <div className="space-y-2">
                            {documents.map((doc) => (
                                <button
                                    key={doc.id}
                                    onClick={() => setSelectedDoc(doc.id)}
                                    className={`w-full glass-card p-3 text-left hover:border-cyan-500/30 transition-all ${selectedDoc === doc.id ? 'border-cyan-500/40 bg-cyan-500/5' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 ${doc.status === 'completed' ? 'text-green-400' :
                                                doc.status === 'processing' ? 'text-cyan-400' : 'text-red-400'
                                            }`}>
                                            {doc.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                                                doc.status === 'processing' ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                                    <AlertCircle className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-white truncate">{doc.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                {doc.status === 'completed' && (
                                                    <>
                                                        <span className="text-[10px] text-green-400">{doc.extractions} ekstraksi</span>
                                                        <span className="text-[10px] text-slate-500">•</span>
                                                        <span className="text-[10px] text-slate-400">{(doc.confidence * 100).toFixed(0)}% confidence</span>
                                                    </>
                                                )}
                                                {doc.status === 'processing' && (
                                                    <div className="flex-1">
                                                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${doc.progress}%` }} />
                                                        </div>
                                                    </div>
                                                )}
                                                {doc.status === 'error' && (
                                                    <span className="text-[10px] text-red-400">Gagal memproses</span>
                                                )}
                                            </div>
                                        </div>
                                        <ChevronRight className="w-3 h-3 text-slate-600 mt-1" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Extraction Review */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-white">Hasil Ekstraksi</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                                    3 perlu review
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {DEMO_EXTRACTIONS.map((ext, i) => (
                                <div key={i} className={`glass-card p-4 ${!ext.reviewed ? 'border-yellow-500/20' : ''}`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-medium">
                                                    {ext.type}
                                                </span>
                                                <span className={`text-[10px] ${ext.confidence > 0.85 ? 'text-green-400' : 'text-yellow-400'}`}>
                                                    {(ext.confidence * 100).toFixed(0)}%
                                                </span>
                                                {!ext.reviewed && (
                                                    <span className="text-[10px] text-yellow-400">⚠ Review</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-300">{ext.value}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button className="p-1.5 rounded-lg hover:bg-green-500/10 text-green-400 transition-all" title="Setuju">
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-all" title="Tolak">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-sm text-green-300 hover:bg-green-500/15 transition-all">
                            <CheckCircle className="w-4 h-4" />
                            Konfirmasi Semua & Simpan ke Database
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
