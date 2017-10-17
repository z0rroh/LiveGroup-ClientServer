import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

class AuthorizedRoute extends React.Component {

  render() {
    console.log("AUTORIZADO");
    const { component: Component, isFetching, isAuthenticated, ...rest } = this.props
    console.log(isAuthenticated);
    return (
      <Route {...rest} render={props => {
        if (isFetching)
        return <div>Loading...</div>
        return isAuthenticated
          && <Component {...props} />

      }} />
    )
  }
}

const stateToProps = ({ auth }) => ({
  isFetching: auth.isFetching,
  isAuthenticated: auth.isAuthenticated
})



export default connect(stateToProps)(AuthorizedRoute)
