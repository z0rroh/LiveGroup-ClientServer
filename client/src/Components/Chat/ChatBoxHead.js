import React, {Component} from 'react'

class ChatBoxHead extends Component{
  constructor(){
    super();
  }
  render(){
    const user = this.props.user;
    return(
      <div className="popup-head">
        <div className="popup-head-left"><span>{user.name}</span></div>
      <div className="popup-head-right"><a className="tiny material-icons" onClick={()=>{this.props.handleRemoveUser(user)}}>close</a></div>
      </div>
    )
  }
}

export default ChatBoxHead
