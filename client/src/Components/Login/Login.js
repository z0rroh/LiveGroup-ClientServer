import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SignInForm from './SingInForm.js'
import { loginServer } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'

class Login extends Component{
  constructor(){
    super();
  }

  render(){
    const loginServer = this.props.loginServer;
    return(
      <div className="LoginContainer">
        <header className="row">
          <div className="line col-lg-12"> </div>
          <div className="Header col-lg-12">
            <div className="box col-lg-11">
              <div className="row box between-lg middle-lg">
                <div className="Logo col-lg-4">
                  <div className="Header-img-logo" >
                    <img src="/images/newLogo.png" alt="some"/>
                  </div>
                  <div className="Header-img">
                    <img src="/images/logo11.png" alt="some"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="background">
          <div className="row center-xs middle-xs">
            <div className="col-xs-4">
              <div className="Login-Card card-panel grey lighten-4">
                <SignInForm
                  history={this.props.history}
                  loginServer={loginServer}/>
              </div>
            </div>
          </div>
        </section>
    </div>
    );
  }

}

Login.propTypes = {
  loginServer: PropTypes.func.isRequired
};


export default connect(null,{loginServer })(Login);
