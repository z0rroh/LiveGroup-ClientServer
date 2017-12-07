import React, { Component } from 'react';
import ChatUser from './ChatUser'

class ChatList extends Component {
  constructor(){
    super();
  }

  render() {
    //console.log("usuarios conectados:",this.props.users);
    const users = this.props.users;
    const userList = users.map( (user)=> {
        return(
          <ChatUser handleAddUser={this.props.handleAddUser} key={user.id} user={user} />
        )
    })
    return (
      <div className="users-lists">
        <ul>
          {userList}
        </ul>
      </div>
    );
  }
}

export default ChatList;
