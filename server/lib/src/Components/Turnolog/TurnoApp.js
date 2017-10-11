import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Semana from './Semana.js';


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
    io.socket.get('/turnolog/tokens', function(tokens) {
      this.setState(tokens);
    }.bind(this));
    io.socket.get('/turnolog/entrar', function(turnos) {
      var state = true
      for(let i=0; i<turnos.length; i++){
        if (turnos[i].data.length >0){
          state = false
        }
      }
      if(state === true){
        this.setState({hayTurnos: true})
      }
      this.setState({isFetching:false,turnos: turnos});
    }.bind(this));
    io.socket.on('turnolog', function serverSentEvent(updateTurno) {
      console.log(updateTurno);
      let prevState = [];
      let nextState = [];
      prevState = this.state.turnos;
      nextState = this.state.turnos;
      for(let i = 0;i<prevState[updateTurno.data.day].data.length;i++){
        if(prevState[updateTurno.data.day].data[i].id === updateTurno.id){
          console.log(nextState[updateTurno.data.day].data[i]);
          Object.assign(nextState[updateTurno.data.day].data[i], updateTurno.data);
        }
      }
      this.setState({turnos: nextState});
    }.bind(this));
  }
  handlePostTurno(id){
    var data = {id:id};
    io.socket.post('/turnolog/entrar/',data,(resData) => {
      this.setState({tokens: this.state.tokens-1});
    });
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

  render(){
    return(
      <div className="col-lg-12">
        {this.whatRender()}
      </div>

    )
  }
}


export default TurnoApp
