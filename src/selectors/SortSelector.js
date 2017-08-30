import { createSelector } from 'reselect'

export const getPosts = (state) => {
  const {posts, sortBy, sortType} =  state
  switch (sortBy) {
    case 'DATE':
      if (sortType == 'ASC') {
        return posts.sort((a,b) => {return a.timestamp < b.timestamp})
      } else if(sortType == 'DESC')
        return posts.sort((a,b) => {return a.timestamp > b.timestamp})
      break;
    default:
      return posts
  }
}

export const makeGetPostsState = createSelector(
  [ getPosts ],
  (posts) => ({posts})
)
