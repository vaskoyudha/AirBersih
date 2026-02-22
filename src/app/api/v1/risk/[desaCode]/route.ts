import { NextResponse } from 'next/server';
import { RISK_CLASSIFICATIONS, WATER_PARAMETERS, getSafetyGrade, getRiskClassification } from '@/lib/constants/water-standards';

/**
 * GET /api/v1/risk/[desaCode]
 * Returns risk assessment data for a specific village
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ desaCode: string }> }
) {
    const { desaCode } = await params;

    // Demo data — in production this queries Supabase
    const demoRiskData = {
        desaCode,
        desaName: 'Desa ' + desaCode,
        assessedAt: new Date().toISOString(),
        overallRiskScore: 52,
        riskClassification: getRiskClassification(52),
        safetyGrade: getSafetyGrade(52),
        isMeasured: Math.random() > 0.5,
        confidenceInterval: { lower: 42, upper: 62 },
        riskBreakdown: {
            microbiological: { score: 65, factors: ['open_defecation_prevalence', 'flood_exposure', 'population_density'] },
            nitrate: { score: 35, factors: ['agricultural_land_proximity', 'fertilizer_intensity'] },
            heavyMetal: { score: 20, factors: ['mining_proximity', 'industrial_zone_distance'] },
            arsenicFluoride: { score: 10, factors: ['geological_aquifer_type', 'volcanic_proximity'] },
        },
        waterSources: [
            { id: '1', name: 'Sumur Gali', type: 'sumur_gali', riskScore: 72, lastTested: '2025-01-15' },
            { id: '2', name: 'Pamsimas SAB', type: 'pamsimas', riskScore: 18, lastTested: '2025-02-10' },
        ],
        dataProvenance: {
            sources: ['Pamsimas', 'BPS Susenas', 'Crowd Reports'],
            lastMeasurement: '2025-01-15',
            modelVersion: 'v1.2.0',
            standardsReference: 'Permenkes 492/2010',
        },
        _links: {
            reportCard: `/laporan?desa=${desaCode}`,
            map: `/map?focus=${desaCode}`,
        },
    };

    return NextResponse.json({
        success: true,
        data: demoRiskData,
        meta: {
            api: 'AirBersih Risk API v1',
            parameters: WATER_PARAMETERS.length,
            classifications: Object.keys(RISK_CLASSIFICATIONS).length,
            disclaimer: 'Risk scores combine measured data where available with ML predictions. Confidence intervals indicate prediction reliability.',
        },
    });
}
