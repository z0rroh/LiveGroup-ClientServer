import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { Switch, Route,  Redirect, withRouter } from 'react-router-dom'
import Login from '../Components/Login/Login.js'
import AnunciosApp from '../Components/Anuncios/AnunciosApp.js'
import TurnoApp from '../Components/Turnolog/TurnoApp.js'
import PerfilApp from '../Components/User/PerfilApp.js'
import AdminPanelApp from '../Components/AdminPanel/AdminPanelApp.js'
import AuthorizedRoute from '../Components/AuthorizedRoute/AuthorizedRoute.js'
import UnauthorizedLayout from '../Components/AuthorizedRoute/UnauthorizedLayout.js'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>PERFIL</Link></li>
        <li><Link to='/anuncios'>ANUNCIOS</Link></li>
        <li><Link to='/turnos'>TURNOS</Link></li>
        <li><Link to='/administrar'>ADMINISTRAR</Link></li>
      </ul>
    </nav>
    <main>hola</main>
  </header>
)

const Routes = () => (
  <main>
    <Switch>
      <Route path="/" component={UnauthorizedLayout} />
      <AuthorizedRoute path="/app" component={Header} />

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
