import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AirBersih — Platform Intelijen Risiko Kualitas Air Minum Indonesia",
  description:
    "Menjawab pertanyaan yang layak dijawab untuk 270 juta rakyat Indonesia: apakah air di desa saya aman diminum? Platform pertama yang menyatukan data kualitas air dari Kemenkes, Pamsimas, PDAM, dan laporan masyarakat.",
  keywords: [
    "air bersih",
    "kualitas air",
    "air minum",
    "Indonesia",
    "Pamsimas",
    "water quality",
    "drinking water",
    "risk assessment",
  ],
  authors: [{ name: "AirBersih Team" }],
  openGraph: {
    title: "AirBersih — Apakah Air di Desa Anda Aman?",
    description: "Platform intelijen risiko kualitas air minum untuk 83.000+ desa di Indonesia",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
