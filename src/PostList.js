import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pretifyDate} from './utils/Helper'
import * as Actions from './actions'
import { getSortedPosts } from './selectors/SortSelector'
import { withRouter } from 'react-router-dom';

class PostList extends Component {

  handleClick(id) {
    this.props.history.push(`/post/${id}`)
  }

  render() {
    let {posts, category} = this.props
    const {sortPostsByDate, sortPostsByScore, sorting} = this.props
    if (category != null) {
      posts = posts.filter((post) => (post.category == category))
    }
    console.log('sorting: ', sorting)
    return (
      <div>
        <table className='mui-table post-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th><a href="#" onClick={() => sortPostsByDate(sorting.sortType)}>Timestamp</a></th>
              <th>Body</th>
              <th>Author</th>
              <th><a href="#" onClick={() => sortPostsByScore(sorting.sortType)}>Vote Score</a></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} onClick={() => this.handleClick(post.id)}>
                <td>{post.title}</td>
                <td>{pretifyDate(post.timestamp)}</td>
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
  return {
    sorting: state.sorting,
    posts: getSortedPosts(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortPostsByDate: (data) => dispatch(Actions.sortPostsByDate(data)),
    sortPostsByScore: (data) => dispatch(Actions.sortPostsByScore(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))
