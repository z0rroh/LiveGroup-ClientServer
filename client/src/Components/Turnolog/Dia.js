/*
* app Dia
*/

import React, { Component } from 'react';
import Turno from './Turno.js'

export default class Dia extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const Turnos = this.props.data.map((turno) => {
      return <Turno key={turno.id} data={turno} onPostTurno={this.props.onPostTurno}/>
    });
    return(
      <div className="Dia col-1-7" >
        <div className="box">
          <div className="row">
          <div className="Dia-Colour col-xs-12">
            <div className="Dia-Title col-xs-12">
              <p>{this.props.name}</p>
            </div>
          </div>
            <div className="Dia-Content col-xs-12">
              <div className="Turnos">
                <div className="row">
                  { Turnos }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
