import React from 'react';

export function TodosComponent({ todos, fetchTodos, isLoading, isError }) {
  return (
    <div>
      <div>
        <button
          aria-label="Fetch Todos"
          id="fetchTodos"
          onClick={() => fetchTodos()}
        >
          Fetch Todos
        </button>
        {isLoading ? <p>Loading ...</p> : isError && <p>Something went wrong!</p>}
        {!isLoading && <ul id="todos">
          {todos.map((todo, index) => (
            <li key={index} id={`todo-${index}`}>
              {todo.title}
            </li>
          ))}
        </ul>}
      </div>
    </div>
  );
}
