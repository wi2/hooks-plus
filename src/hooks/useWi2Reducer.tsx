import { useReducer } from 'react'

import useWi2Methods, { useSmart } from '../useWi2Methods'
import { State } from '../interfaces'

const SMART_TIME = 100

function useWi2Reducer(reducer: any, initialForm: State, options: any = {}, methods: any[] = [], init?: any): State[] | any[] {
  if (!options.smart) {
    return useWi2Methods(useReducer(reducer, initialForm, init), methods)
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
  return useWi2Methods([state, smartDispatch], methods)
}

export default useWi2Reducer
