/*
* app Semana
*/

import React, { Component } from 'react';
import Dia from './Dia'
import moment from 'moment'
import {Spinner} from "@blueprintjs/core";


class Semana extends Component{
  constructor(props){
    super(props);
    this.state = {
      fecha: [],
      hora: new Date(),
      mesName: ""
    };

  }

  getDate(){
    var currMonthName  = moment().format('MMMM').toUpperCase();
    var fecha = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var hoy = new Intl.DateTimeFormat('es-Ch',options).format(fecha);
    this.setState({mesName: currMonthName, fecha: hoy})
  }
  componentDidMount(){
    this.getDate();
  }


  render(){
    const isFetching = this.props.isFetching;
    const Dias = this.props.turnos.map((day) => {
      return (<Dia key={day.id} name={day.name} data={day.data} onPostTurno={this.props.handlePostTurno}/>)
    });
    if(isFetching){
      return(
        <div className="pt-spinner .pt-large">
          <div className="pt-spinner-svg-container">
            <svg viewBox="0 0 100 100">
              <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
              <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
            </svg>
          </div>
          Loading...
        </div>
      )
    }
    return(
      <div className="Semana col-xs-12">
        <div className="SemanaTitle">
          <div className="row between-lg col-xs-12 start-xs">
            <div className="col-lg-4 col-xs-8"><p> Fecha: {this.state.fecha}</p></div>
            <div className="col-lg-4 col-xs-4"><p> Hora: 10:00 </p></div>
            <div className="Tokens col-lg-4 col-xs-12"><p>  Tokens: {this.props.tokens}</p></div>
          </div>
        </div>
        <div className="MesName col-xs-12 center-xs"><span>{this.state.mesName}</span></div>
        <div className="SemanaContent row col-xs-12 center-xs">
          { Dias }
        </div>
      </div>
    )
  }
}
export default Semana
