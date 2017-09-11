import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SORT_DATE = 'DATE'
export const SORT_SCORE = 'VOTE_SCORE'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const fetchPosts = () => dispatch => {
  ReadableAPI.fetchAllPosts()
  .then(posts => dispatch(receivePosts(posts)))
}


export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchCategories = () => dispatch => (
  ReadableAPI.fetchCategories()
  .then(categories => dispatch(receiveCategories(categories.categories)))
)

export const receiveCategories = categories => ({
  type:RECEIVE_CATEGORIES,
  categories
})

export function fetchComments(postId) {
  return function(dispatch) {
    ReadableAPI.fetchComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
  }
}

export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
})

export const pushPost = (post) => dispatch => (
  ReadableAPI.addPost(post)
  .then(res => dispatch(addPost(res)))
)

export const addPost = function(post) {
  return  {
    type: ADD_POST,
    post
  }
}

export const deletePost = postId => dispatch => (
  ReadableAPI.deletePost(postId)
  .then(() => dispatch(removePost(postId)))
)

export const removePost = postId => ({
  type: DELETE_POST,
  postId
})

export const editPost = post => dispatch => (
  ReadableAPI.editPost(post)
  .then((postItem) => dispatch(updatePost(postItem)))
)

export const updatePost = post => ({
  type: EDIT_POST,
  post
})

export const scorePost = (post) => ({
  type: VOTE_POST,
  post
})

export const votePost = (vote, postId) => dispatch => (
  ReadableAPI.votePost(vote, postId)
  .then(post => dispatch(scorePost(post)))
)

export const fetchComment = commentId => dispatch => (
  ReadableAPI.fetchComment(commentId)
  .then(comment => dispatch(receiveComment(comment)))
)

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

export const deleteComment = commentId => dispatch => (
  ReadableAPI.deleteComment(commentId)
  .then(() => dispatch(removeComment(commentId)))
)

export const removeComment = commentId => ({
  type: DELETE_COMMENT,
  commentId
})

export const editComment = comment => dispatch => (
  ReadableAPI.editComment(comment)
  .then((commentItem) => dispatch(updateComment(commentItem)))
)

export const updateComment = comment => ({
  type: EDIT_COMMENT,
  comment
})

export const addComment = comment => dispatch => (
  ReadableAPI.addComment(comment)
  .then((commentItem) => dispatch(pushComment(commentItem)))
)

export const pushComment = comment => ({
  type: ADD_COMMENT,
  comment
})

export const scoreComment = (comment) => ({
  type: VOTE_COMMENT,
  comment
})

export const voteComment = (vote, commentId) => dispatch => (
  ReadableAPI.voteComment(vote, commentId)
  .then(comment => dispatch(scoreComment(comment)))
)


export function sortPostsByDate(sortType) {
  console.log(sortType)
  return {
    type: SORT_DATE,
    sortBy: SORT_DATE,
    sortType: sortType
  }
}
export function sortPostsByScore(sortType) {
  return {
    type: SORT_SCORE,
    sortBy: SORT_SCORE,
    sortType: sortType
  }
}
