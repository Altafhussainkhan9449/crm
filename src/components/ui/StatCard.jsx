// ============================================================
// StatCard - KPI card used on the Dashboard
// Props: title, value, icon (Lucide component), color, change, subtitle
// ============================================================

export default function StatCard({ title, value, icon: Icon, colorClass, change, subtitle }) {
    const isPositive = typeof change === 'number' ? change >= 0 : true;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{title}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
            </div>
            <div>
                <p className="text-3xl font-bold text-slate-900 leading-none">{value}</p>
                {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
            </div>
            {change !== undefined && (
                <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                    <span>{isPositive ? '▲' : '▼'}</span>
                    <span>{Math.abs(change)}% vs last month</span>
                </div>
            )}
        </div>
    );
}
