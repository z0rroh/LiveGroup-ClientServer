import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnunciosForm from './AnunciosForm';
import AnunciosList from './AnunciosList';
import axios from 'axios'
import io from '../../io.js'


class Anuncios extends Component{
  constructor(){
    super()
      this.state = {
        anuncios: [],
        isFetching: false,
      };
  }

  componentDidMount(){
    //const io = sailsIOClient(socketIOClient);

    this.setState({isFetching:true});
    axios.get('/anuncios/getAnuncios')
    .then((response)=>{
      const anuncios = response.data;
      this.setState({isFetching: false, anuncios: anuncios})
    })
    .catch((err)=>{
      console.log(err);
    })


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
