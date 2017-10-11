import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router'

class SignInForm extends Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      errors: "",

    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value });
  }

  onSubmit(e){
    this.setState({ errors: {} });
    e.preventDefault();
    const userData = {};
    Object.assign(userData,this.state);
    delete userData.errors;
    this.props.loginServer(userData)
    .then((res) => {
      this.props.history.push('/anuncios')
    })
    .catch((err)=>{
      console.log(err.res);
    });

  }

  render(){

    return(
      <div className="formContainer">
        <form onSubmit={e => this.onSubmit(e)} className="row center-xs">
          <div className="col-xs-12 input-field"><i className="material-icons prefix">mail</i>
            <input
              id="Signin-Email"
              onChange={ e => this.onChange(e) }
              name="email"
              value={this.state.name}
              type="email"
              className="validate"
              placeholder="Email"
              required="true"/>
          </div>
          <div className="col-xs-12 input-field"><i className="material-icons prefix">lock</i>
            <input
              className="validate"
              id="Signin-Password"
              onChange={ e => this.onChange(e)}
              name="password"
              value={this.state.password}
              type="password"
              placeholder="Contraseña"
              required="true"/>
          </div>
          <div className="Login-Remember col-lg-4 input-field">
            <input id="Login-Rememberme" type="checkbox"/>
            <label htmlFor="Login-Rememberme">Recuerdame</label>
          </div>
          <div className="Login-Forgot col-lg-8 input-field"></div>
          <div className="Login-Button col-lg-12 input-field">
            <input className="btn btn-large" type="submit" value="Ingresar"/>
          </div>
        </form>
        <div className="row center-lg">
          <div className="SignUp col-lg-12">
            <div className="divider"></div><a className="SignUp-Button btn-flat" href="">Registrate</a>
          </div>
        </div>
    </div>
    );
  }



}
SignInForm.propTypes = {
  loginServer: PropTypes.func.isRequired,
};
export default SignInForm;
