// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
} = require('../controllers/taskController');

// Define routes based on requirements 
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTaskCompletion);

module.exports = router;