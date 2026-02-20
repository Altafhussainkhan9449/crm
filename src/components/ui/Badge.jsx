// ============================================================
// Badge - Color-coded pill badge for sources and statuses
// ============================================================
import { sourceColors, statusColors } from '../../utils/helpers';

/**
 * SourceBadge — colored by lead source (Facebook, Mobile App, Website, Other)
 */
export function SourceBadge({ source }) {
    const colors = sourceColors[source] || sourceColors['Other'];
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            {source}
        </span>
    );
}

/**
 * StatusBadge — colored by lead or deal status
 */
export function StatusBadge({ status }) {
    const colors = statusColors[status] || statusColors['New'];
    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
        >
            {status}
        </span>
    );
}
