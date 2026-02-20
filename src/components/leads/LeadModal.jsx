// ============================================================
// LeadModal - Add or Edit a lead
// ============================================================
import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../data/mockData';

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    source: 'Website',
    status: 'New',
};

export default function LeadModal({ isOpen, onClose, onSave, lead }) {
    const [form, setForm] = useState(emptyForm);
    const isEdit = Boolean(lead);

    // Populate form when editing
    useEffect(() => {
        setForm(lead ? { ...lead } : emptyForm);
    }, [lead, isOpen]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    const inputClass =
        'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Lead' : 'Add New Lead'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Full Name *</label>
                    <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className={inputClass}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Email *</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="jane@acme.com"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Phone</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Lead Source</label>
                        <select name="source" value={form.source} onChange={handleChange} className={inputClass}>
                            {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Status</label>
                        <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                            {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-sm"
                    >
                        {isEdit ? 'Save Changes' : 'Add Lead'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
