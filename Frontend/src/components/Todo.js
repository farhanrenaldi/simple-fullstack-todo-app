import React from 'react';

const Todo = ({ todos, completeTodo }) => {

  return todos.map((todo, index) => (
    <div
      className={todo.isCompleted ? 'todo-row complete' : 'todo-row'}
      key={index}
      onClick={() => completeTodo(todo.id)}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.todo}
      </div>
    </div>
  ));
};

export default Todo;
