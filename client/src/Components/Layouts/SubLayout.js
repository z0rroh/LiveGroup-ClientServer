import React, {Component} from 'react'
import { Redirect, Switch, Route, NavLink } from 'react-router-dom'
import Panel from '../AdminPanel/Panel.js'
import GroupList from '../AdminPanel/GroupList'
import CrearTurnos from '../AdminPanel/CrearTurnos'
import SearchTurns from '../AdminPanel/SearchTurns'
import addUsers from '../AdminPanel/addUsers'



class SubLayout extends Component {

  static isPrivate = true;

  render(){
    const match = this.props.match;
    return(
      <div className="sub-layout">
        <div className="Panel-container">
          <Panel/>
        </div>
        <div className="primary-content">
          <Switch>
            <Route path={`${match.path}/agregar`} component={addUsers} />
            <Route path={`${match.path}/grupo`} component={GroupList} />
            <Route path={`${match.path}/turnos/crear`} component={CrearTurnos} />
            <Route path={`${match.path}/turnos/buscar`} component={SearchTurns} />
            <Redirect to={`${match.path}/agregar`}/>
          </Switch>
        </div>
      </div>)
  }
}

export default SubLayout
