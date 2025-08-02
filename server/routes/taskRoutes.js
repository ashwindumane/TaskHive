const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');
const authMiddleware = require('../middleware/authMiddleware'); // Add this import

const router = express.Router();
router.use(authMiddleware); // Now this will work
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;