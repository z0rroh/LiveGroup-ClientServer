import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Semana from './Semana.js';
import io from '../../io.js'
import axios from 'axios'
import { addToast } from '../../actions/Toast.js'
import { Intent } from '@blueprintjs/core'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'

class TurnoApp extends Component{
  constructor(){
    super();
    this.state={
      turnos:[],
      tokens: null,
      isFetching: false,
      hayTurnos: false,
    }
    this.handlePostTurno = this.handlePostTurno.bind(this);
  }

  componentDidMount(){
    moment.locale('es-cl');
    this.setState({isFetching: true});
    io.socket.get('/turnolog/subscribe', function(res) {
      console.log("Subscrito a turnos");
    }.bind(this));
    axios.get('/turnolog/getTurnos')
    .then((res)=>{
      const turnos = res.data;
      switch (turnos.code) {
        case 'SUCCESS':
          this.setState({isFetching: false, turnos: turnos.allDays})
          break;
        case 'FAIL':
          this.props.addToast({
            intent: Intent.DANGER,
            message: res.data.message
          })
          this.setState({isFetching:false})
          break;
        default:
          this.setState({isFetching:false})
          break;
      }
    })
    .catch((err)=>{
      console.log(err);
    })

    io.socket.on('turnolog', function serverSentEvent(newTurno) {
      let prevState = [];
      let nextState = [];
      let auxArr;
      prevState = this.state.turnos;
      nextState = this.state.turnos;
      if(newTurno.data.day === "lunes")
        auxArr = 0;
      if(newTurno.data.day === "martes")
        auxArr = 1;
      if(newTurno.data.day === "miércoles")
        auxArr = 2;
      if(newTurno.data.day === "jueves")
        auxArr = 3;
      if(newTurno.data.day === "viernes")
        auxArr = 4;
      if(newTurno.data.day === "sábado")
        auxArr = 5;
      if(newTurno.data.day === "domingo")
        auxArr = 6;
      switch (newTurno.verb) {
        case 'updated':
          if(newTurno.data.estado === "activo"){
            for(let i = 0;i<prevState[auxArr].data.length;i++){
              if(prevState[auxArr].data[i].id === newTurno.id){
                //console.log(nextState[auxArr].data[i]);
                Object.assign(nextState[auxArr].data[i], newTurno.data);
              }
            }
            this.setState({turnos: nextState});
          }
          break;
        case 'created':
          //console.log(nextState[auxArr].data);
          var currentWeek = moment(newTurno.data.despliegue).isBetween(moment().startOf('week').subtract(1,'seconds'), moment().endOf('week'));
          if(currentWeek){
            nextState[auxArr].data.splice(0,0,newTurno.data)
            this.setState({turnos: nextState})
          }
          break;

        default:
          break;
      }

    }.bind(this));
  }
  handlePostTurno(id){

    axios.post('/turnolog/postTurno',{id: id})
    .then((res)=>{
      switch (res.data.code) {
        case 'SUCCESS':
            this.props.addToast({
            intent: Intent.SUCCESS,
            message: res.data.message
          })
          break;
        case 'FAIL':
          this.props.addToast({
            intent: Intent.DANGER,
            message: res.data.message
          })
          break;
        default:
          break;
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  whatRender(){
    const emptyTurnos = false;
    if(emptyTurnos){
      return( <div className="no-turnos">
                <div><i className="material-icons">access_time</i></div>
                  <h2>No hay turnos disponibles</h2>
             </div>)
    }else{
      return(
        <Semana
          handlePostTurno={this.handlePostTurno}
          tokens={this.state.tokens}
          isFetching={this.state.isFetching}
          turnos={this.state.turnos} />)
    }

  }

  static isPrivate = false;

  render(){
    return(
      <div className="ContainerTurnos col-xs-12">
        {this.whatRender()}
      </div>

    )
  }
}


TurnoApp.propTypes = {
  addToast: PropTypes.func.isRequired,
  turnos: PropTypes.array
};


export default connect(null,{addToast} )(TurnoApp);
