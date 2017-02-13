import { ACTION_TYPES } from './action-types'
const initialState = { count: 0, fetchResult: [] }

export const reducer = (state = initialState, action) => {
  console.warn(action.type)
  switch (action.type) {
    case ACTION_TYPES.INCREASE: return { count: state.count + 1 }
    case ACTION_TYPES.DECREASE: return { count: state.count - 1 }
    case ACTION_TYPES.FETCH_TEST_JSON_SUCCEEDED:
      return Object.assign({}, state, { fetchResult: action.fetchResult })

    case ACTION_TYPES.FETCH_TEST_JSON_FAILED:
      return Object.assign({}, state, { error: action.error })
    default: {
      return state
    }
  }
}
