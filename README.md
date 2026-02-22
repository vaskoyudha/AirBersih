[![Next.js 15](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-396CB2?style=for-the-badge&logo=maplibre&logoColor=white)](https://maplibre.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

# AirBersih v2.1

### Platform Intelijen Risiko Kualitas Air Minum Indonesia

AirBersih is a national-scale drinking water quality risk intelligence platform built for Indonesia. It aggregates over 2.4 million data points from government health ministries, regional water utilities, community crowd-sourced reports, and national meteorological feeds — spanning 38 provinces, 156,000+ water sources, and 83,762 villages — into a unified geospatial risk model. The platform combines machine learning risk scoring, an NLP pipeline for unstructured health report parsing, real-time community incident reporting, and BMKG flood-alert integration to deliver actionable contamination risk intelligence at the desa level.

---

## Screenshots

<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/vaskoyudha/AirBersih/main/public/screenshots/homepage.png" alt="Homepage — Dashboard Overview" width="100%"/>
      <br/><sub><b>Homepage — Dashboard Overview</b></sub>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/vaskoyudha/AirBersih/main/public/screenshots/map.png" alt="Peta Risiko — Interactive National Risk Map" width="100%"/>
      <br/><sub><b>Peta Risiko — Interactive National Risk Map</b></sub>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/vaskoyudha/AirBersih/main/public/screenshots/analytics.png" alt="Analytics — Provincial Risk Breakdown" width="100%"/>
      <br/><sub><b>Analytics — Provincial Risk Breakdown</b></sub>
    </td>
  </tr>
</table>

---

## Features

**Peta Risiko Interaktif**
MapLibre GL JS v5-powered national risk map rendering 156,000+ water source markers color-coded by computed risk score. Supports province- and desa-level drill-down with real-time filter controls.

**Prediksi ML**
Machine learning risk scoring engine that calculates a 0–100 composite risk score for each of Indonesia's 83,762 villages. The model ingests structured data from Kemenkes and PDAM to produce five-tier risk classifications — from *Aman* (safe) through *Berbahaya* (hazardous).

**Pipeline NLP**
Natural language processing pipeline that parses unstructured community health reports — extracting location entities, contaminant keywords, and severity signals — and feeds structured records back into the risk model.

**Kartu Laporan**
Geotagged incident card system allowing field officers and citizens to attach photo evidence, coordinates, and structured metadata to reported water quality events. Cards are surfaced directly on the risk map.

**Laporan Masyarakat**
Crowd-sourced water quality reporting interface with real-time synchronisation via Supabase Realtime. Submissions are validated, geolocated, and queued for NLP processing before integration into the risk dataset.

**Peringatan Banjir**
Flood alert module integrating BMKG weather station data to forecast contamination risk windows. When flood thresholds are breached in a given region, the system automatically elevates risk scores for downstream water sources and triggers alerts.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS v4 |
| Map | MapLibre GL JS v5 |
| Backend / Database | Supabase (PostgreSQL + Realtime) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Data Coverage

| Metric | Scale |
|---|---|
| Total data points | 2,400,000+ |
| Desa (villages) covered | 83,762 |
| Sumber air (water sources) | 156,000+ |
| Provinsi | 38 |

---

## Risk Score System

| Level | Score Range | Color |
|---|---|---|
| Aman | 0 – 20 | Green |
| Risiko Rendah | 20 – 40 | Yellow-green |
| Risiko Sedang | 40 – 60 | Orange |
| Risiko Tinggi | 60 – 80 | Red |
| Berbahaya | 80 – 100 | Dark red / crimson |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project with the AirBersih schema applied
- Git

### Installation

```bash
git clone https://github.com/vaskoyudha/AirBersih.git
cd AirBersih
npm install
```

Create a `.env.local` file in the project root and populate the required environment variables (see table below):

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous public key |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage / dashboard overview
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles (Tailwind v4)
│   ├── map/page.tsx      # Interactive risk map
│   ├── analytics/        # Analytics dashboard
│   ├── lapor/            # Report submission form
│   ├── laporan/          # Community report listing
│   ├── banjir/           # Flood alert system
│   ├── nlp/              # NLP pipeline viewer
│   └── tentang/          # About page
└── components/
    └── layout/
        └── Navbar.tsx    # Navigation
```

### Application Routes

| Route | Description |
|---|---|
| `/` | Homepage — dashboard overview |
| `/map` | Interactive national risk map |
| `/analytics` | Analytics and provincial risk charts |
| `/lapor` | Submit a water quality incident report |
| `/laporan` | Browse community-submitted reports |
| `/banjir` | Flood alert system and contamination forecasts |
| `/nlp` | NLP pipeline viewer and processing log |
| `/tentang` | About AirBersih |

---

## Data Sources

| Source | Description |
|---|---|
| **Kementerian Kesehatan RI (Kemenkes)** | National health ministry — water quality inspection records and drinking water surveillance data |
| **Pamsimas** | Government community water supply program — rural infrastructure and quality monitoring data |
| **PDAM** | Regional water utilities (Perusahaan Daerah Air Minum) — service area coverage and quality readings |
| **Laporan Masyarakat** | Crowd-sourced community incident reports submitted directly through the platform |
| **BMKG** | Badan Meteorologi, Klimatologi, dan Geofisika — weather station feeds for flood risk and contamination forecasting |

---

## Compliance & Standards

AirBersih is designed in alignment with the following Indonesian national regulations and international frameworks:

- **Permenkes No. 492/Menkes/Per/IV/2010** — Persyaratan Kualitas Air Minum (Indonesian Drinking Water Quality Regulation)
- **WHO Water Safety Plan (WSP) Framework** — Risk-based approach to ensuring safe drinking water from catchment to consumer
- **SNI 6775:2008** — Indonesian National Standard for drinking water quality parameters and testing methods

---

## License

This project is licensed under the [MIT License](LICENSE).
