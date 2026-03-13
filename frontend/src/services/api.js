// frontend/src/services/api.js

// משיכת כתובת ה-API ממשתנה הסביבה שהגדרנו
const API_URL = process.env.REACT_APP_API_URL;

// GET: משיכת כל המשימות
export const fetchTasks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

// POST: יצירת משימה חדשה
export const createTask = async (taskData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

// PUT: עדכון משימה קיימת (לפי ID)
export const updateTask = async (id, taskData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

// DELETE: מחיקת משימה (לפי ID)
export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json(); // בבקאנד שלנו מוחזרת הודעת הצלחה
};

// PATCH: שינוי סטטוס הושלם/לא הושלם (Toggle)
export const toggleTaskCompletion = async (id) => {
    const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to toggle task status');
    return response.json();
};