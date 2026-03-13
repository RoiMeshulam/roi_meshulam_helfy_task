import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, deleteTask, toggleTaskCompletion, updateTask } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // הסטייט החדש ששומר איזו משימה אנחנו עורכים כרגע
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async (newTaskData) => {
    try {
      const createdTask = await createTask(newTaskData);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (err) {
      console.error("Failed to add task:", err);
      alert("Error adding task.");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Error deleting task.");
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const updatedTask = await toggleTaskCompletion(id);
      setTasks((prevTasks) => prevTasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      console.error("Failed to toggle task:", err);
      alert("Error updating task status.");
    }
  };

  // הפונקציה החדשה שמטפלת בעדכון
  const handleUpdateTask = async (id, updatedData) => {
    try {
      const updatedTask = await updateTask(id, updatedData);
      setTasks((prevTasks) => prevTasks.map(task => task.id === id ? updatedTask : task));
      setEditingTask(null); // יציאה ממצב עריכה אחרי ההצלחה
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Error updating task.");
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; 
  });

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <TaskForm 
          onAdd={handleAddTask} 
          onUpdate={handleUpdateTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {/* רכיב הסינון החדש שלנו */}
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

        {/* מעבירים את המערך המסונן במקום המקורי */}
        <TaskList 
          tasks={filteredTasks} 
          onToggle={handleToggleTask} 
          onDelete={handleDeleteTask} 
          onEdit={(task) => setEditingTask(task)} 
        />
      </main>
    </div>
  );
}

export default App;