import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Route, Link} from 'react-router-dom'
import PostForm from './PostForm'
import PostList from './PostList'
import Category from './Category'

import * as Actions from './actions'
import './App.css';

class App extends Component {

  render() {
    const {posts, categories} = this.props
    console.log(this.props)
    return (
        <div className="mui-container">
          <Route path='/' exact render={() => (
            <div className="">
              <h2 className='mui--text-headline'>Posts</h2>
              <PostList />
              <div>
                <h2 className='mui--text-headline'>Categories</h2>
                <div>
                  {categories.map((cat) => (
                    <Link key={cat.name} to={/category/+cat.path}>{cat.name}</Link>
                  ))}
                </div>
                <Link className='mui-btn mui-btn--primary' to='post-form'>Create Post</Link>
              </div>
            </div>
          )} />
          <Route path='/post-form' render={() => (
            <PostForm />
          )} />
          <Route path='/category/:path' component={Category} />
        </div>
        );
      }
    componentDidMount() {
      this.props.fetchPosts()
      this.props.fetchCategories()
    }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(Actions.fetchPosts()),
    fetchCategories: () => dispatch(Actions.fetchCategories())

  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
