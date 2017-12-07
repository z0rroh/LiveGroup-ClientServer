import React, {Component} from 'react'


class ChatBoxMessage extends Component{
    constructor(){
      super();
    }

    render(){
      const user = this.props.user;
      return(
        <div className="popup-messages">
          {user.message}
        </div>
      )
    }
}

export default ChatBoxMessage
