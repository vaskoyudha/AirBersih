'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { WATER_SOURCE_TYPES } from '@/lib/constants/water-standards';
import {
    MapPin, Camera, Send, CheckCircle, Droplets,
    AlertTriangle, Smartphone, Locate,
} from 'lucide-react';

export default function LaporPage() {
    const { t } = useI18n();
    const [submitted, setSubmitted] = useState(false);
    const [locating, setLocating] = useState(false);
    const [form, setForm] = useState({
        latitude: '',
        longitude: '',
        sourceType: '',
        observationType: '' as 'visual' | 'illness' | '',
        visualIssues: [] as string[],
        illnessTypes: [] as string[],
        description: '',
        photo: null as File | null,
    });

    const detectLocation = () => {
        setLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setForm(prev => ({
                        ...prev,
                        latitude: pos.coords.latitude.toFixed(6),
                        longitude: pos.coords.longitude.toFixed(6),
                    }));
                    setLocating(false);
                },
                () => {
                    setLocating(false);
                    // Demo fallback - Semarang coordinates
                    setForm(prev => ({ ...prev, latitude: '-6.9667', longitude: '110.4203' }));
                }
            );
        }
    };

    const toggleVisualIssue = (issue: string) => {
        setForm(prev => ({
            ...prev,
            visualIssues: prev.visualIssues.includes(issue)
                ? prev.visualIssues.filter(i => i !== issue)
                : [...prev.visualIssues, issue],
        }));
    };

    const toggleIllness = (illness: string) => {
        setForm(prev => ({
            ...prev,
            illnessTypes: prev.illnessTypes.includes(illness)
                ? prev.illnessTypes.filter(i => i !== illness)
                : [...prev.illnessTypes, illness],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-black">
                <div className="bento-box p-12 text-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-stark">{t('report_form.submitted')}</h2>
                    <p className="text-sm text-[#888] mb-8 leading-relaxed">{t('report_form.thank_you')}</p>
                    <button
                        onClick={() => { setSubmitted(false); setForm({ latitude: '', longitude: '', sourceType: '', observationType: '', visualIssues: [], illnessTypes: [], description: '', photo: null }); }}
                        className="px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-[#EAEAEA] transition-colors uppercase tracking-widest"
                    >
                        Kirim Laporan Lain
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-lg mx-auto px-4 py-8 pt-24">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-14 h-14 rounded-md bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                        <Smartphone className="w-6 h-6 text-[#888]" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-3 tracking-stark">{t('report_form.title')}</h1>
                    <p className="text-sm text-[#888]">{t('report_form.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* === LOCATION === */}
                    <div className="bento-box p-6">
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#666]" />
                            {t('report_form.location')}
                        </label>
                        <button
                            type="button"
                            onClick={detectLocation}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-[#050505] border border-white/10 rounded-md text-sm text-[#CCC] hover:border-white/30 hover:text-white transition-colors"
                        >
                            <Locate className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
                            {locating ? 'Mendeteksi...' : t('report_form.auto_detect')}
                        </button>
                        {form.latitude && (
                            <div className="mt-3 flex gap-2">
                                <input value={form.latitude} readOnly className="flex-1 px-3 py-2 bg-[#050505] border border-white/10 rounded-md text-xs text-[#888] font-mono" />
                                <input value={form.longitude} readOnly className="flex-1 px-3 py-2 bg-[#050505] border border-white/10 rounded-md text-xs text-[#888] font-mono" />
                            </div>
                        )}
                    </div>

                    {/* === WATER SOURCE TYPE === */}
                    <div className="bento-box p-6">
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4 flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-[#666]" />
                            {t('report_form.source_type')}
                        </label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            {Object.values(WATER_SOURCE_TYPES).map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, sourceType: type.id }))}
                                    className={`px-4 py-3 rounded-md text-xs text-left transition-colors border ${form.sourceType === type.id
                                        ? 'bg-white text-black border-white font-semibold'
                                        : 'bg-[#050505] border-white/10 text-[#888] hover:border-white/30 hover:text-white'
                                        }`}
                                >
                                    {type.labelId}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* === OBSERVATION TYPE === */}
                    <div className="bento-box p-6">
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-[#666]" />
                            {t('report_form.observation')}
                        </label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setForm(prev => ({ ...prev, observationType: 'visual' }))}
                                className={`px-4 py-3 rounded-md text-sm transition-colors border ${form.observationType === 'visual'
                                    ? 'bg-white text-black border-white font-semibold'
                                    : 'bg-[#050505] border-white/10 text-[#888] hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                👁️ {t('report_form.visual')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setForm(prev => ({ ...prev, observationType: 'illness' }))}
                                className={`px-4 py-3 rounded-md text-sm transition-colors border ${form.observationType === 'illness'
                                    ? 'bg-white text-black border-white font-semibold'
                                    : 'bg-[#050505] border-white/10 text-[#888] hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                🤒 {t('report_form.illness')}
                            </button>
                        </div>

                        {/* Visual issues checkboxes */}
                        {form.observationType === 'visual' && (
                            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                                {['keruh', 'berbau', 'berasa', 'berwarna'].map((issue) => (
                                    <button
                                        key={issue}
                                        type="button"
                                        onClick={() => toggleVisualIssue(issue)}
                                        className={`px-3 py-2.5 rounded-md text-xs transition-colors border ${form.visualIssues.includes(issue)
                                            ? 'bg-white text-black border-white'
                                            : 'bg-transparent border-white/10 text-[#888] hover:text-white hover:border-white/30'
                                            }`}
                                    >
                                        {t(`report_form.${issue}`)}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Illness checkboxes */}
                        {form.observationType === 'illness' && (
                            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
                                {['diare', 'mual', 'muntah'].map((illness) => (
                                    <button
                                        key={illness}
                                        type="button"
                                        onClick={() => toggleIllness(illness)}
                                        className={`px-3 py-2.5 rounded-md text-xs transition-colors border ${form.illnessTypes.includes(illness)
                                            ? 'bg-white text-black border-white'
                                            : 'bg-transparent border-white/10 text-[#888] hover:text-white hover:border-white/30'
                                            }`}
                                    >
                                        {t(`report_form.${illness}`)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* === PHOTO === */}
                    <div className="bento-box p-6">
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4 flex items-center gap-2">
                            <Camera className="w-4 h-4 text-[#666]" />
                            {t('report_form.photo')}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => setForm(prev => ({ ...prev, photo: e.target.files?.[0] || null }))}
                            className="mt-2 w-full text-xs text-[#888] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-[#EAEAEA] cursor-pointer"
                        />
                    </div>

                    {/* === DESCRIPTION === */}
                    <div className="bento-box p-6">
                        <label className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-3 block">{t('report_form.description')}</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder={t('report_form.description_placeholder')}
                            rows={3}
                            className="mt-2 w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-md text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-white/30 resize-none transition-colors"
                        />
                    </div>

                    {/* === SUBMIT === */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 mt-8 text-sm font-semibold uppercase tracking-widest text-black rounded-md bg-white hover:bg-[#EAEAEA] transition-colors"
                    >
                        <Send className="w-4 h-4" />
                        {t('report_form.submit')}
                    </button>
                </form>
            </div>
        </div>
    );
}
