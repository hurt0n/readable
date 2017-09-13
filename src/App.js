import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Route, Link} from 'react-router-dom'
import PostForm from './PostForm'
import PostList from './PostList'
import Category from './Category'
import PostDetail from './PostDetail'
import { withRouter } from 'react-router-dom';

import * as Actions from './actions'
import './App.css';

class App extends Component {

  render() {
    const {categories} = this.props
    return (
        <div className="mui-container">
          <Route path='/' exact render={() => (
            <div className="">
              <h2 className='mui--text-headline'>Posts</h2>
              <PostList />
              <Link className='mui-btn mui-btn--primary' to={'/post-form'}>Create Post</Link>
              <div>
                <h2 className='mui--text-headline'>Categories</h2>
                <div>
                  {categories[0] ? (
                    categories.map((cat) => (
                    <Link key={cat.name} className='mui-btn mui-btn--raised' to={/category/+cat.path}>{cat.name}</Link>
                  ))) : (<div>loading</div>)}
                </div>
              </div>
            </div>
          )} />
          <Route path='/post-form' render={() => (
            <PostForm />
          )} />
          <Route path='/post-edit/:path' render={() => (
            <PostForm />
          )} />
          <Route path='/category/:path' component={Category} />
          <Route path='/post/:path' component={PostDetail} />
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

function mapStateToProps({categories}) {
  return {
    categories: categories
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
