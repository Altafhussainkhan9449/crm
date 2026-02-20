// ============================================================
// Utility helpers for SmartCRM Pro
// ============================================================

/**
 * Format a number as PKR currency, abbreviating large values.
 * e.g. 73500 → "PKR 73.5K"
 */
export function formatCurrency(value) {
    if (value >= 1_000_000) return `PKR ${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `PKR ${(value / 1_000).toFixed(1)}K`;
    return `PKR ${value}`;
}

/**
 * Tailwind color classes for each lead source.
 */
export const sourceColors = {
    Facebook: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        dot: 'bg-blue-500',
    },
    'Mobile App': {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        dot: 'bg-purple-500',
    },
    Website: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        dot: 'bg-emerald-500',
    },
    Other: {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        dot: 'bg-amber-500',
    },
};

/**
 * Tailwind color classes for each lead/deal status.
 */
export const statusColors = {
    New: { bg: 'bg-slate-100', text: 'text-slate-600' },
    Contacted: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    Qualified: { bg: 'bg-blue-100', text: 'text-blue-700' },
    Converted: { bg: 'bg-green-100', text: 'text-green-700' },
    Negotiation: { bg: 'bg-orange-100', text: 'text-orange-700' },
    Won: { bg: 'bg-green-100', text: 'text-green-700' },
    Lost: { bg: 'bg-red-100', text: 'text-red-700' },
};

/**
 * Get initials from a full name string.
 * e.g. "Alice Johnson" → "AJ"
 */
export function getInitials(name = '') {
    return name
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();
}

/**
 * Kanban column header colors.
 */
export const stageColors = {
    New: 'bg-slate-500',
    Negotiation: 'bg-orange-500',
    Won: 'bg-emerald-500',
    Lost: 'bg-red-500',
};
