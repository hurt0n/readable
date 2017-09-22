import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as PostActions from './actions/PostActions'

/**
* @description form used to create and edit specific post
*/

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
    const {post, categories} = this.props
    return (
      <div>
        <h2 className='mui--text-headline'>Create/Edit post</h2>
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
          <div className="mui-select" >
            <select name='category' defaultValue={post ? post.category : ''}>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
            <label>Select Example</label>
          </div>
          <button>Update</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.posts.filter(post => post.id == ownProps.match.params.path)[0],
    categories: state.categories
  }
}

 export default withRouter(connect(mapStateToProps, {...PostActions})(PostForm))
