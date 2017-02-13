import { ACTION_TYPES } from './action-types'
export const actionCreators = {
  asyncLoad: () => ({ type: ACTION_TYPES.ASYNC_LOAD }),
  increase: () => ({ type: ACTION_TYPES.INCREASE }),
  decrease: () => ({ type: ACTION_TYPES.DECREASE }),
}
