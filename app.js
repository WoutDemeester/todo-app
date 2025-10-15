const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let todos = [
  { id: 1, task: 'Learn Jenkins', done: false },
  { id: 2, task: 'Build CI/CD pipeline', done: false }
];

app.get('/', (req, res) => {
  res.send('Todo API is running 🚀');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = { id: Date.now(), task: req.body.task, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(3000, () => {
  console.log('✅ Todo API running on port 3000');
});
