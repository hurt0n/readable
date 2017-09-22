import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CommentActions from './actions/CommentActions'
import * as PostActions from './actions/PostActions'

/**
* @description Helper Component to maintain score with voting functionality
*/

class Score extends Component {

  render() {
    const { votePost, voteComment, currentScore, postId, commentId } = this.props
      return (
        <span>
          <span>{currentScore}</span>
          <span className='score' onClick={(e) => {
            e.stopPropagation()
            commentId ?
              voteComment({option:'upVote'}, commentId)
            : votePost({option:'upVote'}, postId)
          }}>+</span>

          <span className='score' onClick={(e) => {
            e.stopPropagation()
            commentId ?
              voteComment({option:'downVote'}, commentId)
            : votePost({option:'downVote'}, postId)
          }}>-</span>
        </span>
      )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (vote, postId) => dispatch(PostActions.votePost(vote, postId)),
    voteComment: (vote, commentId) => dispatch(CommentActions.voteComment(vote, commentId))
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
