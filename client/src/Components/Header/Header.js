import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Header extends Component{
  constructor(){
    super();
  }

  render(){
    const user = this.props.user;
    return(
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

            <div className="User col-lg-4 col-lg-offset-3">
              <div className="box">
                <div className="row">
                  <div className="no-padding col-lg-10">
                    <a className="User-name dropdown-button">{user.name}</a>
                    <p className="User-empresa">{user.groupName}</p>
                  </div>
                  <div className="User-image"><img src={"/images/avatars/"+user.user_image}/></div>
                </div>
              </div>
            </div>
            <div className="Logout">
              <a title="Cerrar Sesion" href="/session/destroy" className="material-icons profile">power_settings_new</a>
            </div>
          </div>
        </div>
      </div>
    );
  }



}

export default Header;
