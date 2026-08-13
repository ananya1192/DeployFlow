const taskService = require("../services/task.service");

function getTasks(req, res) {
  const tasks = taskService.getAllTasks();

  res.status(200).json(tasks);
}

function createTask(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }
  const task = taskService.createTask(title);
  res.status(201).json(task);
}

function updateTask(req, res) {
  const updatedTask = taskService.updateTask(
    req.params.id,
    req.body
  );

  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(updatedTask);
}

function deleteTask(req, res) {
  const deleted = taskService.deleteTask(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(204).send();
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};