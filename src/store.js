import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import { counterStore } from './features/counter/counterStore';
import { todosStore, todosSaga } from './features/todos/todosStore';


let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    counter: counterStore.reducer,
    todos: todosStore.reducer,
  },
  middleware
});

sagaMiddleware.run(todosSaga);