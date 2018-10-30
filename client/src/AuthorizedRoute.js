import React from 'react';
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import PropTypes from 'prop-types';


const PRIVATE_ROOT = '/anuncios';
const PUBLIC_ROOT = '/auth/login';


const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  const Component = component;
  if (props.isAuthenticated) {
    //User is Authenticated
    if (isPrivate === true) {
      //If the route is private the user may proceed.
      return <Route { ...props } render={ (routeProps) => (
        <Component { ...routeProps } { ...props } />
      )} />;

    }
    else {
      //If the route is public, the user is redirected to the app's private root.
        //console.log("esta autentificado, renderizar a /anuncios");
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
      return <Route render={ (routeProps) => (
        <Component { ...routeProps } { ...props } />
      )} />;
    }
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const stateToProps = ({ auth }) => ({
  //isFetching: auth.isFetching,
  user: auth.user,
  isAuthenticated: auth.isAuthenticated
})



export default connect(stateToProps)(AuthRoute)
