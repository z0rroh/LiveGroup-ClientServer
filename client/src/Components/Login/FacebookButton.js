import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { loginFacebook } from '../../actions/auth'

class FacebookButton extends Component {
  constructor(props){
    super(props);
    this.state={
      facebookData: null,
    }
  }

  responseFacebook(response){
    if(response.accessToken){
      const accessToken = response.accessToken;
      this.props.loginFacebook(accessToken)
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
          //this.props.history.push('/anuncios')
        }
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div className="col-xs-12">
        <FacebookLogin
          appId="193783801343333"
          autoLoad={false}
          fields="name,email,picture"
          version="3.0"
          size="small"
          onClick={this.signUpProvider}
          textButton="Ingresar con Facebook"
          callback={(e) => this.responseFacebook(e) } />
      </div>
    );
  }

}

FacebookButton.propTypes = {
  loginFacebook: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginFacebook: (token) => dispatch(loginFacebook(token))
  };
}

export default connect(null,mapDispatchToProps)(FacebookButton);
