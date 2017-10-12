import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class PrimaryHeader extends Component{
  constructor(){
    super();
  }

  render(){
    const user = this.props.user;
    return(
      <header>
        <div className="line col-lg-12"> </div>
        <div className="Header col-lg-12">
          <div className="box col-lg-11">
            <div className="row box between-lg middle-lg">
              <div className="Logo col-lg-4">
                <div className="Header-img-logo" >
                  <img src="/images/newLogo.png" alt="some"/>
                </div>
                <div className="Header-img">
                  <img src="/images/logo11.png" alt="some"/>
                </div>
              </div>

              <div className="User col-lg-4 col-lg-offset-3">
                <div className="box">
                  <div className="row">
                    <div className="no-padding col-lg-10">
                      <a className="User-name dropdown-button">{user.name}</a>
                      <p className="User-empresa">{user.groupName}</p>
                    </div>
                    <div className="User-image"><img src={"/images/avatars/"+user.user_image}/></div>
                  </div>
                </div>
              </div>
              <div className="Logout">
                <a title="Cerrar Sesion" href="/session/destroy" className="material-icons profile">power_settings_new</a>
              </div>
            </div>
          </div>
        </div>

        <nav className="Nav col-lg-12">
          <ul className="Nav-Items row center-lg">
            <div className="Nav-Item">
              <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/perfil'>Perfil</NavLink></li>
            </div>
            <div className="Nav-Item">
              <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/anuncios'>Anuncios</NavLink></li>
            </div>
            <div className="Nav-Item">
              <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/turnos'>Turnos</NavLink></li>
            </div>
            <div className="Nav-Item">
              <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/administrar'>Administrar</NavLink></li>
            </div>
          </ul>
        </nav>

      </header>
    );
  }



}

const stateToProps = ({ auth }) => ({
  user: auth.user,
})



export default connect(stateToProps)(PrimaryHeader)
