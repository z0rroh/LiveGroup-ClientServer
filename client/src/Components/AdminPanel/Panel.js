import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, withRouter } from 'react-router-dom'

class Panel extends Component {
  constructor(){
    super();
  }


  render(){
    const match = this.props.match;
    return(
        <nav className="main-menu">
            <ul>
              <li>
                <NavLink className="navLinkSub" to={`${match.path}/agregar`} exact activeClassName="navLinkSubActive">
                  <i className="fa fa-plus-circle fa-2x nav-icon"></i><span className="nav-text">Agregar Usuarios</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinkSub" to={`${match.path}/grupo`} exact activeClassName="navLinkSubActive">
                  <i className="fa fa-users fa-2x nav-icon"></i><span className="nav-text">Listar Grupo</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinkSub" to={`${match.path}/turnos/crear`} activeClassName="navLinkSubActive">
                  <i className="fa fa-calendar fa-2x nav-icon"></i><span className="nav-text">Crear Turnos</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinkSub" to={`${match.path}/turnos/buscar`} activeClassName="navLinkSubActive">
                  <i className="fa fa-list-alt fa-2x nav-icon"></i><span className="nav-text">Listar Turnos</span>
                </NavLink>
              </li>
            </ul>
        </nav>
    );
  }

}

export default withRouter(Panel)
