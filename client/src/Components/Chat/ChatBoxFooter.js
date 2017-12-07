import React, {Component} from 'react'
import axios from 'axios'

class ChatBoxFooter extends Component{
    constructor(props){
      super(props);
      this.state={
        text: "",
        to: this.props.user
      }
    }

    onChange(e){
      e.preventDefault();
      this.setState({text: e.target.value})
    }

    handleKeyPress(e){
      if(e.key === 'Enter'){
        var text = this.state.text;
        var to = this.state.to.id;
        axios.post('chat/message/create', {text: text, to: to})
        .then(res=>{
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        })
        this.setState({text: ""})
        axios.get('chat/getmessages', {params:{to: to}})
        .then(res=>{
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        })
      }

    }
    render(){
      return(
        <div className="send-messages">
          <input
            placeholder="Escribe un mensaje..."
            value={this.state.text}
            onChange={(e)=>{this.onChange(e)}}
            onKeyPress={(e)=>{this.handleKeyPress(e)}}></input>
        </div>
      )
    }
}

export default ChatBoxFooter
