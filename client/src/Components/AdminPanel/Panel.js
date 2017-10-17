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
                <NavLink className="navLinkSub" to={`${match.path}/grupo`} exact activeClassName="navLinkSubActive">
                  <i className="fa fa-users fa-2x nav-icon"></i><span className="nav-text">Grupo</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinkSub" to={`${match.path}/turnos`} activeClassName="navLinkSubActive">
                  <i className="fa fa-calendar fa-2x nav-icon"></i><span className="nav-text">Crear Turnos</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinkSub" to={`${match.path}/hola3`} activeClassName="navLinkSubActive">
                  <i className="fa fa-home fa-2x nav-icon"></i><span className="nav-text">Grupo</span>
                </NavLink>
              </li>
            </ul>
        </nav>
    );
  }

}

export default withRouter(Panel)
