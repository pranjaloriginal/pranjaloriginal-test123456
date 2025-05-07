import React, { useEffect, useReducer, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterControls from './components/FilterControls';
import { loadTasksFromStorage, saveTasksToStorage } from './utils/storage';
import './App.css';

const initialState = [];

function tasksReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.tasks;
    case 'ADD':
      return [...state, action.task];
    case 'UPDATE':
      return state.map(t => t.id === action.task.id ? action.task : t);
    case 'DELETE':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialState);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const persisted = loadTasksFromStorage();
    dispatch({ type: 'LOAD', tasks: persisted });
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  function handleAdd(task) {
    dispatch({ type: 'ADD', task });
  }
  function handleEdit(task) {
    setEditingTask(task);
  }
  function handleUpdate(updated) {
    dispatch({ type: 'UPDATE', task: updated });
    setEditingTask(null);
  }
  function handleDelete(id) {
    if (confirm('Delete this task?')) {
      dispatch({ type: 'DELETE', id });
    }
  }
  function handleToggleComplete(task) {
    dispatch({ type: 'UPDATE', task: { ...task, completed: !task.completed } });
  }

  let filteredTasks = tasks;
  if (filter === 'completed')
    filteredTasks = tasks.filter(t => t.completed);
  else if (filter === 'incomplete')
    filteredTasks = tasks.filter(t => !t.completed);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TaskForm
        key={editingTask ? editingTask.id : 'add'}
        onSubmit={editingTask ? handleUpdate : handleAdd}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      <FilterControls filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}
