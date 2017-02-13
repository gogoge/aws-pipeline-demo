import { createSelector } from 'reselect'

const countSelector = createSelector(
  state => state.mainReducer.count,
  count => count
)

export default countSelector
