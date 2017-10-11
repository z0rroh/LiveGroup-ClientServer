import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Panel extends Component {
  constructor(){
    super();
  }


  render(){
    return(
      <div className="Panel-container">
        <nav className="main-menu">
            <ul>
              <li>
                <a href="#">
                    <i className="fa fa-home fa-2x"></i>
                    <span className="nav-text">
                        Grupo
                    </span>
                </a>
              </li>
              <li className="has-subnav">
                  <a href="#">
                      <i className="fa fa-laptop fa-2x"></i>
                      <span className="nav-text">
                          Crear Turnos
                      </span>
                  </a>

              </li>
              <li className="has-subnav">
                  <a href="#">
                     <i className="fa fa-list fa-2x"></i>
                      <span className="nav-text">
                          Buscar Turnos
                      </span>
                  </a>

              </li>
              <li className="has-subnav">
                  <a href="#">
                     <i className="fa fa-folder-open fa-2x"></i>
                      <span className="nav-text">
                          Pages
                      </span>
                  </a>

              </li>
              <li>
                  <a href="#">
                      <i className="fa fa-bar-chart-o fa-2x"></i>
                      <span className="nav-text">
                          Graphs and Statistics
                      </span>
                  </a>
              </li>
              <li>
                  <a href="#">
                      <i className="fa fa-font fa-2x"></i>
                      <span className="nav-text">
                          Typography and Icons
                      </span>
                  </a>
              </li>

            </ul>
        </nav>
      </div>
    );
  }

}




export default Panel;
