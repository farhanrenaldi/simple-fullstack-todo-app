import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState('all')
  const [count, setCount] = useState('0')

  const fetchTodosHandler = useCallback(async () => {
    const response = await fetch('http://localhost:3010/todos/');
    const data = await response.json();
    await setTodos(data);
    setCount(data.filter( function(item) { return item.isCompleted === false }).length);
  }, []);

  async function fetchTodosFilter(status) {
    const response = await fetch(`http://localhost:3010/todos?completed=${status}`)
    const data = await response.json()

    await setTodos(data);
  }

  async function addTodoHandler(addTodo) {
    await fetch('http://localhost:3010/todos/', {
      method: 'POST',
      body: JSON.stringify(addTodo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    todoRouter();
  }

  async function toggleStatusHandler(id) {
    await fetch(`http://localhost:3010/todos/${id}`, {
      method: 'PATCH'
    })
    todoRouter();
  }

  async function removeTodoHandler(id) {
    await fetch(`http://localhost:3010/todos/`, {
      method: 'DELETE'
    })

    todoRouter();
  }

  function todoRouter() {
    if(selected === 'all') fetchTodosHandler();
    if(selected === 'active') fetchTodosFilter('0');
    if(selected === 'completed') fetchTodosFilter('1');
  }

  useEffect(() => {
    fetchTodosHandler();
  }, [fetchTodosHandler]);

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodoHandler} />
      <section>
        {todos.length > 0 && <Todo todos={todos} completeTodo={toggleStatusHandler}/> }
        {todos.length === 0 && selected!== 'all' && <div className='none'>There's no item in {selected}</div>}
        {todos.length === 0 && selected === 'all' && <div className='none'>There's nothing to do</div>}
      </section>
      
      <ul className='filter-list'>
        <li>
          {count} items remaining
        </li>
        <li
        onClick={()=> { fetchTodosHandler(); setSelected('all') }}
        className={selected === 'all' ? 'selected' : ''}>
          All
        </li>
        <li
        onClick={()=> { fetchTodosFilter('0'); setSelected('active') }} 
        className={selected === 'active' ? 'selected' : ''}>
          Active
        </li>
        <li
        onClick={()=> { fetchTodosFilter('1'); setSelected('completed') }}
        className={selected === 'completed' ? 'selected' : ''}>
          Completed
        </li>
        <li
        onClick={() => { removeTodoHandler() }}
        className={'delete'}>
          Delete Completed
        </li>
      </ul>
    </>
  );
}

export default TodoList;
