import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const C_USER = '/noGroup/waiting';
const A_USER = '/noGroup/newGroup';

const GroupTypeRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  if (props.user.admin) {
    //User is Authenticated
    if (isPrivate === true) {
      //If the route is private the user may proceed.
      return <Route { ...props } component={ component } />

    }
    else {
      //If the route is public, the user is redirected to the app's private root.
        return <Redirect to={ A_USER} />;
    }
  }
  else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ C_USER } />;
    }
    else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

GroupTypeRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired,
  user: PropTypes.object.isRequired
};

const stateToProps = ({ auth }) => ({
  //isFetching: auth.isFetching,
  user: auth.user
})


export default connect(stateToProps)(GroupTypeRoute)
