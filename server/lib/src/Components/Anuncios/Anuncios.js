import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnunciosForm from './AnunciosForm';
import AnunciosList from './AnunciosList';
import axios from 'axios'


class Anuncios extends Component{
  constructor(){
    super()
      this.state = {
        anuncios: [],
        isFetching: false,
      };
  }

  componentDidMount(){
    this.setState({isFetching:true});
    axios.get('/anuncios/getAnuncios')
    .then((response)=>{
      const anuncios = response.data;
      this.setState({isFetching: false, anuncios: anuncios})
    })
    .catch((err)=>{
      console.log(err);
    })
    io.socket.on('anuncio', function serverSentEvent(anuncio) {
      var autor = {
        name: anuncio.data.autor.name,
        id: anuncio.data.autor.id,
        user_img: anuncio.data.autor.user_img
      }
      let newAnuncio = {autor: anuncio.data.autor, id: anuncio.data.id, text: anuncio.data.text, fecha: anuncio.data.fecha, comment: anuncio.data.comment}
      let newState = this.state.anuncios;
      newState.splice(0,0,newAnuncio)
      this.setState({anuncios: newState})
    }.bind(this));

  }

  render(){
    const {anuncios,isFetching} = this.state;
    return (
        <section className="Main row center-lg">
          <AnunciosForm/>
          <AnunciosList
                  isFetching={this.state.isFetching}
                  anuncios={this.state.anuncios}/>

        </section>
    )
  }
}

export default Anuncios;
