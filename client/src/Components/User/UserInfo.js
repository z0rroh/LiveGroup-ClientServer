import React, {Component} from 'react';
import {EditableText} from "@blueprintjs/core";


class UserInfo extends Component{

    constructor(props) {
      super(props);
      this.state = {
        name: props.user.name,
        group: props.user.group,
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
    }

    render(){

      const { name, group, email, phone, adress, tokens, admin } = this.state
      const handleChange = this.props.handleChange

      return(
        <div className="User-Info-Datos row col-lg-6 col-xs-6">
            <div className="Tittle-Element col-lg">
              <h4>Cuenta</h4>
            </div>
            <div className="User-element col-lg">
              <strong>Nombre:</strong>
              <EditableText
                placeholder="Nombre Completo ..."
                className="pt-intent-success"
                value={name}
                selectAllOnFocus={true}
                onChange={(e) => handleChange(e,'name')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Grupo:</strong>
            <EditableText
              defaultValue={this.props.user.group} disabled={true} minWidth={2}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Email:</strong>
            <EditableText
              className="pt-intent-success"
              defaultValue={email}
              selectAllOnFocus={true}
              name="email"
              onChange={(e) => handleChange(e,'email')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Telefono:</strong>
            <EditableText
              type="int"
              className="pt-intent-success"
              defaultValue={phone}
              selectAllOnFocus={true}
              onChange={(e) => handleChange(e,'phone')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Direccion:</strong>
              <EditableText
                className="pt-intent-success"
                defaultValue={adress}
                selectAllOnFocus={true}
                onChange={(e) => handleChange(e,'adress')}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Tokens:</strong>
            <EditableText defaultValue={tokens} disabled={true} minWidth={2}></EditableText>
            </div>
            <div className="User-element col-lg">
              <strong>Tipo usuario:</strong>
              <EditableText defaultValue={admin} disabled={true}></EditableText>
            </div>
        </div>
      )
    }

}

export default UserInfo;
