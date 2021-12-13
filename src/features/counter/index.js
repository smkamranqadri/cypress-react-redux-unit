import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { decrement, increment } from './counterStore'
import { CounterComponent } from './counter'

export function CounterContainer() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <CounterComponent count={count} increment={() => dispatch(increment())} decrement={() => dispatch(decrement())} />
  )
}