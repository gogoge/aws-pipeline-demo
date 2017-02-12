import { ACTION_TYPES } from './action-types'
export const actionCreators = {
  increase: () => ({ type: ACTION_TYPES.INCREASE }),
  decrease: () => ({ type: ACTION_TYPES.DECREASE }),
}
