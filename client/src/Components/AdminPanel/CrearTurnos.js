import React, {Component} from 'react';
import { TimePicker } from "@blueprintjs/datetime";
import moment from 'moment';
import axios from 'axios'
import { addToast } from '../../actions/Toast.js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es';

class CrearTurnos extends Component {
  constructor(props){
    super(props);
    this.state={
      timeStart: "0:00",
      timeEnd: "0:00",
      name: "",
      cupo: 0,
      startDate: null,
      endDate: null,
    }
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChange(e){

    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  changeHour(time,name){
    var mo = moment(time).format('HH:mm')
    this.setState({[name]: mo})
  }


  onSubmit(e){
    e.preventDefault();
    axios.post('/turnos/create', {
      timeStart:this.state.timeStart,
      timeEnd: this.state.timeEnd,
      name: this.state.name,
      cupo: this.state.cupo,
      startDate: this.state.startDate,
      endDate: this.state.endDate})
    .then((response)=>{
      console.log(response);
      const res = response.data
      this.props.addToast({
        intent: Intent.SUCCESS,
        message: res.message
      })
      this.setState({
        timeStart: "0:00",
        timeEnd: "0:00",
        name: "",
        cupo: 0,
        startDate: null,
        endDate: null
      })
    })
    .catch((error)=>{
      const err = error.response.data;
      this.props.addToast({
        intent: Intent.WARNING,
        message: err.message
      })
    })
  }

  handleChangeStart(date){
    this.setState({startDate: date});

  }

  handleChangeEnd(date){
    this.setState({endDate: date});
  }

  render(){
    return(
      <div className="col-xs-12 crearTurnosContainer">
        <div className="col-xs-12 crearTurnosTitle">
          <h3>Creacion de turnos</h3>
        </div>
        <div className="col-xs-10 CrearTurnosFormContainer">
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="TurnoC-Info col-xs">
              <div className="col-xs"><h5>Informacion de turno</h5></div>
              <div className="Turno-Time row col-xs-12">
                <div className="Time-Range">
                  <span>Hora Inicio:</span>
                  <TimePicker
                    onChange={(newTime: Date) => this.changeHour(newTime,'timeStart')}
                    showArrowButtons={true}
                  />
                </div>
                <div className="Time-Range">
                  <span>Hora Termino:</span>
                  <TimePicker
                    onChange={(newTime: Date) => this.changeHour(newTime,'timeEnd')}
                    showArrowButtons={true}
                  />
                </div>
              </div>
              <div className="Turno-Name col-xs-12">
                <span>Nombre:</span>
                <input
                  onChange={(e) => this.handleChange(e)}
                  name="name"
                  value={this.state.name}
                  type="text"
                  className="pt-input"
                  placeholder="Ej: Turnos mañana..."
                  required="true"/>
              </div>
              <div className="Turno-Cupo col-xs-12">
                <span>Cupo:</span>
                <input
                  onChange={(e) => this.handleChange(e)}
                  name="cupo"
                  value={this.state.cupo}
                  type="number"
                  className="pt-input"
                  placeholder="Ej:10..."
                  required="true"/>
              </div>
            </div>
            <div className="Turno-Days row col-xs-12">
              <div className="col-xs-12">
                <h5>Seleccionar dias</h5>
              </div>
              <div className="row pickerContainer col-xs-6">
                <div className="col-xs-1 col-xs-offset-5">
                  <div className="row col-xs-12 end-xs">
                    <i className="fa fa-calendar fa-2x nav-icon"></i>
                  </div>
                </div>
                <div className="col-xs-6 start-xs">
                  <DatePicker
                      selected={this.state.startDate}
                      isClearable={true}
                      placeholderText=" Repetir Desde..."
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}
                      locale="es-cl"
                      dateFormat="DD/MM/YYYY"
                      minDate={moment()}
                    />
                </div>
              </div>
              <div className="row pickerContainer col-xs-6">
                <div className="row col-xs-1 end-xs">
                  <i className="fa fa-calendar fa-2x nav-icon"></i>
                </div>
                <div className="col-xs-6 start-xs">
                  <DatePicker
                      selected={this.state.endDate}
                      isClearable={true}
                      placeholderText=" Repetir Hasta..."
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}
                      locale="es-cl"
                      dateFormat="DD/MM/YYYY"
                      minDate={moment()}
                    />
                </div>
              </div>
            </div>
            <div className="TurnoC-Button col-xs-12">
              <input className="btn " type="submit" value="Enviar" />
            </div>
          </form>
        </div>
      </div>
    );
  }

}

CrearTurnos.propTypes = {
  addToast: PropTypes.func.isRequired
};

export default connect(null,{addToast })(CrearTurnos);
