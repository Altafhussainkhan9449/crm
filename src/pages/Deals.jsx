// ============================================================
// Deals Page - Kanban board with drag & drop, edit & delete
// ============================================================
import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import KanbanColumn from '../components/deals/KanbanColumn';
import DealModal from '../components/deals/DealModal';
import { DEAL_STAGES } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

export default function Deals() {
    const { deals, moveDeal, updateDeal, deleteDeal } = useCRM();
    const [modalOpen, setModalOpen] = useState(false);
    const [editDeal, setEditDeal] = useState(null);

    // Handle drag-and-drop between columns
    const handleDragEnd = (result) => {
        const { draggableId, destination } = result;
        if (!destination) return;
        if (destination.droppableId === result.source.droppableId) return;
        moveDeal(draggableId, destination.droppableId);
    };

    const openEdit = (deal) => { setEditDeal(deal); setModalOpen(true); };
    const openAdd = () => { setEditDeal(null); setModalOpen(true); };

    const handleSave = (data) => {
        if (editDeal) updateDeal(editDeal.id, data);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this deal?')) deleteDeal(id);
    };

    // Pipeline summary stats
    const totalPipelineValue = deals
        .filter(d => d.stage !== 'Lost')
        .reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="max-w-full space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Deals Pipeline</h1>
                    <p className="text-slate-500 text-sm mt-0.5">
                        {deals.length} deals · Pipeline value:{' '}
                        <span className="font-semibold text-violet-700">{formatCurrency(totalPipelineValue)}</span>
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    {/* Stage summary chips */}
                    {DEAL_STAGES.map(stage => {
                        const count = deals.filter(d => d.stage === stage).length;
                        return (
                            <div key={stage} className="text-xs font-medium bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600">
                                {stage}: <span className="font-bold text-slate-900">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Instruction hint */}
            <div className="bg-violet-50 border border-violet-100 text-violet-700 text-sm rounded-xl px-4 py-2.5 flex items-center gap-2">
                <span>💡</span>
                <span>Drag deal cards between columns to update their stage. Hover a card to edit or delete it.</span>
            </div>

            {/* Kanban Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {DEAL_STAGES.map(stage => (
                        <KanbanColumn
                            key={stage}
                            stage={stage}
                            deals={deals.filter(d => d.stage === stage)}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </DragDropContext>

            {/* Edit Deal Modal */}
            <DealModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                deal={editDeal}
            />
        </div>
    );
}
