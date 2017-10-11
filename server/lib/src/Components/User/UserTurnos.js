import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TurnoItem from './TurnoItem.js'

class UserTurnos extends Component{

    constructor(props){
      super(props);

    }

    render(){
      const turnosRender = this.props.turnos.map(turno =>{
        return (
          <TurnoItem
            key = {turno.id}
            turno = {turno} />
        )
      })
      return(
        <div className="User-Info-Datos col-lg-6 col-xs-12">
          <div className="Tittle-Element col-lg">
            <h4>Turnos Semana</h4>
          </div>
          {turnosRender}
        </div>
      )
    }

}

export default UserTurnos;
