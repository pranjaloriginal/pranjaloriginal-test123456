import React from 'react';

export default function FilterControls({ filter, setFilter }) {
  return (
    <div className="filter-controls">
      <button
        onClick={() => setFilter('all')}
        className={filter === 'all' ? 'active' : ''}
      >All</button>
      <button
        onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'active' : ''}
      >Completed</button>
      <button
        onClick={() => setFilter('incomplete')}
        className={filter === 'incomplete' ? 'active' : ''}
      >Incomplete</button>
    </div>
  );
}
