import React from 'react'
import { Redirect, Switch, Route, NavLink } from 'react-router-dom'
import Panel from '../AdminPanel/Panel.js'
import GroupList from '../AdminPanel/GroupList'
import CrearTurnos from '../AdminPanel/CrearTurnos'
import SearchTurns from '../AdminPanel/SearchTurns'
// Sub Layouts
//import BrowseUsersPage from '../pages/BrowseUsersPage'
//import AddUserPage from '../pages/AddUserPage'
//import UserProfilePage from '../pages/UserProfilePage'

const SubLayout = ({ match }) => (

  <div className="sub-layout">
    <div className="Panel-container">
      <Panel/>
    </div>
    <div className="primary-content">
      <Switch>
        <Route path={`${match.path}/grupo`} component={GroupList} />
        <Route path={`${match.path}/turnos/crear`} component={CrearTurnos} />
        <Route path={`${match.path}/turnos/buscar`} component={SearchTurns} />
        <Redirect to={`${match.path}/grupo`}/>
      </Switch>
    </div>
  </div>
)

export default SubLayout
