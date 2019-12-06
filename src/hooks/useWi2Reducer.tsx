import { useReducer } from 'react'

import useWi2Methods from '../useWi2Methods'
import { State } from '../interfaces'

function useWi2Reducer(reducer: any, initialForm: State, methods: any[] = [], init?: any): State[] | any[] {
  return useWi2Methods(useReducer(reducer, initialForm, init), methods)
}

export default useWi2Reducer
