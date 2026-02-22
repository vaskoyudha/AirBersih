'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { RISK_CLASSIFICATIONS } from '@/lib/constants/water-standards';
import { useI18n } from '@/lib/i18n';
import {
    Layers, Search, Eye, EyeOff,
    ChevronRight, X, Droplets, AlertTriangle,
    TrendingUp, MapPin, Info,
} from 'lucide-react';

// Demo water source data for Indonesia
const DEMO_WATER_SOURCES = [
    { id: '1', name: 'Sumur Gali RW 03', lng: 110.4203, lat: -6.9667, type: 'sumur_gali', risk: 72, status: 'risiko_tinggi', isMeasured: true, lastTested: '2025-01-15' },
    { id: '2', name: 'Mata Air Sendang', lng: 110.3890, lat: -6.9823, type: 'mata_air', risk: 25, status: 'risiko_rendah', isMeasured: true, lastTested: '2025-02-01' },
    { id: '3', name: 'PDAM Tirta Moedal', lng: 110.4415, lat: -6.9550, type: 'pdam', risk: 12, status: 'aman', isMeasured: true, lastTested: '2025-02-10' },
    { id: '4', name: 'Sumur Bor Desa Mijen', lng: 110.3200, lat: -7.0500, type: 'sumur_bor', risk: 55, status: 'risiko_sedang', isMeasured: false, lastTested: '2024-11-20' },
    { id: '5', name: 'Pamsimas Kelurahan Tembalang', lng: 110.4400, lat: -7.0600, type: 'pamsimas', risk: 18, status: 'aman', isMeasured: true, lastTested: '2025-01-28' },
    { id: '6', name: 'Sumur Gali RW 07 Banyumanik', lng: 110.4100, lat: -7.0400, type: 'sumur_gali', risk: 85, status: 'berbahaya', isMeasured: true, lastTested: '2025-02-05' },
    { id: '7', name: 'Penampungan Air Hujan', lng: 110.5000, lat: -6.9800, type: 'pah', risk: 45, status: 'risiko_sedang', isMeasured: false, lastTested: '2024-12-15' },
    { id: '8', name: 'Sumur Bor Pedurungan', lng: 110.4700, lat: -6.9900, type: 'sumur_bor', risk: 35, status: 'risiko_rendah', isMeasured: true, lastTested: '2025-01-20' },
    // Additional points across Indonesia
    { id: '9', name: 'Sumur Gali Yogyakarta', lng: 110.3695, lat: -7.7956, type: 'sumur_gali', risk: 42, status: 'risiko_sedang', isMeasured: true, lastTested: '2025-01-10' },
    { id: '10', name: 'PDAM Surabaya', lng: 112.7508, lat: -7.2575, type: 'pdam', risk: 15, status: 'aman', isMeasured: true, lastTested: '2025-02-12' },
    { id: '11', name: 'Mata Air Batu Malang', lng: 112.5233, lat: -7.8826, type: 'mata_air', risk: 8, status: 'aman', isMeasured: true, lastTested: '2025-02-08' },
    { id: '12', name: 'Sumur Bor Bandung', lng: 107.6191, lat: -6.9175, type: 'sumur_bor', risk: 62, status: 'risiko_tinggi', isMeasured: false, lastTested: '2024-10-25' },
    { id: '13', name: 'Pamsimas Bogor', lng: 106.8060, lat: -6.5971, type: 'pamsimas', risk: 28, status: 'risiko_rendah', isMeasured: true, lastTested: '2025-01-30' },
    { id: '14', name: 'Sumur Gali Balikpapan', lng: 116.8286, lat: -1.2654, type: 'sumur_gali', risk: 78, status: 'risiko_tinggi', isMeasured: false, lastTested: '2024-09-12' },
    { id: '15', name: 'PDAM Makassar', lng: 119.4320, lat: -5.1477, type: 'pdam', risk: 22, status: 'risiko_rendah', isMeasured: true, lastTested: '2025-02-01' },
    { id: '16', name: 'Sumur Bor Manado', lng: 124.8421, lat: 1.4748, type: 'sumur_bor', risk: 55, status: 'risiko_sedang', isMeasured: true, lastTested: '2025-01-05' },
    { id: '17', name: 'Mata Air Denpasar', lng: 115.2191, lat: -8.6705, type: 'mata_air', risk: 18, status: 'aman', isMeasured: true, lastTested: '2025-02-14' },
    { id: '18', name: 'Sumur Gali Jayapura', lng: 140.7186, lat: -2.5916, type: 'sumur_gali', risk: 88, status: 'berbahaya', isMeasured: false, lastTested: '2024-07-20' },
    { id: '19', name: 'Pamsimas Medan', lng: 98.6722, lat: 3.5952, type: 'pamsimas', risk: 32, status: 'risiko_rendah', isMeasured: true, lastTested: '2025-01-22' },
    { id: '20', name: 'PDAM Palembang', lng: 104.7458, lat: -2.9761, type: 'pdam', risk: 40, status: 'risiko_sedang', isMeasured: true, lastTested: '2025-02-03' },
];

function getRiskColor(risk: number): string {
    if (risk < 20) return RISK_CLASSIFICATIONS.aman.color;
    if (risk < 40) return RISK_CLASSIFICATIONS.risiko_rendah.color;
    if (risk < 60) return RISK_CLASSIFICATIONS.risiko_sedang.color;
    if (risk < 80) return RISK_CLASSIFICATIONS.risiko_tinggi.color;
    return RISK_CLASSIFICATIONS.berbahaya.color;
}

function getSourceIcon(type: string): string {
    switch (type) {
        case 'sumur_gali': return '⬡';
        case 'sumur_bor': return '◉';
        case 'mata_air': return '💧';
        case 'pdam': return '🔵';
        case 'pamsimas': return '🟢';
        case 'pah': return '☔';
        default: return '📍';
    }
}

interface SelectedSource {
    id: string;
    name: string;
    type: string;
    risk: number;
    status: string;
    isMeasured: boolean;
    lastTested: string;
}

export default function MapPage() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const { t } = useI18n();

    const [selectedSource, setSelectedSource] = useState<SelectedSource | null>(null);
    const [showLayers, setShowLayers] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mapLoaded, setMapLoaded] = useState(false);
    const [layers, setLayers] = useState({
        risk: true,
        flood: false,
        pdam: false,
        agricultural: false,
        industrial: false,
        odf: false,
    });

    const toggleLayer = useCallback((layerKey: string) => {
        setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey as keyof typeof prev] }));
    }, []);

    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        let timeoutId: ReturnType<typeof setTimeout>;
        let handleResize: () => void;

        // Small timeout ensures the DOM has fully painted and the container
        // has a real non-zero bounding rect before MapLibre reads it.
        timeoutId = setTimeout(() => {
            if (!mapContainer.current || mapRef.current) return;

            const map = new maplibregl.Map({
                container: mapContainer.current,
                style: {
                    version: 8,
                    name: 'AirBersih Dark',
                    sources: {
                        'carto-dark': {
                            type: 'raster',
                            tiles: [
                                'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                                'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                                'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                            ],
                            tileSize: 512,
                            attribution: '© <a href="https://carto.com/">CARTO</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                            maxzoom: 19,
                        },
                    },
                    layers: [
                        {
                            id: 'carto-dark-layer',
                            type: 'raster',
                            source: 'carto-dark',
                            paint: {
                                'raster-opacity': 1,
                            },
                        },
                    ],
                },
                center: [118, -2],
                zoom: 5,
                minZoom: 3,
                maxZoom: 18,
            });

            map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
            map.addControl(new maplibregl.ScaleControl(), 'bottom-left');

            map.on('load', () => {
                const geojson: GeoJSON.FeatureCollection = {
                    type: 'FeatureCollection',
                    features: DEMO_WATER_SOURCES.map((src) => ({
                        type: 'Feature' as const,
                        properties: {
                            id: src.id,
                            name: src.name,
                            type: src.type,
                            risk: src.risk,
                            status: src.status,
                            isMeasured: src.isMeasured,
                            lastTested: src.lastTested,
                            color: getRiskColor(src.risk),
                        },
                        geometry: {
                            type: 'Point' as const,
                            coordinates: [src.lng, src.lat],
                        },
                    })),
                };

                map.addSource('water-sources', { type: 'geojson', data: geojson });

                map.addLayer({
                    id: 'water-sources-glow',
                    type: 'circle',
                    source: 'water-sources',
                    paint: {
                        'circle-radius': 14,
                        'circle-color': ['get', 'color'],
                        'circle-opacity': 0.15,
                        'circle-blur': 1,
                    },
                });

                map.addLayer({
                    id: 'water-sources-circle',
                    type: 'circle',
                    source: 'water-sources',
                    paint: {
                        'circle-radius': [
                            'interpolate', ['linear'], ['zoom'],
                            4, 4,
                            8, 6,
                            12, 10,
                        ],
                        'circle-color': ['get', 'color'],
                        'circle-opacity': 0.85,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': [
                            'case',
                            ['get', 'isMeasured'],
                            '#ffffff',
                            '#888888',
                        ],
                        'circle-stroke-opacity': 0.6,
                    },
                });

                map.on('click', 'water-sources-circle', (e) => {
                    if (!e.features?.[0]) return;
                    const props = e.features[0].properties!;
                    setSelectedSource({
                        id: props.id,
                        name: props.name,
                        type: props.type,
                        risk: props.risk,
                        status: props.status,
                        isMeasured: typeof props.isMeasured === 'string' ? props.isMeasured === 'true' : props.isMeasured,
                        lastTested: props.lastTested,
                    });
                });

                map.on('mouseenter', 'water-sources-circle', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });
                map.on('mouseleave', 'water-sources-circle', () => {
                    map.getCanvas().style.cursor = '';
                });

                setTimeout(() => map.resize(), 50); // force recalculate dimensions after load
                setMapLoaded(true);
            });

            // Also resize on mount after a tick to ensure container dimensions are read
            setTimeout(() => map.resize(), 200);

            handleResize = () => map.resize();
            window.addEventListener('resize', handleResize);
            mapRef.current = map;
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (handleResize) window.removeEventListener('resize', handleResize);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const riskLevels = Object.values(RISK_CLASSIFICATIONS);

    const layerOptions = [
        { key: 'risk', label: 'Peta Risiko', icon: Layers, enabled: layers.risk },
        { key: 'flood', label: 'Daerah Rawan Banjir', icon: AlertTriangle, enabled: layers.flood },
        { key: 'pdam', label: 'Jaringan PDAM', icon: Droplets, enabled: layers.pdam },
        { key: 'agricultural', label: 'Lahan Pertanian', icon: MapPin, enabled: layers.agricultural },
        { key: 'industrial', label: 'Zona Industri', icon: MapPin, enabled: layers.industrial },
        { key: 'odf', label: 'Status ODF', icon: Info, enabled: layers.odf },
    ];

    return (
        <>
            {/* Map fills the full viewport, sits behind navbar via z-index */}
            <div
                ref={mapContainer}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                }}
            />

            {/* === TOP CONTROLS === */}
            <div className="fixed top-[72px] left-4 right-4 z-10 flex gap-3 pointer-events-none">
                {/* Search */}
                <div className="pointer-events-auto flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('map.search_placeholder')}
                            className="w-full pl-10 pr-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-md text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-colors shadow-lg"
                        />
                    </div>
                </div>

                {/* Layer Toggle */}
                <button
                    onClick={() => setShowLayers(!showLayers)}
                    className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-md text-sm text-[#888] hover:text-white hover:border-white/20 transition-all shadow-lg"
                >
                    <Layers className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('map.layers')}</span>
                </button>
            </div>

            {/* === LAYER PANEL === */}
            {showLayers && (
                <div className="fixed top-[120px] right-4 z-20 w-64 bg-[#0A0A0A] border border-white/10 rounded-lg p-4 shadow-2xl animate-fade-in-up animate-fade-in-up-1">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                        <h3 className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Map Layers</h3>
                        <button onClick={() => setShowLayers(false)} className="text-[#666] hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-1">
                        {layerOptions.map((layer) => (
                            <button
                                key={layer.key}
                                onClick={() => toggleLayer(layer.key)}
                                className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-white/5 transition-all text-left group"
                            >
                                {layer.enabled ? (
                                    <Eye className="w-4 h-4 text-white" />
                                ) : (
                                    <EyeOff className="w-4 h-4 text-[#444] group-hover:text-[#666]" />
                                )}
                                <span className={`text-sm ${layer.enabled ? 'text-white font-medium' : 'text-[#888]'}`}>
                                    {layer.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* === LEGEND === */}
            <div className="fixed bottom-8 left-4 z-10 bg-[#0A0A0A] border border-white/10 rounded-lg p-4 shadow-2xl space-y-4">
                <div>
                    <p className="text-[10px] text-[#666] uppercase tracking-widest font-semibold mb-3">Risk Classification</p>
                    <div className="space-y-2">
                        {riskLevels.map((risk) => (
                            <div key={risk.id} className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: risk.color }} />
                                <span className="text-xs text-[#AAA]">{risk.labelId}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full border border-[#AAA]" />
                        <span className="text-xs text-[#AAA]">Measured Data</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full border border-[#555] border-dashed" />
                        <span className="text-xs text-[#777]">ML Prediction</span>
                    </div>
                </div>
            </div>

            {/* === SOURCE DETAIL PANEL === */}
            {selectedSource && (
                <div className="fixed top-[120px] right-4 z-30 w-80 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 bg-[#050505]">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-white tracking-stark">{selectedSource.name}</h3>
                                <p className="text-[10px] uppercase tracking-widest text-[#666] mt-1">
                                    {selectedSource.type.replace(/_/g, ' ')}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedSource(null)}
                                className="text-[#666] hover:text-white transition-colors p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Risk Score */}
                    <div className="p-5">
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-14 h-14 rounded-md flex items-center justify-center text-white font-bold text-xl border"
                                style={{ backgroundColor: getRiskColor(selectedSource.risk) + '1A', borderColor: getRiskColor(selectedSource.risk) + '40' }}
                            >
                                {selectedSource.risk}
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-stark" style={{ color: getRiskColor(selectedSource.risk) }}>
                                    {RISK_CLASSIFICATIONS[selectedSource.status as keyof typeof RISK_CLASSIFICATIONS]?.labelId || selectedSource.status}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${selectedSource.isMeasured ? 'bg-[#10B981]' : 'bg-[#CA8A04]'}`} />
                                    <span className="text-xs text-[#888]">
                                        {selectedSource.isMeasured ? 'Verified Reading' : 'Predicted Estimate'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-[11px] uppercase tracking-widest text-[#666]">Last Tested</span>
                                <span className="text-xs text-[#BBB] font-medium">{selectedSource.lastTested}</span>
                            </div>

                            {/* Simulated risk factors */}
                            <div className="pt-1">
                                <p className="text-[10px] uppercase tracking-widest text-[#666] mb-3">Risk Vectors</p>
                                {[
                                    { label: 'Microbial', pct: Math.round(selectedSource.risk * 0.4), color: '#DC2626' },
                                    { label: 'Nitrates', pct: Math.round(selectedSource.risk * 0.25), color: '#EA580C' },
                                    { label: 'Heavy Metals', pct: Math.round(selectedSource.risk * 0.2), color: '#CA8A04' },
                                    { label: 'Chemical', pct: Math.round(selectedSource.risk * 0.15), color: '#8b5cf6' },
                                ].map((factor) => (
                                    <div key={factor.label} className="flex items-center gap-3 mb-2.5">
                                        <span className="text-xs text-[#AAA] w-24">{factor.label}</span>
                                        <div className="flex-1 h-1 bg-[#222] rounded-none overflow-hidden">
                                            <div
                                                className="h-full rounded-none transition-all duration-500"
                                                style={{ width: `${factor.pct}%`, backgroundColor: factor.color }}
                                            />
                                        </div>
                                        <span className="text-xs text-[#888] w-8 text-right font-mono">{factor.pct}%</span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="pt-4 flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors">
                                    <TrendingUp className="w-3.5 h-3.5 text-[#888]" />
                                    Trends
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-black bg-white rounded-md hover:bg-[#EAEAEA] transition-colors">
                                    Report
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* === LOADING OVERLAY === */}
            {!mapLoaded && (
                <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin mb-4" />
                        <p className="text-xs uppercase tracking-widest text-[#666]">Initializing GIS Core...</p>
                    </div>
                </div>
            )}
        </>
    );
}
