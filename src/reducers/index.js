import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  SORT_DATE
  } from '../actions'

const initialState = {
  posts: [],
  categories: [],
  orderType: 'ASC'
}

/*
  sorting of default list of posts regards to voteScore
*/
function compareScore(a, b) {
  let comparisson = 0;
  if (a.voteScore < b.voteScore) {
    comparisson = 1
  } else if (a.voteScore > b.voteScore) {
    comparisson = -1
  }
  return comparisson
}

function appReducer (state = initialState, action) {
  const {posts, sortBy, orderType} = action
  switch (action.type) {
    case RECEIVE_POSTS:
      posts.sort(compareScore)
      return {
        ...state,
        posts: posts
      }
    case RECEIVE_CATEGORIES:
      const {categories} = action
      return {
        ...state,
        categories: categories
      }
    case SORT_DATE:
      return {
        ...state,
        orderType: orderType
      }
    default:
      return state
  }
}

export default appReducer
