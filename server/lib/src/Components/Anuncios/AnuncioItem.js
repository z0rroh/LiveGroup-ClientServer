import React, { Component } from 'react'
import {Skeleton} from "@blueprintjs/core";

import ComentarioForm from './ComentarioForm'
import ComentarioItem from './ComentarioItem'


class AnuncioItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      anuncio : this.props.anuncio,
      itemLimit: 2,
      showMore: true,
      answer: false,
      answerHide: true
    }
    this.showMore = this.showMore.bind(this);
    this.showLess = this.showLess.bind(this);
    this.answerForm = this.answerForm.bind(this);
    this.iconCLick = this.iconCLick.bind(this);
  }
  componentWillMount(){
    io.socket.on('comentario', function serverSentEvent(comentario) {
      var autor = {
        name: comentario.data.autor.name,
        id: comentario.data.autor.id,
        user_img: comentario.data.autor.user_img
      }
      let newComment= {autor: autor, id: comentario.data.id, text: comentario.data.text, fecha: comentario.data.fecha}
      let newState = this.state.anuncio;
      if (newState.id === comentario.data.anuncio){
        newState.comment.splice(0,0,newComment)
        this.setState({anuncio: newState, itemLimit: newState.comment.length})
      }
    }.bind(this));

  }
  showMore(){
    var commentsLeng = this.state.anuncio.comment.length;
    var prevLimit = this.state.itemLimit;
    var nextLimit = prevLimit + 5;
    if(nextLimit > commentsLeng || nextLimit+1 === commentsLeng || nextLimit+2 === commentsLeng || nextLimit+3 === commentsLeng || nextLimit+4 === commentsLeng){
      nextLimit = commentsLeng;
      this.setState({showMore: false});
    }
    this.setState({itemLimit: nextLimit});
  }

  showLess(){
    this.setState({itemLimit: 2, showMore: true});
  }


  answerForm(props){
    if(!props)
      return null
    else
      return(
        <ComentarioForm
          anuncioId={this.state.anuncio.id}/>
      )
  }

  iconCLick(value){
    this.setState({answerHide: this.state.answer, answer: value})
  }

  render(){
    const anuncio = this.state.anuncio;
    let button = null;
    if(anuncio.comment.length>this.state.itemLimit && this.state.showMore){
      button = <div className="showMore"><a className="showMoreClick" onClick={this.showMore}>Cargar mas comentarios</a></div>
    }
    if(anuncio.comment.length === this.state.itemLimit && !this.state.showMore){
      button = <div className="showMore"><a className="showMoreClick" onClick={this.showLess}>Ocultar comentarios</a></div>
    }
    const CommentsRender = anuncio.comment.slice(0,this.state.itemLimit).map(comment =>{
      return(
        <ComentarioItem
          key={comment.id}
          comentario={comment}/>
      )
    })
    return(
        <li id={this.state.anuncio.id}>
          <div className="comment-main-level">
            <div className="comment-avatar"><img src={"/images/avatars/"+anuncio.autor.user_img}/></div>
            <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author"><a>{this.state.anuncio.autor.name}</a></h6>
                  <span>{this.state.anuncio.fecha}</span>
                <i onClick={()=>this.iconCLick(this.state.answerHide)} className="reply material-icons">reply</i>
                  <i className="heart material-icons">favorite</i>
                </div>
                <div className="comment-content">
                  <p>{this.state.anuncio.text}</p>
                </div>
            </div>
          </div>
          <ul className="comments-list reply-list">
            {this.answerForm(this.state.answer)}
            {button}
            {CommentsRender}
          </ul>
        </li>
    )


  }
}

export default AnuncioItem;
