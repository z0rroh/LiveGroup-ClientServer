import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router'



class commonUser extends Component {

  static isPrivate = false;
  render() {
      return (
        <div>
          <h4>WHOOPS!</h4><p>No te encuentras en ningun grupo de trabajo, vuelve en otro momento</p>
       </div>)
  }

}

export default commonUser
