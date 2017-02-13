import { createSelector } from 'reselect'


const countSelector = createSelector(
  state => state.mainReducer.count,
  count => count
)
const fetchResultSelector = createSelector(
  state => state.mainReducer.fetchResult,
  data => data
)

const selector = createSelector(
  countSelector,
  fetchResultSelector,
  (count, fetchResult) => ({ count, fetchResult })
)

export default selector
