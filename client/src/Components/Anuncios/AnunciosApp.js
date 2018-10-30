import React, { Component } from 'react';
import Anuncios from './Anuncios.js'
import axios from 'axios'
import {io} from '../../io.js'
//import PropTypes from 'prop-types';

class AnunciosApp extends Component {

  constructor(){
    super()
      this.state = {
        anuncios: [],
        isFetching: false,
      };
  }

  componentDidMount(){
    io.socket.get('/anuncios/subscribe', function (res){
      console.log(res);
      console.log("Subscrito a anuncios");
    });
    io.socket.get('/comentario/subscribe', function (res){
        console.log(res);
        console.log("Subscrito a comentarios");
    });
    this.setState({isFetching:true});
    axios.get('/anuncios/getAnuncios')
    .then((response)=>{
      const anuncios = response.data;
      this.setState({isFetching: false, anuncios: anuncios})
    })
    .catch((err)=>{
      console.log(err);
    })
    io.socket.on('anuncio', function serverSentEvent(anuncio){

      if(anuncio.verb === "created"){
        var anuntio = anuncio.data;
        var autor = {
          name: anuntio.autor.name,
          id: anuntio.autor.id,
          user_img: anuntio.autor.user_img,
          providerId: anuntio.autor.providerId
        }
        let newAnuncio = {autor: autor, id: anuntio.id, text: anuntio.text, fecha: anuntio.fecha, comment: anuntio.comment}
        let newState = this.state.anuncios;
        newState.splice(0,0,newAnuncio)
        this.setState({anuncios: newState})
      }
    }.bind(this));
  }

  static isPrivate = false;

  render() {
    const { anuncios,isFetching } = this.state;
    return (
      <Anuncios
        anuncios={anuncios}
        isFetching={isFetching}/>
    );
  }
}

export default AnunciosApp;
