import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom'

class PrimaryHeader extends Component{
  constructor(){
    super();
  }

  render(){

    return(
      <header>
        <nav>
          <ul>
            <li><NavLink to='/perfil' activeClassName="active">PERFIL</NavLink></li>
            <li><NavLink to='/anuncios' activeClassName="active">ANUNCIOS</NavLink></li>
            <li><NavLink to='/turnos' activeClassName="active">TURNOS</NavLink></li>
            <li><NavLink to='/administrar' activeClassName="active">ADMINISTRAR</NavLink></li>
          </ul>
        </nav>
      </header>
    );
  }



}

export default PrimaryHeader;
