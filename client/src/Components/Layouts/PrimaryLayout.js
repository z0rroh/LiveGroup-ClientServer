import React, {Component}  from 'react'
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import PrimaryHeader from '../Header/PrimaryHeader'
import AnunciosApp from '../Anuncios/AnunciosApp.js'
import TurnoApp from '../Turnolog/TurnoApp.js'
import PerfilApp from '../User/PerfilApp.js'
import SubLayout from '../Layouts/SubLayout'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import TypeRoute from '../../TypeRoute'
import {setUserAttribute} from '../../actions/auth'

const NotFound = ({props})=>{
  return(
    <section className="error-container">
      <div className="circle-container">
        <div className="errorStyles">
          <span>
            <span>4</span>
          </span>
          <span>0</span>
          <span>
            <span>4</span>
          </span>
          <h2>Page Not Found</h2>
        </div>
      </div>
  </section>);}

class PrimaryLayout extends Component{

  static isPrivate = true;
  render(){
    const {match, history, user, setUserAttribute} = this.props;
    if(!user.group){
      return (<Redirect to="/noGroup/waiting"/>)
    }
    return(
      <div className="primary-layout">
        <PrimaryHeader history={history} user={user}/>
        <main>
          <Switch>
            <TypeRoute
              exact
              path={`${match.path}`}
              user={user}
              component={AnunciosApp}/>
            <TypeRoute
              exact
              setUserAttribute={setUserAttribute}
              path={`${match.path}perfil`}
              user={user}
              component={PerfilApp}/>
            <TypeRoute
              exact
              path={`${match.path}anuncios`}
              user={user}
              component={AnunciosApp}/>
            <TypeRoute
              exact
              path={`${match.path}turnos`}
              user={user}
              setUserAttribute={setUserAttribute}
              component={TurnoApp}/>
            <TypeRoute
              path={`${match.path}administrar`}
              user={user}
              component={SubLayout}/>
            <TypeRoute
              user={user}
              component={NotFound}/>
          </Switch>
        </main>
      </div>
    );
  }



}

PrimaryLayout.propTypes = {
  user: PropTypes.object.isRequired
};

const stateToProps = ({ auth }) => ({
  //isFetching: auth.isFetching,
  user: auth.user
})

const mapDispatchToProps = (dispatch) =>{
  return {
    setUserAttribute: (param, value) => dispatch(setUserAttribute(param, value)),
  }
}


export default withRouter(connect(stateToProps, mapDispatchToProps)(PrimaryLayout))
