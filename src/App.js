import React, { useState } from 'react';
import './index.css'; // Ensure Tailwind CSS is imported

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    setTasks(tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    ));
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map((t, i) =>
        i === editingIndex ? { ...t, text: editText } : t
      ));
      setEditingIndex(null);
      setEditText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mr-2"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="bg-orange-500 text-white rounded-lg px-4 py-2"
          >
            Add
          </button>
        </div>

        {editingIndex !== null ? (
          <div className="mb-4 flex">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mr-2"
              placeholder="Edit task"
            />
            <button
              onClick={saveEdit}
              className="bg-green-500 text-white rounded-lg px-4 py-2"
            >
              Save
            </button>
          </div>
        ) : null}

        <ul>
          {tasks.map((t, index) => (
            <li
              key={index}
              className={`flex items-center mb-2 p-2 border border-gray-300 rounded-lg ${
                t.completed ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTaskCompletion(index)}
                className="mr-2"
              />
              <span className={`flex-1 ${t.completed ? 'line-through text-gray-500' : ''}`}>
                {t.text}
              </span>
              <button
                onClick={() => startEditing(index)}
                className="text-orange-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => removeTask(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
