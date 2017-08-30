import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from './actions'
import { makeGetPostsState } from './selectors/SortSelector'

class PostList extends Component {

  pretifyDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  }

  render() {
    let {posts, category} = this.props
    const {sortPostsByDate, orderType} = this.props
    if (category != null) {
      posts = posts.filter((post) => (post.category == category))
    }
    return (
      <div>
        <table className='mui-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th onClick={() => sortPostsByDate(orderType)}>Timestamp</th>
              <th>Body</th>
              <th>Author</th>
              <th>Vote Score</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{this.pretifyDate(post.timestamp)}</td>
                <td>{post.body}</td>
                <td>{post.author}</td>
                <td>{post.voteScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {

  console.log(state.orderType)
  let {posts, sortBy, orderType} =  state
  if (orderType == 'ASC') {
    posts = posts.sort((a,b) => {return a.timestamp < b.timestamp})
    orderType = 'DESC'
  } else if(orderType == 'DESC') {
    posts = posts.sort((a,b) => {return a.timestamp > b.timestamp})
    orderType = 'ASC'
  }
    console.log(posts[0])
  return {
    orderType: orderType,
    posts: posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortPostsByDate: (data) => dispatch(Actions.sortPostsByDate(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
