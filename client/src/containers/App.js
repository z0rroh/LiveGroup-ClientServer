import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router-dom'
import AuthRoute from '../AuthorizedRoute.js'
import PrimaryLayout from '../Components/Layouts/PrimaryLayout.js'
import ToastList from './ToastList/ToastList.js'
import Login from '../Components/Login/Login'
import Loading from 'react-loading-components';
import noGroup from '../Components/NoGroup/noGroup'


class App extends Component {

  constructor(){
    super();
    this.state={
      isFetch: false
    }
  }

  componentDidMount(){
    this.setState({isFetch: true})
    setTimeout(() => this.setState({ isFetch: false }), 1000);

  }

  render() {
      const isFetch = this.state.isFetch;
      return (
        isFetch ?
        (<div className="ContainerLoader row col-xs-12 center-xs">
          <div className="LoaderPosition row middle-xs">
            <div><Loading type='circles' width={110} height={110} fill='#fff'/></div>
          </div>
        </div>) :
        (<div className="App ">
          <ToastList/>
          <Switch>
            <AuthRoute
              path="/auth"
              component={Login}/>
            <AuthRoute
              path="/noGroup"
              component={noGroup}/>
            <AuthRoute
              path="/"
              component={PrimaryLayout}/>
          </Switch>
        </div>)
      );
  }
}

export default App
