import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class GroupList extends Component {
  constructor(){
    super();
  }


  render(){
    return(
      <section className="Layout-Content row center-lg">
          <div className="card material-table col-lg-10 col-xlg-8">
            <div className="table-header"><span className="table-title">Lista de Funcionarios</span>
              <div className="actions"><a className="search-toggle waves-effect btn-flat nopadding" href="#"><i className="material-icons">search</i></a></div>
            </div>
            <table id="datatable">
              <thead>
                <tr>
                  <th> </th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Grupo</th>
                  <th className="textCenter">Tokens</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="Empleados-Item">
                  <th><img className="Empleado-Image" src="/images/avatars/default_user.png"/></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <select className="subGroups" id="subGroups" multiple="" data-link="ajax" >
                      <option value=""></option>
                    </select>
                  </th>
                  <th className="textCenter">
                    <p></p>
                  </th>
                  <th>
                    <a className="btn-flat Empleado-Edit"><i className="material-icons">edit</i></a>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
    );
  }

}

export default GroupList
