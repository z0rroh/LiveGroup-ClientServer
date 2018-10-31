import React, { Component } from 'react';
import Semana from './Semana.js';
import {io} from '../../io.js'
import axios from 'axios'
import { addToast } from '../../actions/Toast.js'
import { Intent } from '@blueprintjs/core'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'
moment.locale('es-cl');

class TurnoApp extends Component{
  constructor(props){
    super();
    this.state = {
      turnos:[],
      isFetching: true,
      tokens: props.user.tokens
    }
    this.handlePostTurno = this.handlePostTurno.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user.tokens !== this.state.tokens) {
      this.setState({tokens: nextProps.user.tokens})
    }
  }

  getTurnos = async () => {
    try{
      const request = await axios.get('/turnolog/getTurnos')
      const response = request.data
      switch (response.code) {
        case 'SUCCESS':
          this.setState({turnos: response.allDays, isFetching: false })
          break;
        case 'FAIL':
          this.props.addToast({
            intent: Intent.DANGER,
            message: response.data.message
          })
          this.setState({isFetching:false})
          break;
        default:
          this.setState({isFetching:false})
          break;
      }
    }catch(e){
      throw e
    }
  }

  async componentDidMount(){
    io.socket.get('/turnolog/subscribe', function(res) {
      console.log("Subscrito a turnos");
    });

    const getTurnos = await this.getTurnos()

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
    const setUserAttribute = this.props.setUserAttribute
    axios.post('/turnolog/postTurno',{id: id})
    .then((res)=>{
      switch (res.data.code) {
        case 'SUCCESS':
            this.props.addToast({
            intent: Intent.SUCCESS,
            message: res.data.message
          });
          let tokens = (this.state.tokens - 1)
          setUserAttribute("tokens", tokens)
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
      //console.log(err);
    })
  }

  verifyEmptyTurnos = ( turnos ) => {
    var isEmpty = true
    for (let i in turnos ){
      if (turnos[i].data.length){
        return isEmpty = false
      }
    }
    return isEmpty
  }

  whatRender(turnos, isFetching){
    const emptyTurnos = this.verifyEmptyTurnos(turnos)
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
    if(emptyTurnos){
      return( <div className="no-turnos">
                <div><i className="material-icons">access_time</i></div>
                  <h2>No hay turnos disponibles</h2>
             </div>)
    }else{
      return(
        <Semana
          user={this.props.user}
          handlePostTurno={this.handlePostTurno}
          tokens={this.state.tokens}
          isFetching={this.state.isFetching}
          turnos={this.state.turnos} />)
    }

  }

  static isPrivate = false;

  render(){
    const { turnos, isFetching } = this.state

    return(
      <div className="ContainerTurnos col-xs-12">
        {this.whatRender(turnos, isFetching)}
      </div>

    )
  }
}


TurnoApp.propTypes = {
  addToast: PropTypes.func.isRequired,
  turnos: PropTypes.array
};

const stateToProps = ({ auth }) => ({
  user: auth.user
})

export default connect(stateToProps,{addToast})(TurnoApp);
