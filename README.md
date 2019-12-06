# @wi2/hooks-plus
Extends useReducer and useState with common helper methods

**Advantages**
- easy to use
- easy to test
- DRY principles (Don't repeat yourself)


## Install

```
npm install @wi2/hooks-plus
```


## How to use it?

### 1/ With useReducer
```jsx
import { useReducer } from '@wi2/hooks-plus'

const initial = {
  count: 0,
}

function reducer(state, { type, value } = {}) {
  switch (type) {
    case 'ADD': return { count: state.count + value }
    case 'REMOVE': return { count: state.count - value }
    case 'RESET':
    default: return 0 // reset
  }
}

// common method helpers to attach
function methodAdd(state, dispatch, value) {
  dispatch({ type: 'ADD', value })
}

function methodReset(state, dispatch) {
  dispatch({ type: 'RESET' })
}


function MyComponent() {
  // initialize reducer with helper method
  const [state, dispatch, add, reset] = useReducer(reducer, initial, [methodAdd, methodReset])

  return (
    <>
      <div>Count: {state.count}</div>
      <button onClick={() => add(1)}>Add 1</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

```

### 2/ With useState
```jsx
import { useState } from '@wi2/hooks-plus'


// method helpers
function methodAdd(count, setValue, value) {
  setValue(count + value)
}

function methodReset(count, setValue) {
  setValue(0)
}


function MyComponent() {
  // initialize reducer with helper method
  const [value, setValue, add, reset] = useState(0, [methodAdd, methodReset])

  return (
    <>
      <div>Count: {state.count}</div>
      <button onClick={() => add(1)}>Add 1</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

```
