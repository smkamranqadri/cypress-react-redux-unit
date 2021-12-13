import { createSlice as createStore } from '@reduxjs/toolkit';
import { call, takeEvery, put } from 'redux-saga/effects';

import { API } from '../../constants';
import http from '../../utils/http';

const initialState = {
  all: [],
  isLoading: false,
  isError: false,
};

export const todosStore = createStore({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodos: (state) => {
      state.isLoading = true;
    },
    fetchedTodos: (state, action) => {
      state.all = action.payload;
      state.isLoading = false;
    },
    failedFetchedTodos: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.todos = [];
    },
  },
});

export const { fetchTodos, fetchedTodos, failedFetchedTodos } =
  todosStore.actions;

export function* fetchTodosSaga() {
  try {
    let result = yield call(() =>
      http({
        url: API.todos,
      })
    );
    yield put(fetchedTodos(result.data));
  } catch (e) {
    yield put(failedFetchedTodos());
  }
}

export function* todosSaga() {
  yield takeEvery(fetchTodos, fetchTodosSaga);
}
