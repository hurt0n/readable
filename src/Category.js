import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PostList from './PostList'

/**
* @description Page which contains posts from specific category
*/

class Category extends Component {

  render() {
    const category = this.props.match.params.path
    return (
      <div>
        <h2 className='mui--text-headline'>All posts from category: {category}</h2>
        <PostList category={category} />
        <Link className='mui-btn mui-btn--primary' to={'/post-form'}>Create Post</Link>
      </div>
    )
  }
}

export default Category
