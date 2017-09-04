import { createSelector } from 'reselect'

const getPosts = state => state.appReducer.posts
const getSorting = state => state.sorting

/*
  sorting of default list of posts regards to voteScore
*/
function compareScore(a, b) {
  let comparisson = 0;
  if (a.voteScore < b.voteScore) {
    comparisson = 1
  } else if (a.voteScore > b.voteScore) {
    comparisson = -1
  }
  return comparisson
}

export const getSortedPosts = createSelector(
  [getPosts, getSorting],
  (posts, sorting) => {
    const {sortBy, sortType} = sorting
    switch (sortBy) {
      case 'DATE':
        if (sortType == 'ASC') {
          return posts.sort((a,b) => {return a.timestamp < b.timestamp})
        } else if(sortType == 'DESC') {
          return posts.sort((a,b) => {return a.timestamp > b.timestamp})
        }
      break;
      case 'VOTE_SCORE':
        if (sortType == 'ASC') {
          return posts.sort(compareScore)
        } else if(sortType == 'DESC') {
          return posts.sort(compareScore).reverse()
        }
      break;
    }
  }
)
