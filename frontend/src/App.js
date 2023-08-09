import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar';

function App() {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const createList = async () => {
    if (newListTitle) {
      try {
        const response = await axios.post('http://localhost:5000/lists', { title: newListTitle });
        setLists([...lists, response.data]);
        setNewListTitle('');
      } catch (error) {
        console.error('Error creating list:', error);
      }
    }
  };

  const createTask = async () => {
    if (newTaskTitle && selectedList) {
      try {
        await axios.post('http://localhost:5000/tasks', { title: newTaskTitle, listId: selectedList });
        fetchLists();
        setNewTaskTitle('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleListClick = (listId) => {
    setSelectedList(listId);
  };

  const styles = {
    li: {
      display: "inline-flex",
      align: "center",
      padding: "20px 0 100px",
      margin: "10px",
      gap: "15px",
      flexwrap: "wrap"
    },
    hd: {
      textAlign: "center"
    },
    bt: {
      display: "block",
      margin: "-15px auto"
    }
  }
  

  return (
    <>
      <Navbar username="Akul" /*onLogout={handleLogout}*/ />
      <div className="container">
        <h1 style={styles.hd}>Task Board</h1>
        <div>
          <h2>Create a List</h2>
          <input
            type="text"
            placeholder="List title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            style={styles.hd}
          />
          <button onClick={createList}>Create List</button>
        </div>
        <div>
          <h2>Create a Task</h2>
          <input
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            style={styles.hd}
          />
          <select onChange={(e) => setSelectedList(e.target.value)}>
            <option value="" disabled>Select a list</option>
            {lists.map((list) => (
              <option key={list.id} value={list.id}>{list.title}</option>
            ))}
          </select>
          <button onClick={createTask}>Create Task</button>
        </div>
        <div>
          <h2>Lists</h2>
          <div style={styles.li}>
          {lists.map((list) => (
            <div key={list.id} className="list" onClick={() => handleListClick(list.id)}>
              <h3>{list.title}</h3>
              {list.Tasks.map((task) => (
                <p key={task.id} className="task">{task.title}</p>
              ))}
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
