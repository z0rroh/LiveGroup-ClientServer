import React, {Component} from 'react';
import {EditableText} from "@blueprintjs/core";


class UserInfo extends Component{


    render(){
      return(
        <div className="User-Info-Datos col-lg-6 col-xs-6">
            <div className="Tittle-Element col-lg">
              <h4>Cuenta</h4>
            </div>
            <div className="User-element col-lg">
              <strong>Nombre:</strong>
              <EditableText
                className="pt-intent-success"
                defaultValue={this.props.user.name}
                selectAllOnFocus={true}
                onChange={(e)=>this.props.handleChange(e,'name')}></EditableText>
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
              name="email"
              onChange={(e)=>this.props.handleChange(e,'email')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Telefono:</strong>
            <EditableText
              type="int"
              className="pt-intent-success"
              value={this.props.user.phone}
              selectAllOnFocus={true}
              onChange={(e)=>this.props.handleChange(e,'phone')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Direccion:</strong>
              <EditableText
                className="pt-intent-success"
                value={this.props.user.adress}
                selectAllOnFocus={true}
                onChange={(e)=>this.props.handleChange(e,'adress')}></EditableText>
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
