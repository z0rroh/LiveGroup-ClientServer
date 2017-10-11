import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SingInForm from './SingInForm.js'

class Login extends Component{
  constructor(){
    super();
  }

  render(){

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
                <SingInForm/>
              </div>
            </div>
          </div>
        </section>
    </div>
    );
  }



}

export default Login;
