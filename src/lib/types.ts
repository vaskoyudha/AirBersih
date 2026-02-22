/**
 * Core TypeScript types for AirBersih platform
 */

export interface AdminBoundary {
    id: string;
    bpsCode: string;
    name: string;
    level: 1 | 2 | 3 | 4; // province, kabupaten, kecamatan, desa
    parentCode: string | null;
    population?: number;
    areaKm2?: number;
}

export interface WaterSource {
    id: string;
    desaCode: string;
    name: string;
    sourceType: keyof typeof import('./constants/water-standards').WATER_SOURCE_TYPES;
    latitude: number;
    longitude: number;
    status: 'baik' | 'rusak_ringan' | 'rusak_berat' | 'tidak_berfungsi';
    householdsServed?: number;
    lastTestedAt?: string;
    safetyStatus: 'aman' | 'risiko_rendah' | 'risiko_sedang' | 'risiko_tinggi' | 'berbahaya';
    dataSource: string;
}

export interface WaterQualityMeasurement {
    id: string;
    waterSourceId: string;
    desaCode: string;
    measuredAt: string;
    parameterName: string;
    value: number;
    unit: string;
    exceedsLimit: boolean;
    exceedanceRatio: number;
    dataSource: string;
    confidenceLevel: number;
}

export interface RiskPrediction {
    id: string;
    desaCode: string;
    predictedAt: string;
    modelVersion: string;
    overallRiskScore: number;
    riskClassification: string;
    microbiologicalRisk: number;
    nitrateRisk: number;
    heavyMetalRisk: number;
    arsenicFluorideRisk: number;
    confidenceIntervalLower: number;
    confidenceIntervalUpper: number;
    riskFactors: Record<string, number>;
    isMeasured: boolean;
    spatialAutocorrelation?: {
        clusterType: 'HH' | 'LL' | 'HL' | 'LH' | 'NS';
        pValue: number;
    };
}

export interface CrowdReport {
    id: string;
    reporterId?: string;
    latitude: number;
    longitude: number;
    desaCode: string;
    waterSourceType: string;
    observationType: 'visual' | 'illness';
    visualIssues: string[];
    illnessTypes: string[];
    description: string;
    photoUrl?: string;
    severityScore: number;
    credibilityScore: number;
    status: 'pending' | 'verified' | 'dismissed';
    createdAt: string;
}

export interface NlpExtraction {
    id: string;
    documentId: string;
    documentName: string;
    extractionType: 'village' | 'water_source' | 'incident' | 'infrastructure';
    extractedData: Record<string, unknown>;
    confidence: number;
    reviewed: boolean;
}

export interface FloodAlert {
    id: string;
    affectedDesaCodes: string[];
    severity: 'ringan' | 'sedang' | 'berat';
    source: string;
    startedAt: string;
    endedAt?: string;
    contaminationRiskElevation: number;
    recoveryStatus: 'aktif' | 'pemulihan' | 'pulih';
}

export interface ReportCard {
    id: string;
    desaCode: string;
    grade: 'A' | 'B' | 'C' | 'D' | 'E';
    generatedAt: string;
    pdfUrl: string;
    isStale: boolean;
}

export interface DesaSummary {
    bpsCode: string;
    name: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    riskScore: number;
    riskClassification: string;
    grade: string;
    isMeasured: boolean;
    waterSourceCount: number;
    lastUpdated: string;
    population?: number;
}

export interface ProvinceStats {
    bpsCode: string;
    name: string;
    totalDesa: number;
    desaWithData: number;
    avgRiskScore: number;
    populationSafeWater: number;
    populationTotal: number;
}
