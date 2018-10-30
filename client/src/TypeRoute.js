import React from 'react';
import { Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';


//const PRIVATE_ROOT = '/anuncios';
const PUBLIC_ROOT = '/anuncios';


const TypeRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  const Component = component
  if (props.user.admin) {
      //If the user is admin, is redirected to any route.
    //  return <Route { ...props } component={ component } />;
      return <Route { ...props } render={ (routeProps) => (
        <Component { ...routeProps } { ...props } />
      )} />;
  }
  else {
    //User is not Admin
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }
    else {
      //If the route is public, is redirected to component.
      //return <Route { ...props } component={ component } />;
      return <Route { ...props } render={ (routeProps) => (
        <Component { ...routeProps } { ...props } />
      )} />;
    }
  }
};

TypeRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
};

export default TypeRoute
