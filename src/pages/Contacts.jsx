// ============================================================
// Contacts Page - Contact list with search filtering
// ============================================================
import { useState } from 'react';
import { Search, Mail, Phone, Building2 } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { getInitials } from '../utils/helpers';

// Avatar background colors — cycling through a palette
const avatarColors = [
    'from-violet-500 to-indigo-600',
    'from-pink-500 to-rose-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-blue-500 to-cyan-600',
];

export default function Contacts() {
    const { contacts } = useCRM();
    const [search, setSearch] = useState('');

    const filtered = contacts.filter(c => {
        const q = search.toLowerCase();
        return (
            !q ||
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.company.toLowerCase().includes(q) ||
            (c.role && c.role.toLowerCase().includes(q))
        );
    });

    return (
        <div className="max-w-7xl mx-auto space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
                    <p className="text-slate-500 text-sm mt-0.5">{contacts.length} contacts in your database</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name, email, company…"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-50"
                    />
                </div>
            </div>

            {/* No results */}
            {filtered.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400 text-sm">
                    No contacts found for "{search}".
                </div>
            )}

            {/* Contact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((contact, i) => {
                    const gradient = avatarColors[i % avatarColors.length];
                    return (
                        <div
                            key={contact.id}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200 flex flex-col"
                        >
                            {/* Avatar + name */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}
                                >
                                    {getInitials(contact.name)}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 truncate">{contact.name}</p>
                                    {contact.role && (
                                        <p className="text-xs text-violet-600 font-medium truncate">{contact.role}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 text-sm flex-1">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                                    <span className="truncate">{contact.company}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Mail className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="truncate text-violet-600 hover:underline"
                                    >
                                        {contact.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                                    <span className="truncate">{contact.phone}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer count */}
            {filtered.length > 0 && (
                <p className="text-xs text-slate-400 text-center">
                    Showing {filtered.length} of {contacts.length} contacts
                </p>
            )}
        </div>
    );
}
