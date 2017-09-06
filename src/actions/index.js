import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SORT_DATE = 'DATE'
export const SORT_SCORE = 'VOTE_SCORE'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

export const fetchPosts = () => dispatch => (
  ReadableAPI.fetchAllPosts()
  .then(posts => dispatch(receivePosts(posts)))
)

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
  .then((res) => dispatch(removePost(res)))
)

export const removePost = post => ({
  type: DELETE_POST,
  post
})

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
