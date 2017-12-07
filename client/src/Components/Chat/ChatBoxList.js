import React, {Component} from 'react'
import ChatBox from './ChatBox'

class ChatBoxList extends Component{
  constructor(){
    super();
    this.state={
      users: []
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.chatsOpen);
  }

  render(){
    const data=[{id:"59ddc71a138751880cdd5c5a", name: "ivana",message:"caja2"},{id:"59ddc4a6002035420c4db84d", name: "carlos",message:"caja3"}]
    const boxList = data.map( (user)=> {
        return(
            <ChatBox key={user.id} user={user} handleRemoveUser={this.props.handleRemoveUser} />
        )
    })
    return(
      <div className="ChatBoxList">
           {boxList}
      </div>
    )
  }
}

export default ChatBoxList
