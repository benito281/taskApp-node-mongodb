const Task =  require('../models/task.model.js');
const taskOperation = {};

//Tasks
taskOperation.viewTask = async (req,res) => {
  try {
    const view = await Task.find();
    res.json(view);
  } catch (error) {
    console.log(error);
  }
}

//Add task
taskOperation.taskAdd = async (req,res) => {
  try {
    const { title, description } = req.body;
    const add = await new Task({ title,description }).save();
    res.json({icon: 'success', message: 'Task saved successfully'});
  } catch (error) {
    console.log(error);
  }
}

//Update task
taskOperation.updateTask = async (req,res) => {
  try {
    const { title,description } = req.body;
    const { id } = req.params;
    const update = await Task.findByIdAndUpdate(id, { title,description });
    res.json({icon: 'success', message:'Task updated successfully'});
  } catch (error) {
    console.log(error);
  }
}

//Delete task
taskOperation.deleteTask = async (req,res) => {
  try {
    const { id } = req.params;
    const deleteOneTask = await Task.findByIdAndDelete(id);
    res.json({icon: 'success',message: 'Task deleted successfully'});
  } catch (error) {
    console.log(error)
  }
}
module.exports = taskOperation;
