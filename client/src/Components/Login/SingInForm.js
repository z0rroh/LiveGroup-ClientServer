import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Redirect, Link } from 'react-router-dom'
import { Intent } from '@blueprintjs/core'

class SignInForm extends Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: ""
    }

  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    const userData = {};
    Object.assign(userData,this.state);
    delete userData.errors;
    this.props.loginServer(userData)
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
          message: "BIEVENIDO A LIVEGROUP"
        })
        this.props.history.push('/anuncios')
      }
    })
    .catch((err)=>{
      console.log(err);
    });

  }

  render(){
    return(
      <div className="formContainer">
        <form onSubmit={e => this.onSubmit(e)} className="row center-xs">
          <div className="col-xs-12 input-field"><i className="material-icons prefix">mail</i>
            <input
              onChange={ e => this.onChange(e) }
              name="email"
              value={this.state.email}
              type="email"
              className="pt-input pt-round inputParams"
              placeholder="Email"
              required="true"/>
          </div>
          <div className="col-xs-12 input-field"><i className="material-icons prefix">lock</i>
            <input
              onChange={ e => this.onChange(e)}
              name="password"
              value={this.state.password}
              type="password"
              className="pt-input pt-round inputParams"
              placeholder="Contraseña"
              required="true"/>
          </div>
          <div className="Login-Button col-xs-12 input-field">
            <input className="btn" type="submit" value="Ingresar"/>
          </div>
        </form>
        <div className="row center-lg">
          <div className="SignUp col-lg-12">
            <Link className="SignUp-Button btn-flat" to="/auth/registrar">Registrate</Link>
          </div>
        </div>
    </div>
    );
  }



}
SignInForm.propTypes = {
  loginServer: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
};
export default SignInForm;
