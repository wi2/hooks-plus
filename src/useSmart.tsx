
import { useRef, useEffect } from 'react'

const SMART_TIME = 100

function useSmart(options: any, state: any, dispatch: any): any {
  const multiDispatch = useRef({ state, dispatch: () => { } })

  useEffect(() => {
    multiDispatch.current.dispatch = options.smart(dispatch, options.smartTime || SMART_TIME)
  }, [])

  useEffect(() => {
    multiDispatch.current.state = state
  }, [state])

  return multiDispatch.current
}

export default useSmart