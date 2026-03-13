// frontend/src/components/TaskFilter.js
import React from 'react';
import '../styles/App.css';

const TaskFilter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="task-filter">
      <button 
        className={currentFilter === 'all' ? 'active' : ''} 
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button 
        className={currentFilter === 'active' ? 'active' : ''} 
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>
      <button 
        className={currentFilter === 'completed' ? 'active' : ''} 
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;