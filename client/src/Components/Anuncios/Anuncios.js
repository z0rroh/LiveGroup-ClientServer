import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnunciosForm from './AnunciosForm';
import AnunciosList from './AnunciosList';
import axios from 'axios'
import io from '../../io.js'
import PropTypes from 'prop-types';


class Anuncios extends Component{

  render(){
    const {anuncios,isFetching} = this.props;
    return (
        <section className="Main row center-xs">
          <AnunciosForm/>
          <AnunciosList
                  isFetching={isFetching}
                  anuncios={anuncios}/>

        </section>
    )
  }
}

export default Anuncios;
