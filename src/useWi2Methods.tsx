
import { useRef, useEffect } from 'react'

import { State } from './interfaces'

const SMART_TIME = 100

export function useSmart(options: any, state: any, dispatch: any): any {
  const multiDispatch = useRef({ state, dispatch: () => { } })

  useEffect(() => {
    multiDispatch.current.dispatch = options.smart(dispatch, options.smartTime || SMART_TIME)
  }, [])

  useEffect(() => {
    multiDispatch.current.state = state
  }, [state])

  return multiDispatch.current
}

function useWi2Methods([valueOrState, setOrDispatch]: State[] | any[], methods: any[] = []): State[] | any[] {
  return [
    valueOrState,
    setOrDispatch,
    ...methods.map(helper => (...args: any[]): void => helper(valueOrState, setOrDispatch, [...args])),
  ]
}

export default useWi2Methods