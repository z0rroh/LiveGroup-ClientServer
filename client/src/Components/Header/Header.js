import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addToast } from '../../actions/Toast'
import { logout } from '../../actions/auth'
import { Intent } from '@blueprintjs/core'

class Header extends Component{
  constructor(){
    super();
    this.state={
      user: {}
    }
  }

  onClick(){
    this.props.logout();
    this.props.addToast({
      intent: Intent.SUCCESS,
      message: "HASTA LA PROXIMA!"
    })
  }

  componentDidMount(){
    this.setState({user: this.props.user});
  }

  render(){
    const user = this.state.user;
    return(
      <div className="Header col-lg-12 col-xs-12">
        <div className="box col-lg-11 col-xs-12">
          <div className="row box between-lg middle-lg middle-xs">
            <div className="Logo col-lg-4 col-lg-offset-1 col-xs-4">
              <div className="Header-img-logo" >
                <img src="/images/newLogo.png" alt="some"/>
              </div>
              <div className="Header-img">
                <img src="/images/logo11.png" alt="some"/>
              </div>
            </div>
            <div className="User col-lg-4 col-lg-offset-3 col-xs-8">
              <div className="box">
                <div className="row end-xs">
                  <div className="no-padding col-lg-8">
                    <a className="User-name dropdown-button">{user.name}</a>
                    <p className="User-empresa">{user.groupName}</p>
                  </div>
                  <div className="col-lg-2">
                    <div className="User-image">
                      <img src={user.providerId ? user.user_image : "/images/avatars/"+user.user_image} alt="HeaderAvatar"/>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="Logout">
                      <a title="Cerrar Sesion"
                         className="material-icons profile"
                         onClick = {()=>this.onClick()}>power_settings_new</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }



}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
};


export default connect(null,{logout, addToast })(Header);
