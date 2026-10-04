import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'BlogSphere | Next.js 16 Blog Management Platform',
    template: '%s | BlogSphere',
  },
  description:
    'A high-performance modern blog management application engineered with Next.js 16 App Router, Turbopack, React 19 Server Actions, and Async Request APIs.',
  keywords: ['Next.js 16', 'React 19', 'Turbopack', 'Server Actions', 'Blog Management', 'App Router'],
  authors: [{ name: 'Harsh Vardhan' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 12rem)', paddingBottom: '4rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
