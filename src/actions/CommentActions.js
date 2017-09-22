import * as ReadableAPI from '../utils/ReadableAPI'
import * as TYPE from './types'

/*
  fetchComments => receiveComments
*/
export function fetchComments(postId) {
  return function(dispatch) {
    ReadableAPI.fetchComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
  }
}
export const receiveComments = comments => ({
    type: TYPE.RECEIVE_COMMENTS,
    comments
})

/*
  fetchComment => receiveComment
*/
export const fetchComment = commentId => dispatch => (
  ReadableAPI.fetchComment(commentId)
  .then(comment => dispatch(receiveComment(comment)))
)

export const receiveComment = comment => ({
  type: TYPE.RECEIVE_COMMENT,
  comment
})

/*
  removeComment => removeComment
*/
export const deleteComment = commentId => dispatch => (
  ReadableAPI.deleteComment(commentId)
  .then(() => dispatch(removeComment(commentId)))
)
export const removeComment = commentId => ({
  type: TYPE.DELETE_COMMENT,
  commentId
})

/*
  editComment => editComment
*/
export const editComment = comment => dispatch => (
  ReadableAPI.editComment(comment)
  .then((commentItem) => dispatch(updateComment(commentItem)))
)
export const updateComment = comment => ({
  type: TYPE.EDIT_COMMENT,
  comment
})

/*
  addComment => pushComment
*/
export const addComment = comment => dispatch => (
  ReadableAPI.addComment(comment)
  .then((commentItem) => dispatch(pushComment(commentItem)))
)
export const pushComment = comment => ({
  type: TYPE.ADD_COMMENT,
  comment
})

/*
  voteComment => scoreComment
*/
export const voteComment = (vote, commentId) => dispatch => (
  ReadableAPI.voteComment(vote, commentId)
  .then(comment => dispatch(scoreComment(comment)))
)
export const scoreComment = (comment) => ({
  type: TYPE.VOTE_COMMENT,
  comment
})
