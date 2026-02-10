
import React from 'react';

const styles = {
    badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
    },
    // Priorities
    critical: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.5)' },
    high: { backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.5)' },
    medium: { backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#eab308', border: '1px solid rgba(234, 179, 8, 0.5)' },
    low: { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.5)' },
    // Statuses
    backlog: { backgroundColor: 'rgba(113, 113, 122, 0.2)', color: '#71717a', border: '1px solid rgba(113, 113, 122, 0.5)' },
    inprogress: { backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.5)' },
    testing: { backgroundColor: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', border: '1px solid rgba(236, 72, 153, 0.5)' },
    done: { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.5)' },
};

const normalize = (str) => str.toLowerCase().replace(/\s+/g, '');

const StatusBadge = ({ type, label }) => { // type: 'status' | 'priority'
    const key = normalize(label);
    const style = styles[key] || styles.backlog;

    return (
        <span style={{ ...styles.badge, ...style }}>
            {label}
        </span>
    );
};

export default StatusBadge;
