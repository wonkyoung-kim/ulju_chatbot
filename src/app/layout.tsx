// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import ReactQueryProvider from '../provider/ReactQueryProvider';

export const metadata: Metadata = {
    title: '울주 안전 내비게이션',
    description: '방사능 방재 대응용 챗봇 시스템',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
}
