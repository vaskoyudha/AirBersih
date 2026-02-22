/**
 * Permenkes 492/2010 — Indonesia Drinking Water Quality Standards
 * Standar Baku Mutu Air Minum Indonesia
 * 
 * Also references Permenkes No. 2/2023 (successor regulation)
 */

export interface WaterParameter {
  id: string;
  nameId: string;        // Indonesian name
  nameEn: string;        // English name
  category: 'microbiological' | 'physical' | 'chemical_health' | 'chemical_other';
  maxPermissible: number;
  unit: string;
  isMandatory: boolean;
  description?: string;
}

export const WATER_PARAMETERS: WaterParameter[] = [
  // Microbiological
  { id: 'e_coli', nameId: 'E. coli', nameEn: 'E. coli', category: 'microbiological', maxPermissible: 0, unit: 'per 100ml', isMandatory: true },
  { id: 'total_coliform', nameId: 'Total Koliform', nameEn: 'Total Coliform', category: 'microbiological', maxPermissible: 0, unit: 'per 100ml', isMandatory: true },

  // Chemical — Health-related (mandatory)
  { id: 'arsenic', nameId: 'Arsen', nameEn: 'Arsenic', category: 'chemical_health', maxPermissible: 0.01, unit: 'mg/l', isMandatory: true },
  { id: 'fluoride', nameId: 'Fluorida', nameEn: 'Fluoride', category: 'chemical_health', maxPermissible: 1.5, unit: 'mg/l', isMandatory: true },
  { id: 'chromium', nameId: 'Kromium Total', nameEn: 'Total Chromium', category: 'chemical_health', maxPermissible: 0.05, unit: 'mg/l', isMandatory: true },
  { id: 'cadmium', nameId: 'Kadmium', nameEn: 'Cadmium', category: 'chemical_health', maxPermissible: 0.003, unit: 'mg/l', isMandatory: true },
  { id: 'nitrite', nameId: 'Nitrit (NO2-)', nameEn: 'Nitrite (NO2-)', category: 'chemical_health', maxPermissible: 3, unit: 'mg/l', isMandatory: true },
  { id: 'nitrate', nameId: 'Nitrat (NO3-)', nameEn: 'Nitrate (NO3-)', category: 'chemical_health', maxPermissible: 50, unit: 'mg/l', isMandatory: true },
  { id: 'cyanide', nameId: 'Sianida', nameEn: 'Cyanide', category: 'chemical_health', maxPermissible: 0.07, unit: 'mg/l', isMandatory: true },
  { id: 'selenium', nameId: 'Selenium', nameEn: 'Selenium', category: 'chemical_health', maxPermissible: 0.01, unit: 'mg/l', isMandatory: true },
  { id: 'lead', nameId: 'Timbal', nameEn: 'Lead', category: 'chemical_health', maxPermissible: 0.01, unit: 'mg/l', isMandatory: false },
  { id: 'mercury', nameId: 'Merkuri', nameEn: 'Mercury', category: 'chemical_health', maxPermissible: 0.001, unit: 'mg/l', isMandatory: false },

  // Physical
  { id: 'turbidity', nameId: 'Kekeruhan', nameEn: 'Turbidity', category: 'physical', maxPermissible: 5, unit: 'NTU', isMandatory: true },
  { id: 'color', nameId: 'Warna', nameEn: 'Color', category: 'physical', maxPermissible: 15, unit: 'TCU', isMandatory: true },
  { id: 'tds', nameId: 'Jumlah Zat Padat Terlarut (TDS)', nameEn: 'Total Dissolved Solids', category: 'physical', maxPermissible: 500, unit: 'mg/l', isMandatory: true },
  { id: 'ph', nameId: 'pH', nameEn: 'pH', category: 'physical', maxPermissible: 8.5, unit: '-', isMandatory: true, description: 'Range: 6.5-8.5' },

  // Chemical — Other
  { id: 'iron', nameId: 'Besi', nameEn: 'Iron', category: 'chemical_other', maxPermissible: 0.3, unit: 'mg/l', isMandatory: true },
  { id: 'manganese', nameId: 'Mangan', nameEn: 'Manganese', category: 'chemical_other', maxPermissible: 0.4, unit: 'mg/l', isMandatory: true },
  { id: 'aluminum', nameId: 'Aluminium', nameEn: 'Aluminum', category: 'chemical_other', maxPermissible: 0.2, unit: 'mg/l', isMandatory: true },
  { id: 'hardness', nameId: 'Kesadahan (CaCO3)', nameEn: 'Hardness (CaCO3)', category: 'chemical_other', maxPermissible: 500, unit: 'mg/l', isMandatory: true },
  { id: 'chloride', nameId: 'Klorida', nameEn: 'Chloride', category: 'chemical_other', maxPermissible: 250, unit: 'mg/l', isMandatory: true },
  { id: 'sulfate', nameId: 'Sulfat', nameEn: 'Sulfate', category: 'chemical_other', maxPermissible: 250, unit: 'mg/l', isMandatory: true },
  { id: 'copper', nameId: 'Tembaga', nameEn: 'Copper', category: 'chemical_other', maxPermissible: 2, unit: 'mg/l', isMandatory: true },
  { id: 'zinc', nameId: 'Seng', nameEn: 'Zinc', category: 'chemical_other', maxPermissible: 3, unit: 'mg/l', isMandatory: true },
  { id: 'ammonia', nameId: 'Ammonia', nameEn: 'Ammonia', category: 'chemical_other', maxPermissible: 1.5, unit: 'mg/l', isMandatory: true },
];

export const RISK_CLASSIFICATIONS = {
  aman: { id: 'aman', labelId: 'Aman', labelEn: 'Safe', color: '#22c55e', score: [0, 20] },
  risiko_rendah: { id: 'risiko_rendah', labelId: 'Risiko Rendah', labelEn: 'Low Risk', color: '#84cc16', score: [20, 40] },
  risiko_sedang: { id: 'risiko_sedang', labelId: 'Risiko Sedang', labelEn: 'Moderate Risk', color: '#eab308', score: [40, 60] },
  risiko_tinggi: { id: 'risiko_tinggi', labelId: 'Risiko Tinggi', labelEn: 'High Risk', color: '#f97316', score: [60, 80] },
  berbahaya: { id: 'berbahaya', labelId: 'Berbahaya', labelEn: 'Dangerous', color: '#ef4444', score: [80, 100] },
} as const;

export const WATER_SOURCE_TYPES = {
  sumur_gali: { id: 'sumur_gali', labelId: 'Sumur Gali', labelEn: 'Dug Well' },
  sumur_bor: { id: 'sumur_bor', labelId: 'Sumur Bor', labelEn: 'Borehole Well' },
  mata_air: { id: 'mata_air', labelId: 'Mata Air', labelEn: 'Spring' },
  pdam: { id: 'pdam', labelId: 'PDAM (Air Perpipaan)', labelEn: 'Piped Water (PDAM)' },
  pamsimas: { id: 'pamsimas', labelId: 'Pamsimas', labelEn: 'Pamsimas Installation' },
  pah: { id: 'pah', labelId: 'Penampungan Air Hujan', labelEn: 'Rainwater Collection' },
  perpipaan: { id: 'perpipaan', labelId: 'Perpipaan Non-PDAM', labelEn: 'Non-PDAM Piped' },
} as const;

export const SAFETY_GRADES = {
  A: { grade: 'A', labelId: 'Sangat Baik', labelEn: 'Excellent', color: '#22c55e', minScore: 0, maxScore: 20 },
  B: { grade: 'B', labelId: 'Baik', labelEn: 'Good', color: '#84cc16', minScore: 20, maxScore: 40 },
  C: { grade: 'C', labelId: 'Cukup', labelEn: 'Fair', color: '#eab308', minScore: 40, maxScore: 60 },
  D: { grade: 'D', labelId: 'Kurang', labelEn: 'Poor', color: '#f97316', minScore: 60, maxScore: 80 },
  E: { grade: 'E', labelId: 'Buruk', labelEn: 'Very Poor', color: '#ef4444', minScore: 80, maxScore: 100 },
} as const;

export function getExceedanceRatio(parameterId: string, measuredValue: number): number {
  const param = WATER_PARAMETERS.find(p => p.id === parameterId);
  if (!param) return 0;
  if (param.maxPermissible === 0) return measuredValue > 0 ? Infinity : 0;
  return measuredValue / param.maxPermissible;
}

export function getRiskClassification(score: number) {
  if (score < 20) return RISK_CLASSIFICATIONS.aman;
  if (score < 40) return RISK_CLASSIFICATIONS.risiko_rendah;
  if (score < 60) return RISK_CLASSIFICATIONS.risiko_sedang;
  if (score < 80) return RISK_CLASSIFICATIONS.risiko_tinggi;
  return RISK_CLASSIFICATIONS.berbahaya;
}

export function getSafetyGrade(score: number) {
  if (score < 20) return SAFETY_GRADES.A;
  if (score < 40) return SAFETY_GRADES.B;
  if (score < 60) return SAFETY_GRADES.C;
  if (score < 80) return SAFETY_GRADES.D;
  return SAFETY_GRADES.E;
}
