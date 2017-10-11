import React, {Component}  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrimaryHeader from '../Header/PrimaryHeader'
import AnunciosApp from '../Anuncios/AnunciosApp.js'
import TurnoApp from '../Turnolog/TurnoApp.js'
import PerfilApp from '../User/PerfilApp.js'
import AdminPanelApp from '../AdminPanel/AdminPanelApp.js'

class PrimaryLayout extends Component{

  render(){
    const match = this.props.match;
    return(
      <div className="primary-layout">
        <PrimaryHeader/>
        <main>
          <Switch>
            <Route path={`${match.path}perfil`} component={PerfilApp} />
            <Route path={`${match.path}anuncios`} component={AnunciosApp} />
            <Route path={`${match.path}turnos`} component={TurnoApp} />
            <Route path={`${match.path}administrar`}  component={AdminPanelApp} />
            <Redirect to={`${match.url}`} />
          </Switch>
        </main>
      </div>
    );
  }



}


export default PrimaryLayout
