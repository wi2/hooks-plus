import { useReducer } from 'react'

import useMethods from '../useMethods'
import useSmart from '../useSmart'

import { State } from '../interfaces'

function useSmartReducer(reducer: any, initialForm: State, options: any = {}, methods: any[] = [], init?: any): State[] | any[] {
  if (!options.smart) {
    return useMethods(useReducer(reducer, initialForm, init), methods)
  }

  const [state, dispatch] = useReducer((s: State, a: any) => a.smart || reducer(s, a), initialForm, init)
  const smart = useSmart(options, state, () => { dispatch({ smart: smart.state }) })

  const smartDispatch = (actions: any, withSmart = true) => {
    if (withSmart) {
      smart.state = reducer(smart.state, actions)
      smart.dispatch()
    } else {
      dispatch(actions)
    }
  }
  return useMethods([state, smartDispatch], methods)
}

export default useSmartReducer
