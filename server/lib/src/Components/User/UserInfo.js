import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {EditableText} from "@blueprintjs/core";

class UserInfo extends Component{

    constructor(props){
      super(props);
      this.state={
        id: this.props.user.id,
        name: this.props.user.name,
        group: this.props.user.group,
        email: this.props.user.email,
        phone: this.props.user.phone,
        adress: this.props.user.adress,
        tokens: this.props.user.tokens,
        admin: this.props.user.admin
      }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e,name){
      console.log(e);
      this.setState({[name]: e});
      /*
      const data = {
        id: this.props.funcionario.id,
        [name]: e,
      }
  */
    }

    render(){
      return(
        <div className="User-Info-Datos col-lg-6 col-xs-6">
            <div className="Tittle-Element col-lg">
              <h4>Detalles Cuenta</h4>
            </div>
            <div className="User-element col-lg">
              <strong>Nombre:</strong>
            <EditableText
              className="pt-intent-success"
              value={this.props.user.name}
              selectAllOnFocus={true}
              onChange={(e)=>this.handleChange(e,'name')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Grupo:</strong>
            <EditableText
              value={this.props.user.group} disabled={true} minWidth={2}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Email:</strong>
            <EditableText
              className="pt-intent-success"
              value={this.props.user.email}
              selectAllOnFocus={true}
              onChange={(e)=>this.handleChange(e,'email')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Telefono:</strong>
            <EditableText
              className="pt-intent-success"
              value={this.props.user.phone}
              selectAllOnFocus={true}
              onChange={(e)=>this.handleChange(e,'phone')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Direccion:</strong>
            <EditableText
              className="pt-intent-success"
              value={this.props.user.adress}
              selectAllOnFocus={true}
              onChange={(e)=>this.handleChange(e,'adress')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Tokens:</strong>
            <EditableText value={this.props.user.tokens} disabled={true} minWidth={2}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Tipo usuario:</strong>
              <EditableText value={this.props.user.admin} disabled={true}></EditableText>
            </div>
        </div>
      )
    }

}

export default UserInfo;
