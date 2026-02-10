import React, { useState, useEffect } from 'react';

const styles = {
    input: {
        background: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
        color: 'inherit',
        font: 'inherit',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'text',
        transition: 'all 0.2s',
    },
    inputFocus: {
        borderColor: 'var(--accent-primary)',
        background: 'var(--bg-tertiary)',
    }
};

const InlineEdit = ({ value, onChange, className }) => {
    const [internalValue, setInternalValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleBlur = () => {
        setIsFocused(false);
        if (internalValue !== value) {
            onChange(internalValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
        if (e.key === 'Escape') {
            setInternalValue(value);
            e.currentTarget.blur();
        }
    };

    return (
        <input
            type="text"
            className={className}
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={{
                ...styles.input,
                ...(isFocused ? styles.inputFocus : {}),
                ...(!isFocused ? { textOverflow: 'ellipsis' } : {})
            }}
        />
    );
};

export default InlineEdit;
