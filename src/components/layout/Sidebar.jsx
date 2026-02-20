// ============================================================
// Sidebar - Main navigation for SmartCRM Pro
// ============================================================
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Contact,
    LogOut,
    Zap,
    X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/leads', label: 'Leads', icon: Users },
    { to: '/deals', label: 'Deals', icon: Briefcase },
    { to: '/contacts', label: 'Contacts', icon: Contact },
];

export default function Sidebar({ mobileOpen, onClose }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Mobile overlay backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar panel */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800
          flex flex-col z-30 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
            >
                {/* Logo / Brand */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-base leading-none">SmartCRM</h1>
                            <span className="text-violet-400 text-xs font-medium">Pro</span>
                        </div>
                    </div>
                    {/* Close button (mobile) */}
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white lg:hidden transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation links */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* User profile + logout */}
                <div className="px-4 py-5 border-t border-slate-700">
                    {user && (
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {user.avatar}
                            </div>
                            <div className="min-w-0">
                                <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                                <p className="text-slate-400 text-xs truncate">{user.role}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
