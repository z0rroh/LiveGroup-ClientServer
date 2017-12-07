import React, { Component } from 'react';


class ChatUser extends Component {
  constructor(){
    super();
  }

  render() {
    const user = this.props.user
    return (
      <li id={user.id} className="sidebar-name" onClick={()=>{this.props.handleAddUser(user)}}>
        <a>
          <img src={"/images/avatars/"+user.user_image}/>
          <span>{user.name}</span>
        </a>
      </li>
    );
  }
}

export default ChatUser;
