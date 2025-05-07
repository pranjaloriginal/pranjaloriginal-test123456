import React from 'react';
import TaskListItem from './TaskListItem';

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) return <p>No tasks.</p>;
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskListItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onToggleComplete={() => onToggleComplete(task)}
        />
      ))}
    </ul>
  );
}
