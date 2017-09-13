import React, { Component } from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import { withRouter } from 'react-router-dom'

import * as Actions from './actions'

/**
* @description form used to create and update comment for post
*/

class CommentForm extends Component {

  comment = null

  constructor(props) {
    super()
    this.comment = props.comment
  }

  handleSubmit = (e) => {
    const values = serializeForm(e.target, {hash: true})
    e.preventDefault()
    values['timestamp'] = Date.now()
    values['id'] = Date.now()+''
    values['parentId'] = this.props.post.id
    values['deleted'] = false
    this.props.addComment(values)
  }

  handleEdit = (e) => {
    const values = serializeForm(e.target, {hash: true})
    e.preventDefault()
    this.props.editComment({...this.comment, ...values})
  }

  render() {
    return this.postId ? (
      <div>je comment</div>
    ) : (
    <div>
      <h2 className='mui--text-headline'>{this.comment ? 'Edit this comment' : 'Add new comment'}</h2>
      <form onSubmit={this.comment ? this.handleEdit : this.handleSubmit}>
        <div className='mui-textfield'>
          <input type='text' name='body' placeholder='Body' defaultValue={this.comment ? this.comment.body : ''}/>
        </div>
        <div className='mui-textfield'>
          <input type='text' name='author' placeholder='Author' defaultValue={this.comment ? this.comment.author : ''}/>
        </div>
        <button className='mui-btn mui-btn--primary'>add comment</button>
      </form>
    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.posts.filter(post => post.id == ownProps.match.params.path)[0]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(Actions.addComment(comment)),
    editComment: (comment) => dispatch(Actions.editComment(comment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm))
