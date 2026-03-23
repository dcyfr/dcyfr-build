import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DCYFR Build — Infrastructure Template Library',
  description: 'Battle-tested Docker, Kubernetes, and CI/CD templates with cost estimator.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-emerald-950 text-emerald-50 min-h-screen flex flex-col`}>
        <header className="border-b border-emerald-800/50 bg-emerald-950/80 backdrop-blur-sm sticky top-0 z-50">
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
            aria-label="Main navigation"
          >
            <Link href="/" className="flex items-center gap-2 text-emerald-100 font-bold text-lg hover:text-white transition-colors">
              <span className="text-emerald-400">◈</span>
              <span>dcyfr<span className="text-emerald-400">.build</span></span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="text-emerald-300 hover:text-emerald-100 transition-colors">Home</Link>
              <Link href="/templates" className="text-emerald-300 hover:text-emerald-100 transition-colors">Templates</Link>
              <Link href="/cost-estimator" className="text-emerald-300 hover:text-emerald-100 transition-colors">Cost Estimator</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-emerald-800/50 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-emerald-400">
            <p>&copy; 2026 DCYFR. All templates MIT licensed.</p>
            <p className="text-emerald-500">dcyfr.build — infrastructure for AI-powered apps</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
