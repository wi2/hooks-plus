import { useState } from 'react'

import useMethods from '../useMethods'
import useSmart from '../useSmart'

function useSmartState(initialValue: any, options: any = {}, methods: any[] = []): any[] {
  if (!options.smart) {
    return useMethods(useState(initialValue), methods)
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
  return useMethods([value, smartSetState], methods)
}

export default useSmartState
