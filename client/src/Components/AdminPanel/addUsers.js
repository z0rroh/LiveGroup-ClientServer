import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios'
import { addToast } from '../../actions/Toast.js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core'



class addUsers extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      user: {},
      show: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.acceptButton = this.acceptButton.bind(this);
  }

  onChange(e){
    this.setState({email: e.target.value });
  }
  handleKeyDown (e) {
    if (e.key === 'Enter' && e.shiftKey === false && e!=='') {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  onSubmit(){
    var email = this.state.email;

    if(email.length > 0){
      axios.get('/buscar/user',{ params: {email: email}})
      .then((res)=>{
        switch (res.data.code) {
          case "SUCCESS":
            this.setState({user: res.data.user, show: true})
            break;
          default:
            this.props.addToast({
              intent: Intent.DANGER,
              message: res.data.message
            })
            break;
        }
      })
    }
    else{
      this.props.addToast({
        intent: Intent.WARNING,
        message: "Verifica el email ingresado"
      })
    }

  }

  cancelButton(){
    this.setState({show:false, email:"", user: {}})
  }

  acceptButton(){
    const user = this.state.user;

    axios.post('/agregar/user',{user: user})
    .then((res)=>{
      console.log(res);
      switch (res.data.code) {
        case "SUCCESS":
          this.props.addToast({
            intent: Intent.SUCCESS,
            message: res.data.message
          })
          this.setState({show:false, email:"", user: {}})
          break;
        default:
          this.props.addToast({
            intent: Intent.DANGER,
            message: res.data.message
          })
          this.setState({show:false, email:"", user: {}})
          break;
      }
    })
  }

  render(){
    const {user, show} = this.state;
    return(
      <div className="col-xs-12 addUsersContainer">
        <div className="col-xs-12 addUsersTitle">
          <h3>Buscar Usuarios</h3>
        </div>
        <div className="col-xs-10 addUsersFormContainer row">
          <div className="col-xs-6 addUsersEmail">
            <form
              onSubmit={(e) => this.onSubmit(e)}
              onKeyDown={(e) => { this.handleKeyDown(e); }}>
              <span>Email:</span>
              <input
                onChange={ this.onChange }
                name="email"
                value={this.state.email}
                type="email"
                className="pt-input pt-round inputParams col-xs-12"
                placeholder="Ingresa el email a buscar"
                required="true"/>
            </form>
          </div>
          <div className="addUsersSearchButton col-xs-6">
            <input
              onClick={this.onSubmit}
              className="btn"
              type="submit"
              value="Buscar"/>
          </div>
        </div>
        {  show &&
        <div className="col-xs-10 addUsersResContainer row">

          { user.group ?
            (<div className="col-xs-6 yesGroup">
              <p>El usuario solicitado ya posee un grupo</p>
            </div>) :
            (<div className="col-xs-6 noGroup">
              <div className="User-element col-xs">
                <p>El usuario "{user.name} " no se encuentra en ningun grupo, ¿Deseas añadirlo a tu grupo de trabajo?</p>
              </div>
              <div className="col-xs btnsContainer row">
                <div className="col-xs-6 btnContainer">
                  <input
                    onClick={this.cancelButton}
                    className="btn cancel"
                    type="submit"
                    value="Cancelar"/>
                </div>
                <div className="col-xs-6 btnContainer">
                  <input
                    onClick={this.acceptButton}
                    className="btn accept"
                    type="submit"
                    value="Agregar"/>
                </div>
              </div>
            </div>)}
        </div> }
      </div>
    );
  }

}

addUsers.propTypes = {
  addToast: PropTypes.func.isRequired
};

export default connect(null,{addToast })(addUsers);
