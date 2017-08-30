import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const SORT_DATE = 'SORT_DATE'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const receiveCategories = categories => ({
  type:RECEIVE_CATEGORIES,
  categories
})

export const fetchPosts = () => dispatch => (
  ReadableAPI.fetchAllPosts()
  .then(posts => dispatch(receivePosts(posts)))
)

export const fetchCategories = () => dispatch => (
  ReadableAPI.fetchCategories()
  .then(categories => dispatch(receiveCategories(categories.categories)))
)

export function sortPostsByDate(orderType) {
  return {
    type: SORT_DATE,
    orderType: orderType
  }
}
