import React, { Component } from 'react'


class ComentarioItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      comentario: this.props.comentario
    }
  }

  render(){
    const comment = this.state.comentario;

    return(
      <li id={comment.id}>
        <div className="comment-avatar"><img src={"/images/avatars/"+comment.autor.user_img} /></div>
        <div className="comment-box">
          <div className="comment-head">
            <h6 className="comment-name"><a>{comment.autor.name}</a></h6>
            <span>{comment.fecha}</span>
          </div>
          <div className="comment-content">
            <p>{comment.text}</p>
          </div>
        </div>
      </li>
    )


  }
}

export default ComentarioItem;
