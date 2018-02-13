import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Route, Redirect, Link } from 'react-router-dom'
import { Intent } from '@blueprintjs/core'
import axios from 'axios'
import PropTypes from 'prop-types';

class SignUpForm extends Component{

    constructor(){
      super();
      this.state={
        name: "",
        email: "",
        password: "",
        repassword: ""
      }
      this.onChange = this.onChange.bind(this);
    }
    onChange(e){
      this.setState({[e.target.name]: e.target.value });

    }
    onSubmit(e){
      e.preventDefault();
      const pass = this.state.password;
      const repass = this.state.repassword;
      if( pass === repass){
        const newUser = {};
        Object.assign(newUser,this.state);
        this.props.SignupServer(newUser)
        .then((res)=>{
          console.log(res);
          switch (res.code) {
            case "SUCCESS":
              this.props.addToast({
                intent: Intent.SUCCESS,
                message: res.message
              })
              this.props.history.push('/auth/login')
              break;
            case "FAIL":
              this.props.addToast({
                intent: Intent.DANGER,
                message: res.message
              })
              break;
            case "EMAIL_FOUND":
              this.props.addToast({
                intent: Intent.WARNING,
                message: res.message
              })
              break;
            default:

          }
        })
      }
      else{
        this.props.addToast({
          intent: Intent.DANGER,
          message: "Las contraseñas ingresadas no coinciden"
        })
      }

    }
    render(){
      return(
          <div className="formContainer">
            <form onSubmit={e => this.onSubmit(e)} className="row">
              <div className="col-xs-12 input-field"><i className="material-icons prefix">face</i>
              <input
                onChange={ this.onChange }
                name="name"
                value={this.state.name}
                type="text"
                className="pt-input pt-round inputParams"
                placeholder="Nombre Completo"
                required="true"/>
              </div>
              <div className="col-xs-12 input-field"><i className="material-icons prefix">mail</i>
                <input
                  onChange={ this.onChange }
                  name="email"
                  value={this.state.email}
                  type="email"
                  className="pt-input pt-round inputParams"
                  placeholder="Email"
                  required="true"/>
              </div>
              <div className="col-xs-12 input-field"><i className="material-icons prefix">lock</i>
                <input
                  onChange={ this.onChange }
                  name="password"
                  value={this.state.password}
                  type="password"
                  className="pt-input pt-round inputParams"
                  placeholder="Contraseña"
                  required="true"/>
              </div>
              <div className="col-xs-12 input-field"><i className="material-icons prefix">lock</i>
                <input
                  onChange={ this.onChange }
                  name="repassword"
                  value={this.state.repassword}
                  type="password"
                  className="pt-input pt-round inputParams"
                  placeholder="Repetir Contraseña"
                  required="true"/>
              </div>
              <div className="Login-Button col-xs-12 input-field">
                <input className="btn" type="submit" value="Registrar"/>
              </div>
            </form>
            <div className="row center-lg">
              <div className="SignUp col-xs-12">
                <Link to="/auth/login" className="SignUp-Button btn-flat">Volver</Link>
              </div>
            </div>
        </div>
      )
    }

}

SignUpForm.propTypes = {
  SignupServer: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
};

export default SignUpForm
