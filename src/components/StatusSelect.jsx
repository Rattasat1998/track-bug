import React from 'react';

const styles = {
    select: {
        padding: '0.15rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.85rem',
        fontWeight: 400,
        textTransform: 'none',
        letterSpacing: 'normal',
        display: 'inline-block',
        border: 'none',
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
        textAlign: 'left',
        outline: 'none',
        transition: 'background-color 0.2s',
        lineHeight: '1.2',
        minWidth: '80px',
    },
    // Notion Tag Colors
    critical: { backgroundColor: 'var(--tag-red-bg)', color: 'var(--tag-red-text)' },
    high: { backgroundColor: 'var(--tag-orange-bg)', color: 'var(--tag-orange-text)' },
    medium: { backgroundColor: 'var(--tag-yellow-bg)', color: 'var(--tag-yellow-text)' },
    low: { backgroundColor: 'var(--tag-blue-bg)', color: 'var(--tag-blue-text)' },

    backlog: { backgroundColor: 'var(--tag-gray-bg)', color: 'var(--tag-gray-text)' },
    inprogress: { backgroundColor: 'var(--tag-blue-bg)', color: 'var(--tag-blue-text)' },
    testing: { backgroundColor: 'var(--tag-purple-bg)', color: 'var(--tag-purple-text)' },
    done: { backgroundColor: 'var(--tag-green-bg)', color: 'var(--tag-green-text)' },
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
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
};

export default StatusSelect;
