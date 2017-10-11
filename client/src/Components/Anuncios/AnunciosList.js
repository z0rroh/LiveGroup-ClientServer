import React, { Component } from 'react'
import AnuncioItem from './AnuncioItem'
import AnuncioSkeleton from './AnuncioSkeleton'

class AnunciosList extends Component {

  constructor(props){
    super(props)
    this.state = {
      anuncios: this.props.anuncios,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({anuncios: nextProps.anuncios});
   }

   renderContent(){

     if(this.props.isFetching){
       return(<AnuncioSkeleton/>)
     }
     if(this.state.anuncios.length > 0){
       const AnunciosRender = this.state.anuncios.map( anuncio => {
           return(
             <AnuncioItem key={anuncio.id} anuncio={anuncio} />
           )
       })
       return(<ul id="comments-list" className="comments-list">
                       {AnunciosRender}
                   </ul>)
     }else{
       if(!this.props.isFetching && this.state.anuncios.length === 0){
         return(
           <div className="no-anuncios">
             <div><i className="material-icons">announcement</i></div>
             <h3>No hay anuncios, se el primero en publicar</h3>
           </div>)
       }

     }

   }
  render(){

    return (
      <div className="comments-container">
        {this.renderContent()}
      </div>
    )
  }

}


export default AnunciosList;
