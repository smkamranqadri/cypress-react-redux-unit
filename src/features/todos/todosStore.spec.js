import { runSaga } from 'redux-saga';

import {
  todosStore,
  fetchTodos,
  fetchedTodos,
  fetchTodosSaga,
} from './todosStore';
import { API } from '../../constants';

describe('Todos Store', () => {
  describe('Todos Store Actions', () => {
    it('should test fetchTodos action.', () => {
      const actionReturnValue = fetchTodos();
      expect(actionReturnValue.type).to.equal('todos/fetchTodos');
    });

    it('should test fetchedTodos action.', () => {
      const actionReturnValue = fetchedTodos();
      expect(actionReturnValue.type).to.equal('todos/fetchedTodos');
    });
  });

  describe('Todos Store Reducer', () => {
    const initialState = {
      all: [],
      isLoading: false,
      isError: false,
    };

    const todos = ['Test 1', 'Test 2', 'Test 3'];

    it('should return initial state', () => {
      const reducerReturnValue = todosStore.reducer(undefined, {});
      expect(reducerReturnValue).to.deep.equal(initialState);
    });

    it('should return isLoading true and isError false from state on fetchTodo action', () => {
      const type = 'todos/fetchTodos';
      const action = { type };
      const reducerReturnValue = todosStore.reducer(initialState, action);
      expect(reducerReturnValue.isLoading).to.be.true;
      expect(reducerReturnValue.isError).to.be.false;
    });

    it('should return isLoading false, isError false and example todos from state on fetchedTodo action', () => {
      const type = 'todos/fetchedTodos';
      const action = { type, payload: todos };
      const reducerReturnValue = todosStore.reducer(initialState, action);
      expect(reducerReturnValue.isLoading).to.be.false;
      expect(reducerReturnValue.isError).to.be.false;
      expect(reducerReturnValue.all).to.be.equal(todos);
    });

    it('should return isLoading false, isError true and empty todos from state on failedFetchedTodo action', () => {
      const type = 'todos/failedFetchedTodos';
      const action = { type };
      const reducerReturnValue = todosStore.reducer(initialState, action);
      expect(reducerReturnValue.isLoading).to.be.false;
      expect(reducerReturnValue.isError).to.be.true;
      expect(reducerReturnValue.all).to.be.deep.equal([]);
    });

    it('should return example todos from saga on fetchTodo action', async () => {
      cy.intercept(
        {
          method: 'GET',
          url: API.todos,
        },
        todos
      ).as('getTodos');

      const dispatched = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchTodosSaga
      ).toPromise();

      expect(dispatched[0].type).to.be.equal('todos/fetchedTodos');
      expect(dispatched[0].payload).to.be.deep.equal(todos);
    });
  });
});
