import React, {Component} from 'react'
import ChatBoxHead from './ChatBoxHead'
import ChatBoxFooter from './ChatBoxFooter'
import ChatBoxMessage from './ChatBoxMessage'
import axios from 'axios'

class ChatBox extends Component{


  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    const user = this.props.user;
    return(
      <div id={user.id} className="popup-box">
        <ChatBoxHead user={user} handleRemoveUser={this.props.handleRemoveUser}/>
        <ChatBoxMessage user={user}/>
        <ChatBoxFooter user={user}/>
      </div>
    )
  }
}

export default ChatBox
