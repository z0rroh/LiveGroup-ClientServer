/*
* app Turno
*/

import React, { Component } from 'react';
import {Button, Intent, Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";
import PropTypes from 'prop-types';

class Turno extends Component {

  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      user: this.props.user,
    }

  }

  handleClick(e, id){
    this.props.onPostTurno(id);
  }

  render(){
    var full = false;
    let porcentaje = (parseInt(this.props.data.cupoActual) * 100)/parseInt(this.props.data.cupoTotal);
      porcentaje = porcentaje+"%";
    let datermianteStyle = { width: porcentaje};
    if(porcentaje === "100%"){
      var full = true
    }
    const take = this.props.data.users.filter((usuario) => usuario.id === this.state.user.id);

    const users = this.props.data.users.map((user)=>{
      return (
        <div key={user.id} id={user.id} className="Turno-user-element row col-xs-12 middle-xs">
          <div className="Turno-user-element-img col-xs-2 row middle-xs">
            <img src={"/images/avatars/"+user.user_image}/>
          </div>
          <div className="Turno-user-element-name col-xs-10">
            <p>{user.name}</p>
          </div>
        </div>)
    })

    return(
      <section className="Turno col-lg-12 col-xs-5 card">
        <div className="Turno-Content">
          <div className="row center-xs">
            <Popover
                interactionKind={PopoverInteractionKind.HOVER}
                popoverClassName="pt-popover-content-sizing"
                position={Position.TOP}>
                <div className="Turno-Info col-lg-12 col-xs-12">
                  <h5>{this.props.data.name}</h5>
                  <p>{this.props.data.start} - {this.props.data.end}</p>
                </div>
                {
                  users.length ? ( <div className="Turno-users-container col-xs-12">
                                     <div className="Turno-users-tittle row col-xs-12 center-xs">
                                       <strong>Usuarios en Turno</strong>
                                     </div>
                                     {users}
                                   </div>) : null
                }
            </Popover>
            <div className={full ? "Turno-Button-Full row col-lg-12 col-xs-12 center-xs" : take.length ? "Turno-Button-Take row col-lg-12 col-xs-12 center-xs" : "Turno-Button row col-lg-12 col-xs-12 center-xs"}>
                <a onClick={(e)=>this.handleClick(e,this.props.data.id)} className="row btn waves-effect waves-light col-xs-10 col-sm-7 col-md-5 col-lg-10 center-xs middle-xs">
                <i className="material-icons">{full ? 'block' : take.length ? 'remove_circle' : 'add_box'}</i>
                </a>
            </div>
            <div className="Turno-Log col-lg-12 col-xs-12">
              <h5> {this.props.data.cupoActual}/{this.props.data.cupoTotal}</h5>
            </div>
          </div>
        </div>
        <div className="Turno-progress progress col-xs-12" data-placeholder="1/5">
          <div className={full ? "determinate Turno-progress-full" : "determinate"} style={datermianteStyle}></div>
        </div>
      </section>
    )
  }
};

Turno.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array
};

export default Turno;
