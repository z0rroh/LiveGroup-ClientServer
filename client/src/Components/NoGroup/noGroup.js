import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addToast } from '../../actions/Toast'
import { logout } from '../../actions/auth'
import { Intent } from '@blueprintjs/core'
import { Switch, Redirect } from 'react-router'
import commonUser from './commonUser'
import adminUser from './adminUser'
import GroupTypeRoute from '../../GroupTypeRoute'


class noGroup extends Component {

  onClick(){
    this.props.logout();
    this.props.addToast({
      intent: Intent.SUCCESS,
      message: "HASTA LA PROXIMA!"
    })
  }

  static isPrivate = true;
  render() {
      return (<div className="NoGroupContainer">
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
                      <div className="Logout">
                        <a title="Cerrar Sesion"
                           className="material-icons profile"
                           onClick = {()=>this.onClick()}>power_settings_new</a>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <section className="background">
                <div className="row center-xs middle-xs">
                  <div className="col-xs-4">
                    <div className="NoGroup-Card card-panel">
                      <Switch>
                        <GroupTypeRoute path="/noGroup/waiting" component={commonUser}/>
                        <GroupTypeRoute path="/noGroup/newGroup" component={adminUser}/>
                        <Redirect to="/noGroup/waiting"/>
                      </Switch>
                    </div>
                  </div>
                </div>
              </section>
          </div>)
  }

}
noGroup.propTypes = {
  logout: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
};


export default connect(null,{logout, addToast })(noGroup);
