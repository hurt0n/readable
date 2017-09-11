import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as Actions from './actions'

class PostForm extends Component {

  postId = null

  constructor(props) {
    super()
    this.postId = props.match.params.path
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    values['timestamp'] = Date.now()
    values['id'] = Date.now()+''
    values['category'] = 'React'
    values['voteScore'] = 1
    values['deleted'] = false
    this.props.pushPost(values)
    this.props.history.push(`/post/${values.id}`);

  }

  handleEdit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    this.props.editPost({...this.props.post, ...values})
    this.props.history.push(`/post/${this.props.post.id}`);
  }

  render() {
    const {post} = this.props
    return (
      <div>
        <form onSubmit={post ? this.handleEdit : this.handleSubmit} className='mui-form'>
          <div className='mui-textfield'>
            <input type='text' name='title' placeholder='Title' defaultValue={post ? post.title : ''}/>
          </div>
          <div className='mui-textfield'>
            <input type='text' name='body' placeholder='Body' defaultValue={post ? post.body : ''} />
          </div>
          <div className='mui-textfield'>
            <input type='text' name='author' placeholder='Author' defaultValue={post ? post.author : ''} />
          </div>
          <button>Update</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.appReducer.posts.filter(post => post.id == ownProps.match.params.path)[0]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushPost: (post) => dispatch(Actions.pushPost(post)),
    editPost: (post) => dispatch(Actions.editPost(post))
  }
}

 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm))
