import React, { Component } from 'react';
import Anuncios from './Anuncios.js'



class AnunciosApp extends Component {
  constructor(){
    super();

  }

  componentDidMount(){
    io.socket.get('/anuncios/subscribe', (res)=> {
      console.log(res);
      console.log("Subscrito a anuncios");
    })

    io.socket.get('/comentario/subscribe', ()=> {
        console.log("Subscrito a comentarios");
    })
  }

  render() {
    return (
      <Anuncios />
    );
  }
}

export default AnunciosApp;
