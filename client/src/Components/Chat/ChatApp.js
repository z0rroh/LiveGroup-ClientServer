import React, { Component } from 'react';
import io from '../../io.js'
import ChatPanel from './ChatPanel'
import axios from 'axios'

class ChatApp extends Component {
  constructor(){
    super();
    this.state={
      active: true,
      users: [],
      isFetching: false
    }
    this.toggleClass=this.toggleClass.bind(this);
  }

  componentDidMount(){
    axios.get('/anuncios/getAnuncios')
    .then((response)=>{
      const anuncios = response.data;
      this.setState()
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  render() {
    const isActive = this.state.active;
    return (
      <div className="chat-container">
        <div className="chat-icon col-lg">
          <a className="material-icons comment" onClick={()=>this.toggleClass()}>comment</a>
        </div>
        {isActive ? (<ChatPanel toggleClass={this.toggleClass}/>) : null }
      </div>
    );
  }
}

export default ChatApp;
