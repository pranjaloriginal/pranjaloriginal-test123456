import React from 'react';

export default function TaskListItem({ task, onEdit, onDelete, onToggleComplete }) {
  const labelClass = task.completed ? 'completed' : '';
  return (
    <li className="task-list-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
        aria-label="Toggle Complete"
      />
      <span className={labelClass} onClick={onEdit} title="Edit this task">
        {task.title}
      </span>
      {task.description && <span className="desc"> &ndash; {task.description}</span>}
      {task.dueDate && <span className="due"> (Due: {task.dueDate})</span>}
      <button className="edit-btn" onClick={onEdit} title="Edit">✏️</button>
      <button className="delete-btn" onClick={onDelete} title="Delete">🗑️</button>
    </li>
  );
}
