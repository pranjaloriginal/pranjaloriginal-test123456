import React, { useState, useEffect } from 'react';

const initialFields = { title: '', description: '', dueDate: '' };

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const isEditing = !!editingTask;
  const [fields, setFields] = useState(initialFields);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      setFields({
        title: editingTask.title || '',
        description: editingTask.description || '',
        dueDate: editingTask.dueDate || '',
      });
    } else {
      setFields(initialFields);
    }
  }, [isEditing, editingTask]);

  function handleInput(e) {
    const { name, value } = e.target;
    setFields(v => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!fields.title.trim()) {
      setError('Title is required.');
      return;
    }
    setError('');
    const task = {
      id: isEditing ? editingTask.id : Date.now().toString(),
      title: fields.title.trim(),
      description: fields.description.trim() || undefined,
      dueDate: fields.dueDate || undefined,
      completed: isEditing ? editingTask.completed : false,
    };
    onSubmit(task);
    if (!isEditing) setFields(initialFields);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
      <div>
        <input
          name="title"
          value={fields.title}
          onChange={handleInput}
          placeholder="Task title *"
          autoFocus
        />
      </div>
      <div>
        <input
          name="description"
          value={fields.description}
          onChange={handleInput}
          placeholder="Description (optional)"
        />
      </div>
      <div>
        <input
          name="dueDate"
          type="date"
          value={fields.dueDate}
          onChange={handleInput}
          placeholder="Due date (optional)"
        />
      </div>
      {error && <div className="error">{error}</div>}
      <div>
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
        {isEditing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
