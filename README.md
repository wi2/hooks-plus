# @wi2/hooks-plus
Extends React.useReducer and React.useState with :
- mixins method attach
- smart rendering

**Motivation**
- **very light**: around 1kB gzip / extenal dependencies: react
- **performant**: with smart dispatch/setState method: Attach debounce/throttle or other methods to manage rendering
- add **mixins method** with this specifications:
  - reduce/remove duplicate code:
    - method you can share between different useReducer (and/or setState)
    - method you can attach easily to an useReducer (and/or a setState)
  - method you can create easily
  - method with access to `state` and `dispatch` for `useReducer` (or with access to `value` and `setValue` for `useState`)
  - method that you can pass one or more personalize params


## Install

```
npm install @wi2/hooks-plus
```




## How to use it?

same use than the react with 2 more parameters: 
`useReducer(reducer, initial, options, [mixin methods])`
*options:*
- smart: to add debounce, throttle or other library methods
ex: `smart: lodash.debounce`
- smartTime: time related to smart behaviour (default: 100)


`import { useReducer, useState } from '@wi2/hooks-plus'`

```js
const [
    state,
    dispatch,
    reset, // mixins method
    fullname, // mixins method
    send, // mixins method
  ] = useReducer(reducer, initialValue, options, [resetMixin, fullnameMixin, sendMixin]) // attach mixins here

// use mixins: (don't need to pass state, or dispatch (but you have access in your mixin. See example below)
// reset()
// send()
// fullname('John', 'Doe')
```


### 3 example of mixins method: 

```jsx
function resetMixin(state, dispatch) {
  dipatch({ type: 'reset' })
}
function fullnameMixin(state, dispatch, firsname, lastname) {
  dipatch({ user: { fullname: `${firsname} ${lastname}` } })
}
function sendMixin(state, dispatch) {
  dipatch({ type: 'pending' })
  fetch("/setUser", {
    method: "POST",
    body: state.user
  })
}

```

### How to use the 3 mixin methods in your components with useReducer
```jsx
function myComponent() {
  const [
    state,
    dispatch,
    // here you have access to mixin methods added 
    // the order is important: it means you can specify the name you want for every methods here 
    // but follow the same order than the attach method
    reset,
    fullname,
    send,
  ] = useReducer({}, {}, [
    // here attach own methods (the order is important)
    resetMixin,
    fullnameMixin,
    sendMixin,
  ])

  return (
    <form>
      ...
      <button onClick={reset}> Reset </button>
      <button onClick={send}> Send </button>
      <button onClick={() => fullname('John', 'Doe')}> Set default fullname </button>
    </form>
  )
}
```
you don't need to pass state and dispatch when you call the method. This params are passed automaticly

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
  const [state, dispatch, add, reset] = useReducer(reducer, initial, { smart: lodash.debounce }, [methodAdd, methodReset])

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
  const [value, setValue, add, reset] = useState(0, { smart: lodash.throttle, smartTime: 1000 }, [methodAdd, methodReset])

  return (
    <>
      <div>Count: {state.count}</div>
      <button onClick={() => add(1)}>Add 1</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

```
