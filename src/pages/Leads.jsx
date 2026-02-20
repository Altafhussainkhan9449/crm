// ============================================================
// Leads Page - Full lead management with CRUD and filtering
// ============================================================
import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { SourceBadge, StatusBadge } from '../components/ui/Badge';
import LeadModal from '../components/leads/LeadModal';
import { LEAD_SOURCES } from '../data/mockData';
import { getInitials } from '../utils/helpers';

export default function Leads() {
    const { leads, addLead, updateLead, deleteLead } = useCRM();
    const [modalOpen, setModalOpen] = useState(false);
    const [editLead, setEditLead] = useState(null);
    const [search, setSearch] = useState('');
    const [sourceFilter, setSourceFilter] = useState('All');

    // Filtered leads (search + source filter)
    const filtered = leads.filter(l => {
        const matchSource = sourceFilter === 'All' || l.source === sourceFilter;
        const q = search.toLowerCase();
        const matchSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
        return matchSource && matchSearch;
    });

    const openAdd = () => { setEditLead(null); setModalOpen(true); };
    const openEdit = (lead) => { setEditLead(lead); setModalOpen(true); };

    const handleSave = (data) => {
        if (editLead) updateLead(editLead.id, data);
        else addLead(data);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this lead?')) deleteLead(id);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
                    <p className="text-slate-500 text-sm mt-0.5">{leads.length} total leads in your pipeline</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Lead
                </button>
            </div>

            {/* Filters bar */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search leads…"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-50"
                    />
                </div>

                {/* Source filter */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-slate-400" />
                    {['All', ...LEAD_SOURCES].map(src => (
                        <button
                            key={src}
                            onClick={() => setSourceFilter(src)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${sourceFilter === src
                                ? 'bg-violet-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {src}
                        </button>
                    ))}
                </div>
            </div>

            {/* Leads table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-left">
                                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                                        No leads found. Try adjusting your filters.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(lead => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                        {/* Lead name + email */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    {getInitials(lead.name)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{lead.name}</p>
                                                    <p className="text-xs text-slate-400">{lead.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><SourceBadge source={lead.source} /></td>
                                        <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                                        <td className="px-6 py-4 text-slate-400 tabular-nums">{lead.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(lead)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                                                    title="Edit lead"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(lead.id)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    title="Delete lead"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table footer */}
                {filtered.length > 0 && (
                    <div className="px-6 py-3 border-t border-slate-50 text-xs text-slate-400">
                        Showing {filtered.length} of {leads.length} leads
                    </div>
                )}
            </div>

            {/* Lead Add/Edit Modal */}
            <LeadModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                lead={editLead}
            />
        </div>
    );
}
