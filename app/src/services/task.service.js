let tasks = [];
let nextId = 1;

function getAllTasks() {
  return tasks;
}

function createTask(title) {
  const task = {
    id: nextId++,
    title,
    completed: false,
  };

  tasks.push(task);

  return task;
}

function updateTask(id, updates) {
  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return null;
  }

  if (updates.title !== undefined) {
    task.title = updates.title;
  }

  if (updates.completed !== undefined) {
    task.completed = updates.completed;
  }

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === Number(id));

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};