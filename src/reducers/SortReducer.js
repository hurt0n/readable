import {
  RECEIVE_CATEGORIES,
  SORT_DATE,
  SORT_SCORE,
  SORT_COMMENT_DATE,
  SORT_COMMENT_SCORE,
} from '../actions/types'

const initialSortState = {
  sortBy: 'VOTE_SCORE',
  sortType: 'ASC',
  comments: {
    sortBy: 'VOTE_SCORE',
    sortType: 'ASC'
  }
}

export default function sorting (state = initialSortState, action) {
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
