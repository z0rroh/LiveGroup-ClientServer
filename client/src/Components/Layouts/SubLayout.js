import React from 'react'
import { Redirect, Switch, Route, NavLink } from 'react-router-dom'
import Panel from '../AdminPanel/Panel.js'
import GroupList from '../AdminPanel/GroupList'
// Sub Layouts
//import BrowseUsersPage from '../pages/BrowseUsersPage'
//import AddUserPage from '../pages/AddUserPage'
//import UserProfilePage from '../pages/UserProfilePage'

const HOLA = () => (
  <div>
    <h2>hola</h2>
  </div>
)
const HOLA2 = () => (
  <div>
    <h2>HOLA2</h2>
  </div>
)
const HOLA3 = () => (
  <div>
    <h2>HOLA2</h2>
  </div>
)

const SubLayout = ({ match }) => (

  <div className="sub-layout">
    <div className="Panel-container">
      <Panel/>
    </div>
    <div className="primary-content">
      <Switch>
        <Route path={`${match.path}/grupo`} component={GroupList} />
        <Route path={`${match.path}/hola2`} component={HOLA2} />
        <Route path={`${match.path}/hola3`} component={HOLA3} />
        <Redirect to={`${match.path}/grupo`}/>
      </Switch>
    </div>
  </div>
)

export default SubLayout
