// ============================================================
// DealCard - Draggable card with Edit & Delete actions
// ============================================================
import { Draggable } from '@hello-pangea/dnd';
import { formatCurrency } from '../../utils/helpers';
import { Building2, User, Pencil, Trash2 } from 'lucide-react';

export default function DealCard({ deal, index, onEdit, onDelete }) {
    return (
        <Draggable draggableId={deal.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`group bg-white rounded-xl p-4 shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing select-none
                        hover:shadow-md transition-shadow duration-150
                        ${snapshot.isDragging ? 'shadow-xl ring-2 ring-violet-400 rotate-1' : ''}`}
                >
                    {/* Title + action buttons row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-semibold text-slate-800 leading-snug flex-1">{deal.title}</p>

                        {/* Edit / Delete — visible on hover */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <button
                                onMouseDown={e => e.stopPropagation()} // prevent drag on click
                                onClick={(e) => { e.stopPropagation(); onEdit(deal); }}
                                className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                                title="Edit deal"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onMouseDown={e => e.stopPropagation()}
                                onClick={(e) => { e.stopPropagation(); onDelete(deal.id); }}
                                className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete deal"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                        <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{deal.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <User className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{deal.contact}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-violet-700">{formatCurrency(deal.value)}</span>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
