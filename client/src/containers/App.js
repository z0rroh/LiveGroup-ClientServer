import React, { Component } from 'react';
import './App.css';
import { Switch, Route,  Redirect, withRouter } from 'react-router-dom'
import Login from '../Components/Login/Login.js'
import AnunciosApp from '../Components/Anuncios/AnunciosApp.js'
import TurnoApp from '../Components/Turnolog/TurnoApp.js'
import PerfilApp from '../Components/User/PerfilApp.js'
import AdminPanelApp from '../Components/AdminPanel/AdminPanelApp.js'
import AuthorizedRoute from '../AuthorizedRoute.js'
import UnauthorizedLayout from '../Components/Layouts/UnauthorizedLayout.js'
import PrimaryLayout from '../Components/Layouts/PrimaryLayout.js'

const Routes = () => (
  <main>
    <Switch>
      <Route path="/auth" component={UnauthorizedLayout} />
      <AuthorizedRoute path="/" component={PrimaryLayout} />
      <Redirect to="/auth" />
    </Switch>
  </main>
)



class App extends Component {

  render() {
    return (
      <div className="App">
        <Routes/>
      </div>
    );
  }
}

export default App;
