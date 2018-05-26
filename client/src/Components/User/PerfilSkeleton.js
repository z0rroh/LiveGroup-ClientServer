import React, {Component} from 'react';


class PerfilSkeleton extends Component{

  render(){
    return(
      <div className="Container">
        <div className="Perfil-Container-skeleton row center-lg">
          <div className="User-Edit-skeleton col-lg-8 col-xs-12">
            <div className="User-Edit-img-skeleton">
              <div className="user-img-skeleton pt-skeleton"></div>
            </div>
          </div>

        <div className="User-Info-skeleton col-lg-8 col-xs-12">
          <div className="User-Info-Datos-skeleton col-lg-6">
            <div className="Tittle-Element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="User-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="User-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="User-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="User-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="User-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="User-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="User-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
          </div>
          <div className="User-Info-Datos-skeleton col-lg-6">
            <div className="Tittle-Element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="Turno-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="Turno-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
            <div className="Turno-element-skeleton col-lg">
              <span className="pt-skeleton"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }
}
export default PerfilSkeleton;
