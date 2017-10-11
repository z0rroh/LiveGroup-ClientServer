import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserInfo from './UserInfo';
import UserTurnos from './UserTurnos'
import UserAvatar from './UserAvatar'
import axios from 'axios'
import PerfilSkeleton from './PerfilSkeleton.js'

class Perfil extends Component{

  constructor(){
    super();
    this.state ={
      user: {},
      avatar: "",
      turnos: [],
      isFetching: false
    };
  }

  componentDidMount(){
    this.setState({isFetching: true})
    axios.get('/user/getUser')
    .then((response)=>{
      const user = response.data;
      this.setState({isFetching: false, user: user, turnos: user.turnos, avatar: user.user_image})
    })
    .catch((err)=>{
      console.log(err);
    })
    io.socket.on('user', function serverSentEvent(user) {
      this.setState({
        avatar: user.data[0].user_image
      })

    }.bind(this));

  }
   renderContent(){
     if(this.state.isFetching){
       return(<PerfilSkeleton/>)
     }
     else{
       return(
         <div className="Perfil-Container row center-lg">
                 <div className="User-Edit col-lg-8 col-xs-12">
                   <UserAvatar
                     avatar={this.state.avatar}/>
                 </div>

               <div className="User-Info col-lg-8 col-xs-12">
                     <UserInfo
                       user={this.state.user}/>
                     <UserTurnos
                       turnos={this.state.turnos}/>
                 </div>
             </div>)
     }
   }

  render(){
    return(
      <div className="Container">
        {this.renderContent()}
      </div>

    )
  }
}
export default Perfil;
