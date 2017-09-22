import * as ReadableAPI from '../utils/ReadableAPI'
import * as TYPE from './types'

export function sortCommentsByDate(sortType) {
  return {
    type: TYPE.SORT_COMMENT_DATE,
    sortType: sortType
  }
}

export function sortCommentsByScore(sortType) {
  return {
    type: TYPE.SORT_COMMENT_SCORE,
    sortType: sortType
  }
}

export function sortPostsByDate(sortType) {
  return {
    type: TYPE.SORT_DATE,
    sortBy: TYPE.SORT_DATE,
    sortType: sortType
  }
}
export function sortPostsByScore(sortType) {
  return {
    type: TYPE.SORT_SCORE,
    sortBy: TYPE.SORT_SCORE,
    sortType: sortType
  }
}
