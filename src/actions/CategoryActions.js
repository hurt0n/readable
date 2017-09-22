import * as ReadableAPI from '../utils/ReadableAPI'
import * as TYPE from './types'

/*
  fetchCategories => receiveCategories
*/
export const fetchCategories = () => dispatch => (
  ReadableAPI.fetchCategories()
  .then(categories => dispatch(receiveCategories(categories.categories)))
)
export const receiveCategories = categories => ({
  type: TYPE.RECEIVE_CATEGORIES,
  categories
})
