import React, { Component } from 'react'
import { connect } from 'react-redux'

import {pretifyDate} from './utils/Helper'
import Comments from './Comments'
import * as Actions from './actions'

class PostDetail extends Component {

  postId = null

  constructor(props) {
    super()
    this.postId = props.match.params.path
  }

  render() {
    const { post, deletePost } = this.props
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
                <span className="mui--text-dark mui--text-subhead">{post.voteScore}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <span className='mui-btn mui-btn--primary' onClick={() => deletePost(post.id)}>Delete post</span>
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
    deletePost: (postId) => dispatch(Actions.deletePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
