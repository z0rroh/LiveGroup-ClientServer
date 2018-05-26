import React, { Component } from 'react';
import Perfil from './Perfil.js'
import io from '../../io.js'

class PerfilApp extends Component {

  componentDidMount(){
    io.socket.get('/user/announce', ()=> {
    })
  }

  static isPrivate = false;

  render() {
    return (
      <Perfil/>
    );
  }
}

export default PerfilApp;
