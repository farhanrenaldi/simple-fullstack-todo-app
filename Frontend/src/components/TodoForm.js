import React, { useEffect, useRef } from 'react';

function TodoForm(props) {

  const inputRef = useRef('');

  useEffect(() => {
    inputRef.current.focus();
  });

  async function handleSubmit(event) {
    await event.preventDefault();

    const addTodo = {
      todo: inputRef.current.value
    };
    await props.onSubmit(addTodo);
    inputRef.current.value = '';
  }

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
        <>
          <input
            placeholder='Add a todo'
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
    </form>
  );
}

export default TodoForm;
