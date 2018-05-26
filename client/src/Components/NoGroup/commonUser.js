import React, { Component } from 'react';

class commonUser extends Component {

  static isPrivate = false;
  render() {
      return (
        <div>
          <h4>WHOOPS!</h4><p>No te encuentras asociado a ningun grupo de trabajo, comunicate con tu empleador o vuelve en otro momento.</p>
       </div>)
  }

}

export default commonUser
