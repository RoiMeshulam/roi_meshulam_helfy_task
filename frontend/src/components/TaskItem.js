// frontend/src/components/TaskItem.js
import React from 'react';
import '../styles/App.css'; // נשתמש בזה לעיצוב בהמשך

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const priorityClass = `priority-${task.priority}`;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <span className={`badge ${priorityClass}`}>{task.priority}</span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
      
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="task-footer">
        <label>
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id)} 
          />
          {task.completed ? 'Completed' : 'Mark as done'}
        </label>
        {/* שינוי קטן כאן: הוספנו קלאס ספציפי לתאריך */}
        <span className="task-date">{new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TaskItem;