// frontend/src/components/TaskForm.js
import React, { useState } from 'react';
import '../styles/App.css';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault(); // מונע רענון של הדף
    
    // וולידציה בסיסית [cite: 100]
    if (!title.trim()) return;

    // קריאה לפונקציה שקיבלנו מ-App.js
    onAdd({ title, description, priority });

    // איפוס הטופס אחרי השליחה
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      
      <div className="form-group">
        <input 
          type="text" 
          placeholder="Task Title *" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <textarea 
          placeholder="Task Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>

      <div className="form-group row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit" className="submit-btn">Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;