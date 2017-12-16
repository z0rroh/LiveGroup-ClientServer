import React, { Component } from 'react';
import Perfil from './Perfil.js'
import io from '../../io.js'

class PerfilApp extends Component {
  constructor(){
    super();

  }

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
