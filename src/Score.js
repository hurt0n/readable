import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions'

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
    votePost: (vote, postId) => dispatch(Actions.votePost(vote, postId)),
    voteComment: (vote, commentId) => dispatch(Actions.voteComment(vote, commentId))
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
