import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Semana from './Semana.js';
import io from '../../io.js'
import axios from 'axios'
import { addToast } from '../../actions/Toast.js'
import { Intent } from '@blueprintjs/core'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

class TurnoApp extends Component{
  constructor(){
    super();
    this.state={
      turnos:[],
      tokens: null,
      isFetching: false,
      hayTurnos: false
    }
    this.handlePostTurno = this.handlePostTurno.bind(this);
  }

  componentDidMount(){
    this.setState({isFetching: true})
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
        case 'NO_TURNOS':
          this.setState({isFetching:false, hayTurnos: true})
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
      console.log(newTurno);
      let prevState = [];
      let nextState = [];
      prevState = this.state.turnos;
      nextState = this.state.turnos;
      switch (newTurno.verb) {
        case 'updated':
            for(let i = 0;i<prevState[newTurno.data.day].data.length;i++){
              if(prevState[newTurno.data.day].data[i].id === newTurno.id){
                console.log(nextState[newTurno.data.day].data[i]);
                Object.assign(nextState[newTurno.data.day].data[i], newTurno.data);
              }
            }
            this.setState({turnos: nextState});
          break;
        case 'created':
          console.log(nextState[newTurno.data.day].data);
          nextState[newTurno.data.day].data.splice(0,0,newTurno.data)
          this.setState({turnos: nextState})
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
    if(this.state.hayTurnos){
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
    console.log(this.state.turnos);
    return(
      <div className="ContainerTurnos col-lg-12">
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
