import { useState } from 'react'
import useWi2Methods, { useSmart } from '../useWi2Methods'

const SMART_TIME = 500

function useWi2State(initialValue: any, options: any = {}, methods: any[] = []): any[] {
  if (!options.smart) {
    return useWi2Methods(useState(initialValue), methods)
  }

  const [value, setState] = useState(initialValue)
  const smart = useSmart(options, value, () => { setState(smart.state) })

  const smartSetState = (newValue: any, withSmart = true) => {
    if (withSmart) {
      smart.value = newValue
      smart.dispatch()
    } else {
      setState(newValue)
    }
  }
  return useWi2Methods([value, smartSetState], methods)
}

export default useWi2State
