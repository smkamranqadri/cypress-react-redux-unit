import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodos } from './todosStore'
import { TodosComponent } from './todos'

export function TodosContainer() {
  const todos = useSelector((state) => state.todos.all)
  const isLoading = useSelector((state) => state.todos.isLoading)
  const isError = useSelector((state) => state.todos.isError)
  const dispatch = useDispatch()

  return (
    <TodosComponent todos={todos} fetchTodos={() => dispatch(fetchTodos())} isLoading={isLoading} isError={isError} />
  )
}