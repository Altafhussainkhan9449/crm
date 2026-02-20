// ============================================================
// Layout - Main app shell (Sidebar + content area)
// ============================================================
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile top bar */}
                <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="text-slate-600 hover:text-slate-900"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-slate-800">SmartCRM Pro</span>
                </header>

                {/* Page content — scrollable */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
