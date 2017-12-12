import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { TimePicker,TimePickerPrecision } from "@blueprintjs/datetime";
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
      timeStart: "00:00",
      timeEnd: "00:00",
      name: "",
      cupo: 0,
      todos: false,
      lunes: {id:0, value: false},
      martes: {id:1, value: false},
      miercoles: {id:2, value: false},
      jueves: {id:3, value: false},
      viernes: {id:4, value: false},
      sabado: {id:5, value: false},
      domingo: {id:6, value: false}
    }

  }

  handleChange(e){

    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleCheckChange(e){
    const target = e.target;
    const value = target.checked
    const name = target.name;
    const id = target.id
    if(name === "todos"){
      this.setState({
        todos: target.checked,
        lunes: {id:0, value: target.checked},
        martes: {id:1, value: target.checked},
        miercoles: {id:2, value: target.checked},
        jueves: {id:3, value: target.checked},
        viernes: {id:4, value: target.checked},
        sabado: {id:5, value: target.checked},
        domingo: {id:6, value: target.checked},
      })
    }else{
      this.setState({
        [name]: {id: id, value: value}
      });
    }
  }

  changeHour(time,name){
    var mo = moment(time).format('HH:mm')
    this.setState({[name]: mo})
  }


  onSubmit(e){
    e.preventDefault();
    const dias = [];
    if(this.state.todos){
      dias.push(this.state.lunes, this.state.martes, this.state.miercoles, this.state.jueves, this.state.viernes, this.state.sabado, this.state.domingo)
    }else{
      if(this.state.lunes.value){
        dias.push(this.state.lunes)
      }
      if(this.state.martes.value){
        dias.push(this.state.martes)
      }
      if(this.state.miercoles.value){
        dias.push(this.state.miercoles)
      }
      if(this.state.jueves.value){
        dias.push(this.state.jueves)
      }
      if(this.state.viernes.value){
        dias.push(this.state.viernes)
      }
      if(this.state.sabado.value){
        dias.push(this.state.sabado)
      }
      if(this.state.domingo.value){
        dias.push(this.state.domingo)
      }
    }

    axios.post('/turnos/create', {
      timeStart:this.state.timeStart,
      timeEnd: this.state.timeEnd,
      name: this.state.name,
      cupo: this.state.cupo,
      dias: dias})
    .then((response)=>{
      console.log(response);
      const res = response.data
      this.props.addToast({
        intent: Intent.SUCCESS,
        message: res.message
      })
      this.setState({
        timeStart: "00:00",
        timeEnd: "00::00",
        name: "",
        cupo: 0
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

  render(){
    return(
      <div className="col-lg-12 crearTurnosContainer">
        <div className="col-lg-12 crearTurnosTitle">
          <h3>Creacion de turnos</h3>
        </div>
        <div className="col-lg-10 CrearTurnosFormContainer">
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="TurnoC-Info col-lg">
              <div className="col-lg"><h5>Informacion de turno</h5></div>
              <div className="Turno-Time row col-lg-12">
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
            <div className="Turno-Days col-lg">
              <div className="col-lg"><h5>Seleccionar dias</h5></div>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  name="todos"
                  checked={this.state.todos}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Todos
              </label>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  id="0"
                  name="lunes"
                  checked={this.state.lunes.value}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Lunes
              </label>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  id="1"
                  name="martes"
                  checked={this.state.martes.value}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Martes
              </label>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  id="2"
                  name="miercoles"
                  checked={this.state.miercoles.value}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Miercoles
              </label>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  id="3"
                  name="jueves"
                  checked={this.state.jueves.value}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Jueves
              </label>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  id="4"
                  name="viernes"
                  checked={this.state.viernes.value}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Viernes
              </label>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  id="5"
                  name="sabado"
                  checked={this.state.sabado.value}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Sabado
              </label>
              <label className="pt-control pt-checkbox pt-inline">
                <input
                  id="6"
                  name="domingo"
                  checked={this.state.domingo.value}
                  onChange={(e) => this.handleCheckChange(e)}
                  type="checkbox" />
                <span className="pt-control-indicator"></span>
                Domingo
              </label>

            </div>
            <div className="TurnoC-Button col-lg-12">
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
