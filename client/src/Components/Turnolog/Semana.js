import React, { Component } from 'react';
import Dia from './Dia'
import moment from 'moment'
import Clock from './Clock'

class Semana extends Component{
  constructor(props){
    super(props);
    this.state = {
      fecha: [],
      mesName: "",
    };

  }
  componentDidMount(){
    this.getDate();
  }
  getDate = () => {
    var currMonthName  = moment().format('MMMM').toUpperCase();
    var fecha = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var hoy = new Intl.DateTimeFormat('es-Ch',options).format(fecha);
    this.setState({mesName: currMonthName, fecha: hoy})
  }


  render(){
    const { fecha, mesName } = this.state
    const { tokens, isFetching, user, handlePostTurno, turnos } = this.props
    const Dias = turnos.map((day) => {
      return (<Dia
                  key={day.id}
                  name={day.name}
                  data={day.data}
                  onPostTurno={handlePostTurno}
                  user={user}/>)
    });
    return(
      <div className="Semana col-xs-12">
        <div className="SemanaTitleContainer">
          <div className="SemanaTitleBox row between-lg col-xs-10">
            <div className="row col-lg-4 col-xs-8"><strong>Fecha: </strong><p>{ fecha }</p></div>
            <Clock />
            <div className="Tokens row col-lg-4 col-xs-12"><strong>Tokens disponibles: </strong><p>{tokens }</p></div>
          </div>
        </div>
        <div className="MesName col-xs-12 center-xs"><span>{ mesName }</span></div>
        <div className="SemanaContent row col-xs-12 center-xs">
          { Dias }
        </div>
      </div>
    )
  }
}
export default Semana
