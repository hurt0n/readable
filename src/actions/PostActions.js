import * as ReadableAPI from '../utils/ReadableAPI'
import * as CommentActions from './CommentActions'
import * as types from './types'

/*
  fetchPosts => addPosts
*/
export const fetchPosts = () => dispatch => {
  ReadableAPI.fetchAllPosts()
  .then(posts => {
    dispatch(receivePosts(posts))
    posts.map(post => {ReadableAPI.fetchComments(post.id)
    .then(comments => dispatch(CommentActions.receiveComments(comments)))
    })
  })
}
export const receivePosts = posts => ({
  type: types.RECEIVE_POSTS,
  posts
})

/*
  pushPost => addPost
*/
export const pushPost = (post) => dispatch => (
  ReadableAPI.addPost(post)
  .then(res => dispatch(addPost(res)))
)
export const addPost = function(post) {
  return  {
    type: types.ADD_POST,
    post
  }
}


/*
  deletePost => removePost
*/
export const deletePost = postId => dispatch => (
  ReadableAPI.deletePost(postId)
  .then(() => dispatch(removePost(postId)))
)
export const removePost = postId => ({
  type: types.DELETE_POST,
  postId
})

/*
  editPost => updatePost
*/
export const editPost = post => dispatch => (
  ReadableAPI.editPost(post)
  .then((postItem) => dispatch(updatePost(postItem)))
)
export const updatePost = post => ({
  type: types.EDIT_POST,
  post
})

/*
  votePost => scorePost
*/
export const votePost = (vote, postId) => dispatch => (
  ReadableAPI.votePost(vote, postId)
  .then(post => dispatch(scorePost(post)))
)
export const scorePost = (post) => ({
  type: types.VOTE_POST,
  post
})
