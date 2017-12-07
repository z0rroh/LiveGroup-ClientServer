import React, { Component } from 'react';
import io from '../../io.js'
import ChatPanel from './ChatPanel'
import ChatBoxList from './ChatBoxList'

class ChatApp extends Component {
  constructor(){
    super();
    this.state={
      active: true
    }
    this.toggleClass=this.toggleClass.bind(this);
  }

  componentDidMount(){

    io.socket.get('/chat/subscribeGroupChat', function (res){
      console.log(res);
      console.log("Subscrito a ChatList");
    }.bind(this));
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
        {isActive ? (<ChatPanel handleAddUser={this.props.handleAddUser} toggleClass={this.toggleClass}/>) : null }

      </div>
    );
  }
}

export default ChatApp;
