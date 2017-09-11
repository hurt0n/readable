import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {pretifyDate} from './utils/Helper'
import Comments from './Comments'
import * as Actions from './actions'
import Score from './Score'

class PostDetail extends Component {

  postId = null

  constructor(props) {
    super()
    this.postId = props.match.params.path
  }

  handleDelete = (postId) => {
    this.props.deletePost(postId)
    this.props.history.push('/')
  }

  render() {
    const { post } = this.props
    return post ? (
      <div>
        <h2 className='mui--text-headline'>Detail of Post</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <span className="mui--text-dark-hint mui--text-subhead">Title:</span>
              </td>
              <td>
                <span className="mui--text-dark mui--text-subhead">{post.title}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="mui--text-dark-hint mui--text-subhead">Body:</span>
              </td>
              <td>
                <span className="mui--text-dark mui--text-subhead">{post.body}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="mui--text-dark-hint mui--text-subhead">Author:</span>
              </td>
              <td>
                <span className="mui--text-dark mui--text-subhead">{post.author}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="mui--text-dark-hint mui--text-subhead">Date:</span>
              </td>
              <td>
                <span className="mui--text-dark mui--text-subhead">{pretifyDate(post.timestamp)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="mui--text-dark-hint mui--text-subhead">Vote score:</span>
              </td>
              <td>
                <span className="mui--text-dark mui--text-subhead"><Score postId={post.id} currentScore={post.voteScore} /></span>
              </td>
            </tr>
          </tbody>
        </table>
        <span className='mui-btn mui-btn--danger' onClick={() => this.handleDelete(post.id)}>Delete post</span>
        <span className='mui-btn mui-btn--primary' onClick={() => this.props.history.push(`/post-edit/${post.id}`)}>Edit post</span>
        <h2 className='mui--text-headline'>Comments to this post</h2>
        <Comments />
      </div>
    ) : <div>Loading</div>
  }
  componentDidMount() {
    this.props.fetchComments(this.postId)
  }

}

function mapStateToProps(state, ownProps) {
  return {
    post: state.appReducer.posts.filter(post => post.id == ownProps.match.params.path)[0]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (postId) => dispatch(Actions.fetchComments(postId)),
    deletePost: (postId) => dispatch(Actions.deletePost(postId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))
