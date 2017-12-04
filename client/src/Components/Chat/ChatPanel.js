import React, { Component } from 'react';
import io from '../../io.js'
import ChatList from './ChatList'

class ChatPanel extends Component {
  constructor(){
    super();
    this.state={

    }
  }

  render() {
    return (
      <div className="side-nav chat-sidebar">
        <div className="chat-exit"><a className="tiny material-icons" onClick={()=>this.props.toggleClass()}>close</a></div>
        <div className="startChat">
          <div className="chat-tittle"><h6>Group online</h6></div>
          <ChatList/>
        </div>
      </div>
    );
  }
}

export default ChatPanel;
