import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aishwarya Ganga VN | Data Analyst Portfolio",
  description: "Results-driven Data Analyst with expertise in Python, SQL, Power BI, and BigQuery. Specializing in IoT data processing, business intelligence, and data visualization.",
  keywords: ["Data Analyst", "Python", "SQL", "Power BI", "BigQuery", "IoT", "Business Intelligence", "Data Visualization"],
  authors: [{ name: "Aishwarya Ganga VN" }],
  openGraph: {
    title: "Aishwarya Ganga VN | Data Analyst Portfolio",
    description: "Results-driven Data Analyst with expertise in Python, SQL, Power BI, and BigQuery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

