let todos = [];
let nextId = 1;

const getTodos = (req, res) => {
  res.json(todos);
};

const createTodo = (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = { id: nextId++, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title !== undefined) {
    todo.title = title;
  }
  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex(todo => todo.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
