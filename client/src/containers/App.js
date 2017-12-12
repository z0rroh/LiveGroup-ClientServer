import React, { Component } from 'react';
import './App.css';
import { Switch, Route,  Redirect, withRouter } from 'react-router-dom'
import AuthRoute from '../AuthorizedRoute.js'
import UnauthorizedLayout from '../Components/Layouts/UnauthorizedLayout.js'
import PrimaryLayout from '../Components/Layouts/PrimaryLayout.js'
import ToastList from './ToastList/ToastList.js'
import { connect } from 'react-redux'
import Login from '../Components/Login/Login'

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class App extends Component {

  constructor(){
    super();
    this.state={
      isFetch: true
    }
  }

  componentDidMount(){
    this.setState({
      isFetch: false
    })
  }

  render() {
      const isFetch = this.state;
      return (
        <div className="App">
          <ToastList/>
          <Switch>
            <AuthRoute
              exact
              path="/auth/login"
              component={Login}/>
            <AuthRoute
              path="/"
              component={PrimaryLayout}/>
          </Switch>
        </div>
      );
  }
}

export default App
