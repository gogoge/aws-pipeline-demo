import { ACTION_TYPES } from './action-types'
const initialState = { count: 0 }

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.INCREASE: return { count: state.count + 1 }
    case ACTION_TYPES.DECREASE: return { count: state.count - 1 }
    default: {
      return state
    }
  }
}
