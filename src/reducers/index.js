import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  SORT_DATE,
  SORT_SCORE,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  DELETE_POST,
  EDIT_POST,
  ADD_POST,
  VOTE_POST,
  VOTE_COMMENT
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
  let {sortType} = action

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
  const {comment, commentId} = action
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const {comments} = action
      return {
        ...state,
        comments: comments
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(item => item.id == comment.id ? {...item, ...comment} : item)
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat([comment])
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(item => item.id == commentId ? {...item, deleted: true} : item)
      }
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(item => (item.id == comment.id) ? {...item, ...comment} : item)
      }
    default:
      return state
  }
}

function appReducer (state = initialState, action) {
  const {posts} = action
  const {post} = action
  const {postId} = action

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
      return {
        ...state,
        posts: state.posts.concat([post])
      }
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.map((item) => {
          if (item.id !== post.id) {
            return item
          }
          return {
            ...item,
            voteScore: post.voteScore
          }
        })
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.map((item) => {
          if (item.id !== postId) {
            return item
          }
          return {
            ...item,
            deleted: true
          }
        })
      }
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((item) => post.id === item.id ? {...item, ...post} : item)
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
