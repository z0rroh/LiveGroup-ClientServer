import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addToast } from '../../actions/Toast'
import { Intent } from '@blueprintjs/core'
import { newGroup } from '../../actions/auth'

class adminUser extends Component {

  constructor(){
    super();
    this.state={
      name: "",
      description: "",
      ubication: "",

    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    const Group={};
    Object.assign(Group,this.state);
    this.props.newGroup(Group)
    .then(res => {
      if(res){
        this.props.addToast({
        intent: Intent.DANGER,
        message: res
      })
      }
      else{
        this.props.addToast({
          intent: Intent.SUCCESS,
          message: "Grupo de Trabajo creado exitosamente"
        })
        this.props.history.push('/')
      }
    })
  }

  static isPrivate= true;
  render() {

    return ( <div className="formContainer">
                <div className="adminUser"><h3>Registrar Grupo de Trabajo</h3></div>
                <form
                  onSubmit={e => this.onSubmit(e)}
                  className="row center-xs">
                  <div className="col-xs-12 input-field"><i className="material-icons prefix">group</i>
                  <input
                    onChange={ this.onChange }
                    name="name"
                    value={this.state.name}
                    type="text"
                    className="pt-input pt-round inputParams"
                    placeholder="Nombre Grupo"
                    required="true"/>
                  </div>
                  <div className="col-xs-12 input-field"><i className="material-icons prefix">description</i>
                    <input
                      onChange={ this.onChange }
                      name="description"
                      value={this.state.description}
                      type="text"
                      className="pt-input pt-round inputParams"
                      placeholder="Descripción"
                      required="true"/>
                  </div>
                  <div className="col-xs-12 input-field"><i className="material-icons prefix">location_on</i>
                    <input
                      onChange={ this.onChange }
                      name="ubication"
                      value={this.state.ubication}
                      type="text"
                      className="pt-input pt-round inputParams"
                      placeholder="Ubicación"
                      required="true"/>
                  </div>
                  <div className="NoGroup-Button col-xs-12 input-field">
                    <input className="btn" type="submit" value="Crear Grupo"/>
                  </div>
                </form>
          </div>)
  }

}

adminUser.propTypes = {
  newGroup: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
};

export default connect(null,{addToast, newGroup })(adminUser)
