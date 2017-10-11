/*
* app Turno
*/

import React, { Component } from 'react';

class Turno extends Component {

  constructor(props){
    super(props);
  }

  handleClick(event, id){
    this.props.onPostTurno(id);
  }

  render(){
    let porcentaje = (parseInt(this.props.data.cupoActual) * 100)/parseInt(this.props.data.cupoTotal);
      porcentaje = porcentaje+"%";
    let datermianteStyle = { width: porcentaje};
    return(
      <section className="Turno col-xs-12 card">
        <div className="Turno-Content">
          <div className="row start-xs">
            <div className="Turno-Info col-lg-12">
              <h5>{this.props.data.name}</h5>
              <p>{this.props.data.start} - {this.props.data.end}</p>
            </div>
            <div className="Turno-Button col-lg-12">
                <a onClick={event => this.handleClick(event,this.props.data.id)} className="btn waves-effect waves-light">
                <i className="material-icons">add</i>
                </a>
            </div>
            <div className="Turno-Log col-lg-12">
              <h5> {this.props.data.cupoActual}/{this.props.data.cupoTotal}</h5>
            </div>
          </div>
        </div>
        <div className="Turno-progress progress" data-placeholder="1/5">
          <div className="determinate" style={datermianteStyle}></div>
        </div>
      </section>
    )
  }
};

export default Turno;
