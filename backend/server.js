// backend/server.js
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasksRoutes');

const app = express();
const PORT = 4000; // Required port 

// Middleware 
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});