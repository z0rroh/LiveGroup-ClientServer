import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class TurnoItem extends Component{

    constructor(props){
      super(props);
      this.state = {
        turno: this.props.turno
      }
    }

    render(){
      const turno = this.state.turno
      return(
          <div id={turno.id} className="Turno-element col-lg">
              <strong>Nombre Turno:</strong>
              <span>{turno.name}</span>
              <strong>Dia:</strong>
              <span>{turno.day}</span>
              <strong>Inicio:</strong>
              <span>{turno.start}</span>
              <strong>Termino:</strong>
              <span>{turno.end}</span>
          </div>
      )
    }

}

export default TurnoItem;
