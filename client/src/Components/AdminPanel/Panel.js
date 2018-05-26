import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom'

class Panel extends Component {

  render(){
    const match = this.props.match;
    return(
        <nav className="main-menu row col-xs-12">
            <ul className="row col-xs-12">
              <li className="col-xs-12">
                <NavLink className="navLinkSub row col-xs-12" to={`${match.path}/agregar`} exact activeClassName="navLinkSubActive">
                  <div className="row col-xs-12 col-lg-4 middle-xs">
                    <i className="fa fa-plus-circle fa-2x nav-icon col-xs-12"></i>
                  </div>
                  <div className="row col-xs-12 col-lg-8 start-lg">
                    <span className="nav-text col-xs-12">Agregar Usuarios</span>
                  </div>
                </NavLink>
              </li>
              <li className="col-xs-12">
                <NavLink className="navLinkSub row col-xs-12" to={`${match.path}/grupo`} exact activeClassName="navLinkSubActive">
                  <div className="row col-xs-12 col-lg-4 middle-xs">
                    <i className="fa fa-users fa-2x nav-icon col-xs-12"></i>
                  </div>
                  <div className="row col-xs-12 col-lg-8 start-lg">
                    <span className="nav-text col-xs-12">Listar Grupo</span>
                  </div>
                </NavLink>
              </li>
              <li className="col-xs-12">
                <NavLink className="navLinkSub row col-xs-12" to={`${match.path}/turnos/crear`} activeClassName="navLinkSubActive">
                  <div className="row col-xs-12 col-lg-4 middle-xs">
                    <i className="fa fa-calendar fa-2x nav-icon col-xs-12"></i>
                  </div>
                  <div className="row col-xs-12 col-lg-8 start-lg">
                    <span className="nav-text col-xs-12">Crear Turnos</span>
                  </div>
                </NavLink>
              </li>
              <li className="col-xs-12">
                <NavLink className="navLinkSub row col-xs-12" to={`${match.path}/turnos/buscar`} activeClassName="navLinkSubActive">
                  <div className="row col-xs-12 col-lg-4 middle-xs">
                    <i className="fa fa-list-alt fa-2x nav-icon col-xs-12"></i>
                  </div>
                  <div className="row col-xs-12 col-lg-8 start-lg">
                    <span className="nav-text col-xs-12">Listar Turnos</span>
                  </div>
                </NavLink>
              </li>
            </ul>
        </nav>
    );
  }

}

export default withRouter(Panel)
