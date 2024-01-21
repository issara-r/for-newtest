const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push({ id: tasks.length + 1, task });
    res.status(201).json({ success: true, message: 'Task added successfully.' });
  } else {
    res.status(400).json({ success: false, message: 'Task cannot be empty.' });
  }
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { task } = req.body;
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index !== -1 && task) {
    tasks[index].task = task;
    res.json({ success: true, message: 'Task updated successfully.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid request or task not found.' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ success: true, message: 'Task deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
