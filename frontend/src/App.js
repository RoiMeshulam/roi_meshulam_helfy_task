import React, { useState, useEffect } from 'react';
import { fetchTasks } from './services/api';
import './styles/App.css'; // נכין את הקובץ הזה בהמשך
import TaskList from './components/TaskList';


function App() {
  // ניהול ה-State המרכזי של האפליקציה [cite: 76]
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // משיכת הנתונים בטעינה הראשונית של הקומפוננטה [cite: 76, 78]
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []); // מערך ריק אומר שזה ירוץ רק פעם אחת ב-mount

  // טיפול במצבי טעינה ושגיאות [cite: 79]
  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
      </header>

      <main>
        {/* בינתיים נדפיס את הנתונים גולמית כדי לוודא חיבור. 
            בהמשך נחליף את זה ב-<TaskList tasks={tasks} /> */}
        <TaskList
          tasks={tasks}
          onToggle={(id) => console.log('Toggle', id)}
          onDelete={(id) => console.log('Delete', id)}
          onEdit={(task) => console.log('Edit', task)}
        />
      </main>
    </div>
  );
}

export default App;