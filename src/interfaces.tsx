// reducer
export interface Action {
  type?: string
  action?: object | undefined
}

export interface State { }

export interface Dispatch {
  (action: Action): void
}
