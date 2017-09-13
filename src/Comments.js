import React, {Component} from 'react'
import {connect} from 'react-redux'

import {pretifyDate} from './utils/Helper'
import CommentForm from './CommentForm'
import Score from './Score'
import * as Actions from './actions'
import { getSortedComments } from './selectors/SortCommentsSelector'

/**
* @description list of all comments for specific post
*/

class Comments extends Component {

  comment = null

  handleClick = (commentId) => {
    this.comment = this.props.comments.filter(comment => comment.id == commentId)[0]
    this.forceUpdate()
  }

  render() {
    const {comments, deleteComment, sortCommentsByDate, sortCommentsByScore, sorting} = this.props
    return(
      <div className='comments-table'>
        <span className='link' onClick={() => sortCommentsByDate(sorting.sortType)}>Sort by date</span>
        <span className='link' onClick={() => sortCommentsByScore(sorting.sortType)}>Sort by score</span>
        {comments
          .filter((item) => item.deleted != true)
          .map((comment) => (
            <div className='my-m' key={comment.id} onClick={() => this.handleClick(comment.id)}>
              <span className='mr-s'>
                <span className="mui--text-dark-hint">Author:</span>
                {comment.author}
              </span>
              <span className='mr-s'>
                <span className="mui--text-dark-hint">Date:</span>
                {pretifyDate(comment.timestamp)}
              </span>
              <span className='mr-s'>
                <span className="mui--text-dark-hint">Score:</span>
                <Score commentId={comment.id} currentScore={comment.voteScore}/>
              </span>
              <span className='mui--pull-right delete mui--text-button' onClick={() => deleteComment(comment.id)}>Delete</span>
              <div>
                {comment.body}
              </div>
              {(this.comment == comment) ? (<CommentForm comment={comment} />) : ''}
            </div>
          ))}
        <CommentForm />
      </div>
    )}
}

function mapStateToProps(state, ownProps) {
  return {
    comments: getSortedComments(state, ownProps),
    sorting: state.sorting.comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (commentId) => dispatch(Actions.deleteComment(commentId)),
    sortCommentsByDate: (data) => dispatch(Actions.sortCommentsByDate(data)),
    sortCommentsByScore: (data) => dispatch(Actions.sortCommentsByScore(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
