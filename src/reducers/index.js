import {
  RECEIVE_CATEGORIES,
} from '../actions/types'

import {combineReducers} from 'redux'
import posts from './PostReducer'
import sorting from './SortReducer'

function categories (state = [], action) {
  const {categories} = action

  switch (action.type) {
    case RECEIVE_CATEGORIES:
    return state.concat(categories)
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  sorting
});
