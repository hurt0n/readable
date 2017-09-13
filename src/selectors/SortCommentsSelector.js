import { createSelector } from 'reselect'

const getComments = function(state, props) {
    return state.posts.posts.filter(post => post.id == props.postId)[0].comments
}
const getSorting = state => state.sorting.comments

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

export const getSortedComments = createSelector(
  [getComments, getSorting],
  (comments, sorting) => {
    if (comments) {
      const {sortBy, sortType} = sorting
      switch (sortBy) {
        case 'DATE':
          if (sortType == 'ASC') {
            return comments.sort((a,b) => {return a.timestamp < b.timestamp})
          } else if(sortType == 'DESC') {
            return comments.sort((a,b) => {return a.timestamp > b.timestamp})
          }
        break;
        case 'VOTE_SCORE':
          if (sortType == 'ASC') {
            return comments.sort(compareScore)
          } else if(sortType == 'DESC') {
            return comments.sort(compareScore).reverse()
          }
        break;
      }
    } else {
      return []
    }
  }
)
