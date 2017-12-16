import React, { Component } from 'react';
import Anuncios from './Anuncios.js'
import io from '../../io.js'

class AnunciosApp extends Component {

  componentDidMount(){

    io.socket.get('/anuncios/subscribe', function (res){
      console.log(res);
      console.log("Subscrito a anuncios");
    }.bind(this));

    io.socket.get('/comentario/subscribe', function () {
        console.log("Subscrito a comentarios");
    }.bind(this));
  }
  
  static isPrivate = false;

  render() {
    return (
      <Anuncios/>
    );
  }
}

export default AnunciosApp;
