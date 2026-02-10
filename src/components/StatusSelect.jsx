import React from 'react';

const styles = {
    select: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
        border: 'none',
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
        textAlign: 'center',
        outline: 'none',
        transition: 'opacity 0.2s',
    },
    // Reusing colors from StatusBadge for consistency
    critical: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.5)' },
    high: { backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.5)' },
    medium: { backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#eab308', border: '1px solid rgba(234, 179, 8, 0.5)' },
    low: { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.5)' },

    backlog: { backgroundColor: 'rgba(113, 113, 122, 0.2)', color: '#71717a', border: '1px solid rgba(113, 113, 122, 0.5)' },
    inprogress: { backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.5)' },
    testing: { backgroundColor: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', border: '1px solid rgba(236, 72, 153, 0.5)' },
    done: { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.5)' },
};

const normalize = (str) => str.toLowerCase().replace(/\s+/g, '');

const StatusSelect = ({ type, value, onChange }) => {
    const key = normalize(value);
    const style = styles[key] || styles.backlog;

    const options = type === 'priority'
        ? ['Critical', 'High', 'Medium', 'Low']
        : ['Backlog', 'In Progress', 'Testing', 'Done'];

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ ...styles.select, ...style }}
        >
            {options.map(opt => (
                <option key={opt} value={opt} style={{ backgroundColor: '#1f1f1f', color: 'white' }}>
                    {opt}
                </option>
            ))}
        </select>
    );
};

export default StatusSelect;
