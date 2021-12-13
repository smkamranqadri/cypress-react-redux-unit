import React from 'react';

import { CounterContainer } from './features/counter';
import { TodosContainer } from './features/todos';

import './App.scss';

function App() {
  return (
    <>
      <CounterContainer />
      <br/>
      <TodosContainer />
    </>
  );
}

export default App;
