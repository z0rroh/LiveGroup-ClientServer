import React, { Component } from 'react';
import Perfil from './Perfil.js'
import {io} from '../../io.js'

class PerfilApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.user) {
      this.setState({user: nextProps.user})
    }
  }

  componentDidMount(){
  
  }

  static isPrivate = false;

  render() {
    const { user } = this.state
    const { setUserAttribute } = this.props
    return (
      <Perfil
        setUserAttribute={setUserAttribute}
        user={user}/>
    );
  }
}

export default PerfilApp;
