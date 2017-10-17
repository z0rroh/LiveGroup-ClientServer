import React, {Component}  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrimaryHeader from '../Header/PrimaryHeader'
import AnunciosApp from '../Anuncios/AnunciosApp.js'
import TurnoApp from '../Turnolog/TurnoApp.js'
import PerfilApp from '../User/PerfilApp.js'
import SubLayout from '../Layouts/SubLayout'
class PrimaryLayout extends Component{

  render(){
    const {match, history} = this.props;
    return(
      <div className="primary-layout">
        <PrimaryHeader history={history}/>
        <main>
          <Switch>
            <Route path={`${match.path}perfil`} component={PerfilApp} />
            <Route path={`${match.path}anuncios`} component={AnunciosApp} />
            <Route path={`${match.path}turnos`} component={TurnoApp} />
            <Route path={`${match.path}administrar`} component={SubLayout} />
            <Redirect to={`${match.url}`} />
          </Switch>
        </main>
      </div>
    );
  }



}


export default PrimaryLayout
