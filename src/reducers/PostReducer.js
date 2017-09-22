import {
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  DELETE_POST,
  EDIT_POST,
  ADD_POST,
  VOTE_POST,
  VOTE_COMMENT
} from '../actions/types'

const initialState = {
  posts: []
}

export default function posts (state = initialState, action) {
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
