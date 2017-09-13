import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pretifyDate} from './utils/Helper'
import * as Actions from './actions'
import { getSortedPosts } from './selectors/SortSelector'
import { withRouter } from 'react-router-dom';

import Score from './Score'

/**
* @description list of posts
*/

class PostList extends Component {

  handleClick(id) {
    this.props.history.push(`/post/${id}`)
  }

  render() {
    let {posts, category, fetchComments} = this.props
    const {sortPostsByDate, sortPostsByScore, sorting} = this.props
    if (category != null) {
      posts = posts.filter((post) => (post.category == category))
    }
    return (
      <div>
        <table className='mui-table post-table' >
          <thead>
            <tr>
              <th>Title</th>
              <th><span className='link' onClick={() => sortPostsByDate(sorting.sortType)}>Timestamp</span></th>
              <th>Body</th>
              <th>Author</th>
              <th>Comments</th>
              <th><span className='link' onClick={() => sortPostsByScore(sorting.sortType)}>Vote Score</span></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} onClick={() => this.handleClick(post.id)}>
                <td>{post.title}</td>
                <td>{pretifyDate(post.timestamp)}</td>
                <td>{post.body}</td>
                <td>{post.comments ? post.comments.filter(item => item.parentId == post.id).length : '-'}</td>
                <td>{post.author}</td>
                {/* <td>{post.voteScore}</td> */}
                <td><Score postId={post.id} currentScore={post.voteScore} /></td>
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
    posts: getSortedPosts(state).filter((item) => (!item.deleted))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortPostsByDate: (data) => dispatch(Actions.sortPostsByDate(data)),
    sortPostsByScore: (data) => dispatch(Actions.sortPostsByScore(data)),
    fetchComments: (postId) => dispatch(Actions.fetchComments(postId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))
