import React, { Component } from 'react';
import ChatList from './ChatList'
import axios from 'axios'
import io from '../../io.js'
import {Spinner} from "@blueprintjs/core";
import ChatBoxList from './ChatBoxList'

class ChatPanel extends Component {
  constructor(){
    super();
    this.state={
      users: [],
      isFetching: false
    }
  }

  componentDidMount(){
    this.setState({isFetching:true});
    axios.get('/chat/groupOnline')
    .then((response)=>{
      const users = response.data;
      this.setState({isFetching: false, users: users})
    })
    .catch((err)=>{
      console.log(err);
    })
    io.socket.on('user', function serverSentEvent(user) {
      const userConnect = user.data;
      if(userConnect.online === true){
        this.setState(previousState => ({
            users: [...previousState.users, userConnect]
        }));
      }
      else{
        const newState = this.state.users;
        if(userConnect.online === false){
          this.setState(prevState => ({ users: prevState.users.filter(user => user.id !== userConnect.id) }))
        }
      }
    }.bind(this));
  }

  render() {
    const {isFetching,users} = this.state;
    return (
      <div className="side-nav chat-sidebar">
        <div className="chat-exit"><a className="tiny material-icons" onClick={()=>this.props.toggleClass()}>forward</a></div>
        <div className="startChat">
          <div className="chat-tittle"><h6>Group online</h6></div>
          { isFetching ? ( <div className="pt-spinner .pt-large">
                  <div className="pt-spinner-svg-container">
                    <svg viewBox="0 0 100 100">
                      <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                      <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                    </svg>
                  </div>
                  Loading...
                </div>) : (<ChatList handleAddUser={this.props.handleAddUser} users={users}/>)}
        </div>
      </div>
    );
  }
}

export default ChatPanel;
