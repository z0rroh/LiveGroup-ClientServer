import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import PropTypes from 'prop-types';


const PRIVATE_ROOT = '/anuncios';
const PUBLIC_ROOT = '/auth/login';


const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component;

  if (props.isAuthenticated) {
    //User is Authenticated
    if (isPrivate === true) {
      //If the route is private the user may proceed.
      return <Route { ...props } component={ component } />;
    }
    else {
      //If the route is public, the user is redirected to the app's private root.
      return <Redirect to={ PRIVATE_ROOT } />;
    }
  }
  else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }
    else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired,
  isAuthenticated: PropTypes.bool
};

const stateToProps = ({ auth }) => ({
  //isFetching: auth.isFetching,
  isAuthenticated: auth.isAuthenticated
})



export default connect(stateToProps)(AuthRoute)
