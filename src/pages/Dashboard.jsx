// ============================================================
// Dashboard Page - Overview with KPI cards and charts
// ============================================================
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
    Users, Briefcase, TrendingUp, Star,
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/ui/StatCard';
import { SourceBadge } from '../components/ui/Badge';
import { monthlyRevenue, leadsBySource, recentActivity } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

// Custom Recharts tooltip
function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-xl rounded-xl px-4 py-3 border border-slate-100 text-sm">
                <p className="font-semibold text-slate-700 mb-1">{label}</p>
                <p className="text-violet-600 font-bold">{formatCurrency(payload[0].value)}</p>
            </div>
        );
    }
    return null;
}

export default function Dashboard() {
    const { stats } = useCRM();
    const { user } = useAuth();

    const kpiCards = [
        {
            title: 'Total Leads',
            value: stats.totalLeads,
            icon: Users,
            colorClass: 'bg-violet-500',
            change: 12,
            subtitle: 'All time',
        },
        {
            title: 'Active Deals',
            value: stats.activeDeals,
            icon: Briefcase,
            colorClass: 'bg-orange-500',
            change: 8,
            subtitle: 'In pipeline',
        },
        {
            title: 'Conversion Rate',
            value: `${stats.conversionRate}%`,
            icon: TrendingUp,
            colorClass: 'bg-blue-500',
            change: 4,
            subtitle: 'Leads → Converted',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Good evening, {user?.name?.split(' ')[0] ?? 'there'} 👋
                </h1>
                <p className="text-slate-500 text-sm mt-1">Here's what's happening with your CRM today.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {kpiCards.map(card => (
                    <StatCard key={card.title} {...card} />
                ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Bar Chart - Monthly Revenue */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-slate-900">Revenue Overview</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Monthly revenue — last 6 months</p>
                    </div>
                    <ResponsiveContainer width="100%" height={230}>
                        <BarChart data={monthlyRevenue} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="revenue" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                            <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7c3aed" />
                                    <stop offset="100%" stopColor="#a78bfa" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Leads by Source */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="mb-4">
                        <h2 className="text-base font-semibold text-slate-900">Leads by Source</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Acquisition channels</p>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={leadsBySource}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {leadsBySource.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} leads`, name]} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Legend */}
                    <div className="space-y-2 mt-2">
                        {leadsBySource.map(item => (
                            <div key={item.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                                    <span className="text-slate-600">{item.name}</span>
                                </div>
                                <span className="font-semibold text-slate-800">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Latest events across your CRM</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-left">
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {recentActivity.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-3.5 text-slate-700">{item.action}</td>
                                    <td className="px-6 py-3.5 font-medium text-slate-900">{item.subject}</td>
                                    <td className="px-6 py-3.5">
                                        {item.source !== '—'
                                            ? <SourceBadge source={item.source} />
                                            : <span className="text-slate-400">—</span>
                                        }
                                    </td>
                                    <td className="px-6 py-3.5 text-slate-400">{item.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* What Our Clients Say */}
            <section className="pt-4 pb-2">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">What Our Clients Say</h2>
                    <div className="mt-2 mx-auto w-12 h-1 rounded-full bg-emerald-500" aria-hidden />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            quote: 'Manahil Estate provided clear advice and a fast response. We secured a fair price on our plot with absolute confidence. Their professionalism is unmatched.',
                            name: 'Ali Khan',
                            role: 'Investor, Islamabad',
                            initials: 'AK',
                        },
                        {
                            quote: 'The team explained all the transfer fees and taxes in simple terms. There were zero surprises, and the entire process was transparent and smooth.',
                            name: 'Fatima Ahmed',
                            role: 'Home Buyer, Lahore',
                            initials: 'FA',
                        },
                        {
                            quote: 'Their market data combined with virtual site visits helped me shortlist properties in days, not weeks. A truly five-star service for overseas Pakistanis.',
                            name: 'Usman Baig',
                            role: 'Overseas Client, Karachi',
                            initials: 'UB',
                        },
                    ].map((t) => (
                        <div
                            key={t.name}
                            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col"
                        >
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                                ))}
                            </div>
                            <blockquote className="flex-1 border-l-4 border-emerald-500 pl-4 py-1 text-slate-600 text-sm italic leading-relaxed">
                                {t.quote}
                            </blockquote>
                            <div className="mt-5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{t.name}</p>
                                    <p className="text-sm text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
