import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {connect} from 'react-redux'

import * as Actions from './actions'

class PostForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    values['timestamp'] = Date.now()
    values['id'] = Date.now()
    values['category'] = 'React'
    values['voteScore'] = 1
    values['deleted'] = false
    console.log(values)
    this.props.pushPost(values)

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='mui-form'>
          <div className='mui-textfield'>
            <input type='text' name='title' placeholder='Title' />
          </div>
          <div className='mui-textfield'>
            <input type='text' name='body' placeholder='Body' />
          </div>
          <div className='mui-textfield'>
            <input type='text' name='owner' placeholder='Author' />
          </div>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushPost: (post) => dispatch(Actions.pushPost(post))
  }
}

 export default connect(state => state,mapDispatchToProps)(PostForm)
