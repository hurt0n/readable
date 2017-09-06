import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  SORT_DATE,
  SORT_SCORE,
  RECEIVE_COMMENTS,
  DELETE_POST,
  ADD_POST
  } from '../actions'

import {combineReducers} from 'redux'

const initialState = {
  posts: [],
  categories: [],
}

const initialSortState = {
  sortBy: 'VOTE_SCORE',
  sortType: 'ASC'
}

const initialCommentsState = {
  comments: []
}

function sorting (state = initialSortState, action) {
  let {sortBy, sortType} = action

  switch (action.type) {
    case SORT_DATE:
      if (sortType == 'ASC') {
        sortType = 'DESC'
      } else if(sortType == 'DESC') {
        sortType = 'ASC'
      }
      return {
        ...state,
        sortBy: SORT_DATE,
        sortType: sortType
      }
    case SORT_SCORE:
      if (sortType == 'ASC') {
        sortType = 'DESC'
      } else if(sortType == 'DESC') {
        sortType = 'ASC'
      }
      return {
        ...state,
        sortBy: SORT_SCORE,
        sortType: sortType
      }
      case RECEIVE_CATEGORIES:
      return {
        ...state,
        sortBy: SORT_SCORE,
        sortType: 'ASC'
      }
    default:
      return state
    }
}

function comments (state = initialCommentsState, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const {comments} = action
      return {
        ...state,
        comments: comments
      }
    default:
      return state
  }
}

function appReducer (state = initialState, action) {
  const {posts} = action

  switch (action.type) {
    case RECEIVE_POSTS:
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
    case ADD_POST:
      const {post} = action
      return {
        ...state,
        posts: state.posts.concat([post])
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (item.id !== post.id) {
            return item
          }
          return {
            ...item,
            deleted: post.deleted
          }
        })
      }
    default:
      return state
  }
}

export default combineReducers({
  appReducer,
  sorting,
  comments
});
