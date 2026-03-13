import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const TaskForm = ({ onAdd, onUpdate, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  // כש-editingTask משתנה (כלומר לחצו על Edit), נמלא את הטופס בנתונים שלו
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority);
    } else {
      // אם אין משימה בעריכה, נאפס את הטופס
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      // מצב עריכה
      onUpdate(editingTask.id, { title, description, priority });
    } else {
      // מצב יצירה
      onAdd({ title, description, priority });
    }

    // איפוס אחרי שליחה
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      
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
        <button type="submit" className="submit-btn">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        
        {/* כפתור ביטול שמופיע רק במצב עריכה */}
        {editingTask && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;