import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://yopips.com'),
  title: {
    default: 'YoPips Hedge Fund | Institutional Algo Trading',
    template: '%s | YoPips Fund'
  },
  description: 'Institutional-grade algorithmic trading for the modern investor. Join the elite with our high-frequency trading strategies. Start your $100 Test Drive today.',
  keywords: ['Hedge Fund', 'Algo Trading', 'Forex', 'Gold', 'Investment', 'High Yield', 'Passive Income', 'Trading Bot'],
  openGraph: {
    title: 'YoPips Hedge Fund | Institutional Algo Trading',
    description: 'Join the elite with our high-frequency trading strategies. Start your $100 Test Drive today.',
    url: 'https://yopips.com',
    siteName: 'YoPips Fund',
    images: [
      {
        url: '/og-image.png', // You should create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YoPips Hedge Fund',
    description: 'Institutional-grade algorithmic trading. Start your $100 Test Drive.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  );
}

