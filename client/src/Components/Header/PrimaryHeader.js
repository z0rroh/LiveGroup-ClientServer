import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Header'

class PrimaryHeader extends Component{
  constructor(){
    super();
  }

  render(){
    const {user, history} = this.props;
    return(
      <header>
        <div className="line col-lg-12"> </div>
        <Header
          history={history}
          user={user} />

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
