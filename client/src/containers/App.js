import React, { Component } from 'react';
import './App.css';
import { Switch, Route,  Redirect, withRouter } from 'react-router-dom'
import AuthorizedRoute from '../AuthorizedRoute.js'
import UnauthorizedLayout from '../Components/Layouts/UnauthorizedLayout.js'
import PrimaryLayout from '../Components/Layouts/PrimaryLayout.js'
import ToastList from './ToastList/ToastList.js'
import { connect } from 'react-redux'

const Routes = () => {

  return(
    <main>
      <ToastList/>
      <Switch>
        <Route path="/auth" component={UnauthorizedLayout} />
        <AuthorizedRoute path="" component={PrimaryLayout} />
      </Switch>
    </main>)

}



class App extends Component {
  render() {

    return (
      <div className="App">
        <Routes/>
      </div>
    );
  }
}

export default App
