import { State } from './interfaces'

function useMethods([valueOrState, setOrDispatch]: State[] | any[], methods: any[] = []): State[] | any[] {
  return [
    valueOrState,
    setOrDispatch,
    ...methods.map(helper => (...args: any[]): void => helper(valueOrState, setOrDispatch, [...args])),
  ]
}

export default useMethods