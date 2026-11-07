import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Shubham Bhoyar - Full Stack Developer (Node.js, React.js)",
  description:
    "Full Stack Developer with nearly 3 years of experience building and deploying scalable web applications with Node.js, React.js and microservices. Specialised in WhatsApp Business API, WhatsApp Flows and customer-engagement platforms.",
  keywords: [
    "Shubham Bhoyar",
    "Full Stack Developer",
    "Node.js",
    "React.js",
    "WhatsApp Business API",
    "WhatsApp Flows",
    "Microservices",
    "PostgreSQL",
    "MongoDB",
    "RabbitMQ",
    "Redis",
  ],
  authors: [{ name: "Shubham Bhoyar" }],
  creator: "Shubham Bhoyar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shubhambhoyar.vercel.app",
    title: "Shubham Bhoyar - Full Stack Developer",
    description:
      "Full Stack Developer with nearly 3 years of experience building scalable applications with Node.js, React.js, and microservices.",
    siteName: "Shubham Bhoyar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Bhoyar - Full Stack Developer",
    description:
      "Full Stack Developer with nearly 3 years of experience building scalable applications with Node.js, React.js, and microservices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
