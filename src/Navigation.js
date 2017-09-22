import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class Navigation extends Component {
  render() {
    const {categories} = this.props
    return (
      <div className='nav'>
        <span>Navigation:</span>
        <Link className='mui-btn mui-btn--flat mui-btn--primary' to='/'>Home Screen</Link>
        {
          categories[0] ? (
            categories.map(cat => (
              <Link key={cat.name}
                className='mui-btn mui-btn--flat mui-btn--primary'
                to={/category/+cat.path}>{cat.name}</Link>
            ))
          ) : (<span>loading</span>)
        }
      </div>
    )
  }
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps)(Navigation))
