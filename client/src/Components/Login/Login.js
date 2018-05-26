import React, {Component} from 'react';
import SignInForm from './SingInForm.js'
import SignUpForm from './SingUpForm.js'
import { loginServer, SignupServer } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router'
import { addToast } from '../../actions/Toast.js'

class Login extends Component{

  static isPrivate = false;
  render(){
    const {loginServer, addToast, history, SignupServer} = this.props;
    return(
      <div className="LoginContainer">
        <header className="row">
          <div className="line col-lg-12 col-xs-12"></div>
        <div className="Header col-lg-12 col-xs-12">
            <div className="box col-lg-10 col-xs-12">
              <div className="row box between-lg middle-lg middle-xs col-xs-12 col-lg-12">
                <div className="Logo col-lg-4 col-xs-10">
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
          <div className="row center-lg middle-xs">
            <div className="col-lg-4 col-xs-12">
              <div className="Login-Card card-panel">
                <Switch>
                  <Route exact path="/auth/login" component={() => <SignInForm addToast={addToast} history={history} loginServer={loginServer}/>}/>
                  <Route exact path="/auth/registrar" component={() => <SignUpForm addToast={addToast} history={history} SignupServer={SignupServer}/>}/>
                  <Redirect to="/auth/login"/>
                </Switch>
              </div>
            </div>
          </div>
        </section>
    </div>
    );
  }

}

Login.propTypes = {
  loginServer: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired,
  SignupServer: PropTypes.func.isRequired
};


export default connect(null,{loginServer, addToast, SignupServer })(Login);
