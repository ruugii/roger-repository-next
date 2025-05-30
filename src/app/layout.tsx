import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El portfolio de Roger - Next.js - Desarrollador Web Full Stack",
  description: "El portfolio de Roger - Next.js - Desarrollador Web Full Stack",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen grid grid-rows-layout`}
      >
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
        >
          {children}
          <Analytics/>
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
