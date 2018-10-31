import React, {Component} from 'react';
import UserInfo from './UserInfo';
import UserTurnos from './UserTurnos'
import UserAvatar from './UserAvatar'
import axios from 'axios'
import PerfilSkeleton from './PerfilSkeleton.js'
import {io} from '../../io.js'

class Perfil extends Component{

  constructor(props){
    super();
    this.state ={
      user: props.user,
      avatar: props.user.user_image,
      turnos: [],
      isFetching: true
    };
    this.handleChange=this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.user) {
      this.setState({user: nextProps.user, avatar: nextProps.user.user_image})
    }
  }

  handleChange(e,name){
    this.props.setUserAttribute(name, e)
  }

  async componentDidMount(){
    try{
      const req = await axios.get('/user/getUser')
      const user = req.data
      this.setState({isFetching: false, turnos: user.turnos})
    }catch(e){
      this.setState({ isFetching: false })
    }
  }


   renderContent(){
     const { user,avatar,turnos } = this.state;
     const { setUserAttribute } = this.props

     if(this.state.isFetching){
       return(<PerfilSkeleton/>)
     }
     else{
       return(
         <div className="Perfil-Container row center-lg col-lg-12 col-xs-10">
                 <div className="User-Edit col-lg-8 col-xs-12">
                   <UserAvatar
                     setUserAttribute={setUserAttribute}
                     user={user}
                     avatar={avatar}/>
                 </div>

               <div className="User-Info col-lg-8 col-xs-12">
                     <UserInfo
                       handleChange={this.handleChange}
                       user={user}/>
                     <UserTurnos
                       turnos={turnos}/>
                 </div>
             </div>)
     }
   }

  render(){
    return(
      <div className="Container row center-xs">
        {this.renderContent()}
      </div>

    )
  }
}
export default Perfil;
