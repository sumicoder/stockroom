import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export const metadata: Metadata = {
    title: 'Stockroom - プロジェクト管理',
    description: '各種プロジェクトを管理・閲覧できるプラットフォーム',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <Header />
                <main className="py-8">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
