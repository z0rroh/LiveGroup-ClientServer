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
      const turno = this.state.turno;
      return(
          <div id={turno.id} className="Turno-element row col-xs">
              <div className="col-xs-12 col-lg-6">
                <strong>Nombre Turno:</strong>
                <span>{turno.name}</span>
              </div>
              <div className="col-xs-12 col-lg-6">
                <strong>Dia:</strong>
                <span>{turno.day}</span>
              </div>
              <div className="col-xs-5 col-lg-6">
                <strong>Inicio:</strong>
                <span>{turno.start}</span>
              </div>
              <div className="col-xs-5 col-lg-6">
                <strong>Termino:</strong>
                <span>{turno.end}</span>
              </div>
          </div>
      )
    }

}

export default TurnoItem;
