// backend/controllers/taskController.js

// In-memory data storage 
let tasks = [
    {
        id: 1,
        title: "Initial Task",
        description: "This is a sample task to test the API",
        completed: false,
        createdAt: new Date(),
        priority: "medium" // 'low' | 'medium' | 'high' [cite: 30]
    }
];

// GET /api/tasks - get all tasks
const getTasks = (req, res) => {
    res.status(200).json(tasks);
};

// POST /api/tasks - Create a new task
const createTask = (req, res) => {
    const { title, description, priority } = req.body;

    // Basic validation [cite: 40]
    if (!title || !priority) {
        return res.status(400).json({ message: "Title and priority are required" });
    }

    const newTask = {
        id: Date.now(), // Unique number ID [cite: 25]
        title,
        description: description || "",
        completed: false,
        createdAt: new Date(), 
        priority
    };

    tasks.push(newTask);
    res.status(201).json(newTask); // 201 Created [cite: 41, 110]
};

// PUT /api/tasks/:id Update a task
const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, priority } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    // Update fields
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description !== undefined ? description : tasks[taskIndex].description,
        priority: priority || tasks[taskIndex].priority
    };

    res.status(200).json(tasks[taskIndex]);
};

// DELETE /api/tasks/:id - Delete a task
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks = tasks.filter(t => t.id !== taskId);
    res.status(200).json({ message: "Task deleted successfully" });
};

// PATCH /api/tasks/:id/toggle - Toggle task completion status
const toggleTaskCompletion = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    res.status(200).json(tasks[taskIndex]);
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
};