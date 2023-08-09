const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');


const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('todo_test', 'postgres', 'Akul', {
  host: 'localhost',
  dialect: 'postgres'
});

const List = sequelize.define('List', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

List.hasMany(Task);
Task.belongsTo(List);

sequelize.sync();

app.get('/lists', async (req, res) => {
  const lists = await List.findAll({ include: Task });
  res.json(lists);
});

app.post('/lists', async (req, res) => {
  const { title } = req.body;
  const newList = await List.create({ title });
  res.json(newList);
});

app.post('/tasks', async (req, res) => {
  const { title, listId } = req.body;
  const newTask = await Task.create({ title, ListId: listId });
  res.json(newTask);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
