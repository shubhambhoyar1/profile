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
  title: "Shubham Bhoyar - Software Engineer",
  description: "Software Engineer specializing in full-stack development, creating accessible and performant web applications.",
  keywords: ["Software Engineer", "Full Stack Developer", "React", "Node.js", "TypeScript", "Web Development"],
  authors: [{ name: "Shubham Bhoyar" }],
  creator: "Shubham Bhoyar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shubhambhoyar.dev",
    title: "Shubham Bhoyar - Software Engineer",
    description: "Software Engineer specializing in full-stack development, creating accessible and performant web applications.",
    siteName: "Shubham Bhoyar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Bhoyar - Software Engineer",
    description: "Software Engineer specializing in full-stack development, creating accessible and performant web applications.",
    creator: "@shubhambhoyar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
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
