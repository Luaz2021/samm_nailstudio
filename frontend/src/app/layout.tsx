import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "samm. NAIL STUDIO · Callao, Lima - Perú",
  description: "Atelier de manicura y estética ungueal de alta precisión en Callao, Lima. Servicios cerrados de 2 horas con productos 20-Free y esterilización hospitalaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${plusJakarta.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#FBF8F6] text-[#231C1A]">
        {children}
      </body>
    </html>
  );
}
