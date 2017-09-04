import React, {Component} from 'react'
import {connect} from 'react-redux'

import {pretifyDate} from './utils/Helper'

class Comments extends Component {

  render() {
    const {comments} = this.props
    return(
      <div>
        {comments.map((comment) => (
          <div className='my-m' key={comment.id}>
            <span className='mr-s'>
              <span className="mui--text-dark-hint">Author:</span>
              {comment.author}
            </span>
            <span className='mr-s'>
              <span className="mui--text-dark-hint">Date:</span>
              {pretifyDate(comment.timestamp)}
            </span>
            <div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    )}
}

function mapStateToProps({comments}) {
  return {
    comments: comments.comments
  }
}

export default connect(mapStateToProps)(Comments)
