import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  SORT_DATE,
  SORT_SCORE,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  SORT_COMMENT_DATE,
  SORT_COMMENT_SCORE,
  DELETE_COMMENT,
  EDIT_COMMENT,
  DELETE_POST,
  EDIT_POST,
  ADD_POST,
  VOTE_POST,
  VOTE_COMMENT
} from '../actions/types'

import {combineReducers} from 'redux'

const initialState = {
  posts: []
}

const initialSortState = {
  sortBy: 'VOTE_SCORE',
  sortType: 'ASC',
  comments: {
    sortBy: 'VOTE_SCORE',
    sortType: 'ASC'
  }
}

function sorting (state = initialSortState, action) {
  let {sortType} = action
  if (sortType == 'ASC') {
    sortType = 'DESC'
  } else if(sortType == 'DESC') {
    sortType = 'ASC'
  }

  switch (action.type) {
    case SORT_DATE:
      return {
        ...state,
        sortBy: SORT_DATE,
        sortType: sortType
      }
    case SORT_SCORE:
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
      case SORT_COMMENT_DATE:
      return {
        ...state,
        comments: {
          sortBy: SORT_DATE,
          sortType: sortType
        }
      }
      case SORT_COMMENT_SCORE:
      return {
        ...state,
        comments: {
          sortBy: SORT_SCORE,
          sortType: sortType
        }
      }
    default:
      return state
    }
}

function categories (state = [], action) {
  const {categories} = action

  switch (action.type) {
    case RECEIVE_CATEGORIES:
    return state.concat(categories)
    default:
      return state
  }
}

function posts (state = initialState, action) {
  const {posts, post, postId, comments, commentId, comment} = action

  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: posts.map((item) => {
          return {
            ...item,
            comments: []
          }
        })
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((item, index) => ({
          ...item,
          comments: comments[0] ?
          (comments[0].parentId == item.id ?
            comments
            : item.comments)
          : item.comments
        }))
      }
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(item => ({
          ...item,
          comments: item.comments.map(com => com.id == commentId ? {...com, deleted: true} : com)
        }))
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(item => ({
          ...item,
          comments: item.comments ? item.comments.concat([comment]) : new Array(comment)
        }))
      }
    case EDIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map(item => ({
          ...item,
          comments: item.comments.map(com => com.id == comment.id ? {...com, ...comment} : com)
        }))
      }
    case VOTE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(item => ({
          ...item,
          comments: item.comments.map(com => (com.id == comment.id) ? {...com, ...comment} : com)
        }))
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
  posts,
  categories,
  sorting
});
