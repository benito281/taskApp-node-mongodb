const router = require('express').Router();
const {
    taskAdd,
    viewTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controllers');

router.get('/tasks', viewTask);
router.post('/add-task', taskAdd);
router.put('/:id/update-task',updateTask);
router.delete('/:id/delete-task',deleteTask)


module.exports = router;