import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import Header from './Header'

class PrimaryHeader extends Component{

  constructor(){
    super();
    this.state={
      chatsOpen: []
    }
    this.handleAddUser=this.handleAddUser.bind(this);
    this.handleRemoveUser=this.handleRemoveUser.bind(this);
  }

  handleAddUser(user){
    const addUser = user;
    var newState = this.state.chatsOpen;
    let exist = newState.findIndex( user => user.id === addUser.id )
    if(exist === -1){
      newState.splice(0,0,addUser)
      this.setState({chatsOpen: newState})
    }
  }

  handleRemoveUser(user){
    const removeUser = user;
    this.setState(prevState => ({ chatsOpen: prevState.chatsOpen.filter(user => user.id !== removeUser.id) }))
  }

  render(){
    const {user, history} = this.props;
    return(
      <header>
        <div className="line col-lg-12 col-xs-12"> </div>
        <Header
          history={history}
          user={user} />

        <nav className="Nav col-lg-12 col-xs-12">
          <ul className="Nav-Items row center-lg center-xs">
            <div className="Nav-Item 2">
              <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/perfil'>Perfil</NavLink></li>
            </div>
            <div className="Nav-Item 2">
              <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/anuncios'>Anuncios</NavLink></li>
            </div>
            <div className="Nav-Item 2">
              <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/turnos'>Turnos</NavLink></li>
            </div>
            {user.admin &&
             <div className="Nav-Item 2">
                <li><NavLink className="navItemLink" activeClassName="navItemActive" to='/administrar'>Administrar</NavLink></li>
              </div>}
          </ul>
        </nav>
      </header>
    );
  }



}

export default PrimaryHeader
