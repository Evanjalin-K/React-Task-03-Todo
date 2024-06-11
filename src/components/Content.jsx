import React, { useState } from 'react';
import "./Content.css";

const Content = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateTodo = () => {
    if (newTodoName.trim() === '' || newTodoDescription.trim() === '') {
      alert('Please enter both todo name and description.');
      return;
    }

    const newTodo = {
      name: newTodoName,
      description: newTodoDescription,
      completed: false,
    };

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].name = newTodoName;
      updatedTodos[editIndex].description = newTodoDescription;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }

    setNewTodoName('');
    setNewTodoDescription('');
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleToggleStatus = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setNewTodoName(todos[index].name);
    setNewTodoDescription(todos[index].description);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className="content-container">
      <div className="filter">
        <div className="add-todo-card">
          {editIndex !== null ? (
            <>
              <input
                type="text"
                className='input-Todo'
                placeholder=" Todo Name"
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
              />
              <input
                className='input-Todo'
                type="text"
                placeholder=" Todo Description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                className='input-Todo'
                placeholder=" Todo Name"
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
              />
              <input
                className='input-Todo'
                type="text"
                placeholder=" Todo Description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
              />
            </>
          )}
          <button className='add-Todo' type="button" onClick={handleAddOrUpdateTodo}>
            {editIndex !== null ? 'Update Todo' : 'Add Todo'}
          </button>
          <div className='my-todos'>
            <div className='my-todo'>My Todos</div>
            <div className='filter-container'>
              <span className='filter-label'>Filter:</span>
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className={filterStatus === 'completed' ? 'completed' : filterStatus === 'pending' ? 'pending' : filterStatus === 'all' ? 'all' : ''}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>  
      </div>
      <div className="todo-list">
        <div className="display-cards">
          {todos.map((todo, index) => {
            if (
              filterStatus === 'all' ||
              (filterStatus === 'completed' && todo.completed) ||
              (filterStatus === 'pending' && !todo.completed)
            ) {
              return (
                <div className="todo-card" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">Name: {todo.name}</p>
                      <p className="card-text">Description: {todo.description}</p>
                      <div className="filter">
                        <span>Status: </span>
                        <select value={todo.completed ? 'completed' : 'pending'} onChange={() => handleToggleStatus(index)} className={todo.completed ? 'completed' : 'pending'}>
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      <div className='buttons'>
                        <button className='editButton' onClick={() => handleEditTodo(index)}>Edit</button>
                        <button className='deleteButton' onClick={() => handleDeleteTodo(index)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
