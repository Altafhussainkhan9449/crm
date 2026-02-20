// ============================================================
// DealModal - Add or Edit a deal
// ============================================================
import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { DEAL_STAGES } from '../../data/mockData';

const emptyForm = {
    title: '',
    company: '',
    contact: '',
    value: '',
    stage: 'New',
};

export default function DealModal({ isOpen, onClose, onSave, deal }) {
    const [form, setForm] = useState(emptyForm);
    const isEdit = Boolean(deal);

    useEffect(() => {
        setForm(deal ? { ...deal, value: deal.value ?? '' } : emptyForm);
    }, [deal, isOpen]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...form, value: Number(form.value) || 0 });
        onClose();
    };

    const inputClass =
        'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Deal' : 'Add New Deal'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Deal Title *</label>
                    <input
                        required
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. TechCorp License Deal"
                        className={inputClass}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Company</label>
                        <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Acme Corp"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Contact</label>
                        <input
                            name="contact"
                            value={form.contact}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Value ($)</label>
                        <input
                            type="number"
                            min="0"
                            name="value"
                            value={form.value}
                            onChange={handleChange}
                            placeholder="10000"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Stage</label>
                        <select name="stage" value={form.stage} onChange={handleChange} className={inputClass}>
                            {DEAL_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
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
                        {isEdit ? 'Save Changes' : 'Add Deal'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
