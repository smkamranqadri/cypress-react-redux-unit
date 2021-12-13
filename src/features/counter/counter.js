import React from 'react'

export function CounterComponent({ count, increment, decrement }) {
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          id="increment"
          onClick={() => increment()}
        >
          Increment
        </button>
        <span id="count">{count}</span>
        <button
          id="decrement"
          aria-label="Decrement value"
          onClick={() => decrement()}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}