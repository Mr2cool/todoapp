import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  time: string;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, time: new Date().toLocaleTimeString() }]);
      setNewTodo('');
    }
  };

  const toggleCompleted = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)' }}>
      <div className="max-w-7xl mx-auto p-4 pt-6 bg-white bg-opacity-50">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full p-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
        >
          Add Todo
        </button>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`text-gray-600 hover:text-gray-900 ${filter === 'all' ? 'font-bold' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`text-gray-600 hover:text-gray-900 ${filter === 'active' ? 'font-bold' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`text-gray-600 hover:text-gray-900 ${filter === 'completed' ? 'font-bold' : ''}`}
          >
            Completed
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="p-2 text-left">Task</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos().map(todo => (
              <tr key={todo.id}>
                <td className={`p-2 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</td>
                <td className="p-2">{todo.time}</td>
                <td className="p-2">
                  {todo.completed ? (
                    <span className="text-green-500">Completed ✔️</span>
                  ) : (
                    <span className="text-red-500">Not Completed ❌</span>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => toggleCompleted(todo.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    {todo.completed ? 'Undo' : 'Done'}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoApp;