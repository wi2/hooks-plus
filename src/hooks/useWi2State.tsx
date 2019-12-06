import { useState } from 'react'
import useWi2Methods from '../useWi2Methods'

function useWi2State(initialValue: any, methods: any[] = []): any[] {
  return useWi2Methods(useState(initialValue), methods)
}

export default useWi2State
