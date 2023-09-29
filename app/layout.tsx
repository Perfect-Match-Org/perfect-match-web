'use client';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    {children}
                    <Analytics />
                </SessionProvider>
            </body>
        </html>
    );
}
