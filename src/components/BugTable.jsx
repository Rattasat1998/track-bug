import StatusBadge from './StatusBadge';
import StatusSelect from './StatusSelect';
import InlineEdit from './InlineEdit';
import './BugTable.css';

const BugTable = ({ bugs, onEdit, onUpdate }) => {
    return (
        <div className="table-container">
            <table className="bug-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Issue Title</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assignee</th>
                        <th>Device/OS</th>
                        <th>Steps to Reproduce</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bugs.map((bug) => (
                        <tr key={bug.id}>
                            <td className="bug-id">{bug.id}</td>
                            <td className="bug-title">
                                <InlineEdit
                                    value={bug.title}
                                    onChange={(val) => onUpdate(bug.id, 'title', val)}
                                />
                            </td>
                            <td>
                                <StatusSelect
                                    type="priority"
                                    value={bug.priority}
                                    onChange={(val) => onUpdate(bug.id, 'priority', val)}
                                />
                            </td>
                            <td>
                                <StatusSelect
                                    type="status"
                                    value={bug.status}
                                    onChange={(val) => onUpdate(bug.id, 'status', val)}
                                />
                            </td>
                            <td>
                                <div className="assignee-container">
                                    <div className="assignee-avatar">
                                        {bug.assignee.charAt(0)}
                                    </div>
                                    <InlineEdit
                                        value={bug.assignee}
                                        onChange={(val) => onUpdate(bug.id, 'assignee', val)}
                                    />
                                </div>
                            </td>
                            <td>{bug.device}</td>
                            <td className="bug-steps">
                                <ol>
                                    {bug.steps.split('. ').map((step, i) => (
                                        (step.trim().length > 0) && <li key={i}>{step.replace(/^\d+\.\s*/, '')}</li>
                                    ))}
                                </ol>
                            </td>
                            <td>
                                {bug.image && bug.image !== '-' ? (
                                    <a href="#" className="view-link">View</a>
                                ) : (
                                    <span className="text-muted">-</span>
                                )}
                            </td>
                            <td>
                                <button className="edit-btn" onClick={() => onEdit(bug)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BugTable;
