import React, { Component } from 'react';
import './App.css';
import { Switch, Route,  Redirect, withRouter } from 'react-router-dom'
import AuthRoute from '../AuthorizedRoute.js'
import PrimaryLayout from '../Components/Layouts/PrimaryLayout.js'
import ToastList from './ToastList/ToastList.js'
import { connect } from 'react-redux'
import Login from '../Components/Login/Login'
import Loading from 'react-loading-components';

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
    setTimeout(() => this.setState({ isFetch: false }), 1000);
  }

  render() {
      const isFetch = this.state.isFetch;
      return (
        isFetch ?
        (<div className="ContainerLoader">
          <div className="LoaderPosition">
            <div><Loading type='circles' width={110} height={110} fill='#fff'/></div>

          </div>
        </div>) :
        (<div className="App">
          <ToastList/>
          <Switch>
            <AuthRoute
              path="/auth"
              component={Login}/>
            <AuthRoute
              path="/"
              component={PrimaryLayout}/>
          </Switch>
        </div>)
      );
  }
}

export default App
