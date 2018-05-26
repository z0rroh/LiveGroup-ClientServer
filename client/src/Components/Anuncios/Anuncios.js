import React, { Component } from 'react';
import AnunciosForm from './AnunciosForm';
import AnunciosList from './AnunciosList';
//import PropTypes from 'prop-types';


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
