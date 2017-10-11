/*
* app first node
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TurnoApp from './Components/Turnolog/TurnoApp.js';
import AnunciosApp from './Components/Anuncios/AnunciosApp.js';
import PerfilApp from './Components/User/PerfilApp.js';
import AdminPanelApp from './Components/AdminPanel/AdminPanelApp.js'
import UsersDatatable from './Components/UsersDatatable/UsersDatatable.js'
import Login from './Components/Login/Login.js'


if (window.location.pathname === "/anuncios"){
  ReactDOM.render(<AnunciosApp />, document.getElementById('anunciosapp'));
}
if(window.location.pathname === "/turnos"){
  ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
}

if(window.location.pathname === "/perfil"){
  ReactDOM.render(<PerfilApp />,document.getElementById('perfilapp'))
}

if(window.location.pathname === "/administrar"){
  ReactDOM.render(<AdminPanelApp />,document.getElementById('adminpanelapp'))
}

if(window.location.pathname === "/group2"){
  ReactDOM.render(<Login/>,document.getElementById('usersdatatable'))
}
