import React, { useState } from 'react';
import './AddBugModal.css';

const AddBugModal = ({ isOpen, onClose, onAdd, initialData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        priority: 'Medium',
        status: 'Backlog',
        assignee: '',
        device: '',
        steps: '',
        image: ''
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                priority: 'Medium',
                status: 'Backlog',
                assignee: '',
                device: '',
                steps: '',
                image: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newBug = {
                id: initialData ? initialData.id : `BUG-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
                ...formData
            };
            await onAdd(newBug);
            onClose();
            if (!initialData) {
                setFormData({
                    title: '',
                    priority: 'Medium',
                    status: 'Backlog',
                    assignee: '',
                    device: '',
                    steps: '',
                    image: ''
                });
            }
        } catch (error) {
            console.error("Error adding bug:", error);
            alert("Failed to save bug. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{initialData ? 'Edit Bug' : 'Report New Bug'}</h2>
                    <button className="close-btn" onClick={onClose} disabled={isSubmitting}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="bug-form">
                    {/* ... form fields ... */}
                    <div className="form-group">
                        <label>Issue Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. App crashes on launch" disabled={isSubmitting} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Priority</label>
                            <select name="priority" value={formData.priority} onChange={handleChange} disabled={isSubmitting}>
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} disabled={isSubmitting}>
                                <option value="Backlog">Backlog</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Testing">Testing</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Assignee</label>
                            <input type="text" name="assignee" value={formData.assignee} onChange={handleChange} required placeholder="e.g. Dev A" disabled={isSubmitting} />
                        </div>
                        <div className="form-group">
                            <label>Device / OS</label>
                            <input type="text" name="device" value={formData.device} onChange={handleChange} required placeholder="e.g. iPhone 15" disabled={isSubmitting} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Steps to Reproduce</label>
                        <textarea name="steps" value={formData.steps} onChange={handleChange} required placeholder="1. Open app...&#10;2. Click button..." rows="3" disabled={isSubmitting}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Image Link (Optional)</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." disabled={isSubmitting} />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>Cancel</button>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : (initialData ? 'Update Bug' : 'Submit Bug')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBugModal;
