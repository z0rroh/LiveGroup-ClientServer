import React, {Component} from 'react';
import {EditableText} from "@blueprintjs/core";


class UserInfo extends Component{

    constructor(props) {
      super(props);
      this.state = {
        name: props.user.name,
        groupName: props.user.groupName,
        email: props.user.email,
        phone: props.user.phone,
        adress: props.user.adress,
        tokens: props.user.tokens,
        admin: props.user.admin
      }
    }

    componentWillReceiveProps(nextProps) {
      // Any time props.email changes, update state.
      if (nextProps.user.name !== this.props.user.name) {
        this.setState({ name: nextProps.user.name})
      }
      if (nextProps.user.groupName !== this.props.user.groupName) {
        this.setState({ groupName: nextProps.user.groupName})
      }
      if (nextProps.user.email !== this.props.user.email) {
        this.setState({ email: nextProps.user.email})
      }
      if (nextProps.user.phone !== this.props.user.phone) {
        this.setState({ phone: nextProps.user.phone})
      }
      if (nextProps.user.adress !== this.props.user.adress) {
        this.setState({ adress: nextProps.user.adress})
      }
      if (nextProps.user.tokens !== this.props.user.tokens) {
        this.setState({ tokens: nextProps.user.tokens})
      }
      if (nextProps.user.admin !== this.props.user.admin) {
        this.setState({ admin: nextProps.user.admin})
      }
    }

    render(){

      const { name, groupName, email, phone, adress, tokens, admin } = this.state
      const handleChange = this.props.handleChange
      let typeUser = admin ? 'Administrador' : 'Comun'
      return(
        <div className="User-Info-Datos row col-xs-6">
            <div className="Tittle-Element col-xs-12">
              <h4>Cuenta</h4>
            </div>
            <div className="User-element col-xs-12">
              <strong>Nombre:</strong>
              <EditableText
                className="pt-intent-success User-element-EditableText"
                value={name}
                selectAllOnFocus={true}
                onChange={(e) => handleChange(e,'name')}></EditableText>
            </div>
            <div className="User-element col-xs-12">
              <strong>Grupo: </strong>
              <p>{groupName}</p>
            </div>
            <div className="User-element col-xs-12">
              <strong>Email:</strong>
            <EditableText
              className="pt-intent-success User-element-EditableText"
              defaultValue={email}
              selectAllOnFocus={true}
              name="email"
              onChange={(e) => handleChange(e,'email')}></EditableText>
            </div>
            <div className="User-element col-xs-12">
              <strong>Telefono:</strong>
            <EditableText
              type="int"
              className="pt-intent-success User-element-EditableText"
              defaultValue={phone}
              selectAllOnFocus={true}
              onChange={(e) => handleChange(e,'phone')}></EditableText>
            </div>
            <div className="User-element col-xs-12">
              <strong>Direccion:</strong>
              <EditableText
                className="pt-intent-success User-element-EditableText"
                defaultValue={adress}
                selectAllOnFocus={true}
                onChange={(e) => handleChange(e,'adress')}></EditableText>
            </div>
            <div className="User-element col-xs-12">
              <strong>Tokens: </strong>
              <p> {tokens}</p>
            </div>
            <div className="User-element col-xs-12">
              <strong>Tipo usuario: </strong>
              <p> {typeUser}</p>
            </div>
        </div>
      )
    }

}

export default UserInfo;
