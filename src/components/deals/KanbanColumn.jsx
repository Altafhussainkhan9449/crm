// ============================================================
// KanbanColumn - Droppable Kanban stage column
// ============================================================
import { Droppable } from '@hello-pangea/dnd';
import DealCard from './DealCard';
import { stageColors } from '../../utils/helpers';

export default function KanbanColumn({ stage, deals, onEdit, onDelete }) {
    const headerColor = stageColors[stage] || 'bg-slate-500';
    const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="flex flex-col w-64 flex-shrink-0 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            {/* Column header */}
            <div className={`${headerColor} px-4 py-3`}>
                <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-sm">{stage}</h3>
                    <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {deals.length}
                    </span>
                </div>
                <p className="text-white/75 text-xs mt-0.5">
                    ${(totalValue / 1000).toFixed(1)}K total
                </p>
            </div>

            {/* Droppable area */}
            <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 space-y-3 min-h-32 transition-colors duration-150 ${snapshot.isDraggingOver ? 'bg-violet-50' : 'bg-slate-50'
                            }`}
                    >
                        {deals.map((deal, index) => (
                            <DealCard key={deal.id} deal={deal} index={index} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                        {provided.placeholder}

                        {/* Empty state */}
                        {deals.length === 0 && !snapshot.isDraggingOver && (
                            <div className="flex items-center justify-center h-20 border-2 border-dashed border-slate-200 rounded-xl">
                                <p className="text-xs text-slate-400">Drop deals here</p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
