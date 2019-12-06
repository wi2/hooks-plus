import { State } from './interfaces'

function useWi2Methods([valueOrState, setOrDispatch]: State[] | any[], methods: any[] = []): State[] | any[] {
  return [
    valueOrState,
    setOrDispatch,
    ...methods.map(helper => (...args: any[]): void => helper(valueOrState, setOrDispatch, [...args])),
  ]
}

export default useWi2Methods