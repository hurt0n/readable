import React, {Component} from 'react'
import PostList from './PostList'

class Category extends Component {

  render() {
    const category = this.props.match.params.path
    return (
      <div>
        {category}
        <PostList category={category} />
      </div>
    )
  }

}
 export default Category
