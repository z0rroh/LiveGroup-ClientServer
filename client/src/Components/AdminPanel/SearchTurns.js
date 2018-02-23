import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table'
import matchSorter from 'match-sorter'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import { Position } from "@blueprintjs/core";
import moment from 'moment'


class GroupList extends Component {
  constructor(){
    super();
    this.state={
      turnos: [],
      isFetching: false,
      date: null,
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(){
    this.setState({isFetching: true})
    var date = this.state.date;
    var formatDate = moment(date).format('DD/MM/YYYY');
    this.setState({isFetching: true})
    axios.get('/listTurnsFromDate',{params: {date: formatDate}})
      .then((res) => {
        this.setState({
          turnos: res.data.turnos,
          isFetching: false
        })
      })
  }

  handleDateChange(date){
    this.setState({isFetching: true, turnos: [],date: date });
    var date = date;
    var formatDate = moment(date).format('DD/MM/YYYY');
    this.setState({isFetching: true})
    axios.get('/listTurnsFromDate',{params: {date: formatDate}})
      .then((res) => {
        this.setState({
          turnos: res.data.turnos,
          isFetching: false
        })
      })
  }


  defaultSort(a, b){
    a = (a === null || a === undefined) ? -Infinity : a
    b = (b === null || b === undefined) ? -Infinity : b
    a = a === 'string' ? a.toLowerCase() : a
    b = b === 'string' ? b.toLowerCase() : b
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    return 0
  }

  render() {

    const { turnos, isFetching, date, show } = this.state;

    return(
      <div className="col-xs-12 ">
        <div className="col-xs-12 searchTurnsContainer">
          <div className="col-xs-12 searchTurnsTitle">
            <h3>Buscar Turnos</h3>
          </div>
          <div className="row col-xs-10 searchTurnsFormContainer middle-xs">
            <div className="row col-xs-6 searchTurnsFormBox">
                <div className="row col-xs-5 end-xs middle-xs">
                   <strong>Selecciona un dia:</strong>
                </div>
                <div className="row col-xs-5 start-xs pickerContainer">
                  <DatePicker
                      isClearable={true}
                      placeholderText="Dia/Mes/Año"
                      withPortal
                      locale="es-cl"
                      dateFormat="DD/MM/YYYY"
                      selected={this.state.date}
                      onChange={this.handleDateChange}/>
                </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 searchTurnsResContainer">
          <div className="col-xs-12 searchTurnsResContainer">
            <ReactTable
              noDataText="No Turnos!"
              data={turnos}
              SubComponent={ row =>{
                const users = row.original.users;
                const usersObj= Object.assign([], users);
                return(
                <div style={{padding: '15px'}}>
                  <ReactTable
                    data={usersObj}
                    noDataText="No Usuarios!"
                    columns={[
                      {
                        Header: 'RUT',
                        id: 'rut',
                        accessor: "rut",
                        width: 130,
                      },
                      {
                        Header: 'Name',
                        id: 'name',
                        accessor: "name",
                      },
                      {
                       Header: 'Email',
                       id: 'email',
                       accessor: "email",
                     },
                      {
                        Header: 'Tipo',
                        id: 'admin',
                        accessor: 'admin',
                        Cell: ({ value }) => (value === true ? "Admin" : "Comun"),
                        filterMethod: (filter, row) => {
                           console.log(filter);
                           console.log(row);
                           console.log(row[filter.id]);
                           if (filter.value === "all") {
                             return true;
                           }
                           if (filter.value === "true") {
                             return row[filter.id] === true;
                           }
                           return row[filter.id] === false;
                         },
                         Filter: ({ filter, onChange }) =>
                           <select
                             onChange={(event) => onChange(event.target.value)}
                             style={{ width: "100%" }}
                             value={filter ? filter.value : "all"}>
                             <option value="all">Todos</option>
                             <option value="true">Admin</option>
                             <option value="false">Comun</option>
                           </select>
                       }
                    ]}
                    style={{
                       height: "auto"
                     },{
                       border: "1px solid rgba(0,0,0,0.3)"
                     }}
                    defaultPageSize={3}
                    filterable= {true}
                    showPagination={true}
                  />
              </div>);}}
              columns={[ {
                Header: "Información",
                accessor: "info",
                columns: [
                  {
                    Header: "Nombre",
                    id: "name",
                    accessor: "name",
                  },
                  {
                    Header: "Día",
                    accessor: "day",
                    width: 110,
                    filterable: false
                  },
                  {
                    Header: "Usuarios",
                    accessor: "users",
                    width: 130,
                    filterable: false,
                    expander: true,
                    Expander: ({ isExpanded, ...rest }) =>
                      <div>
                        {isExpanded
                          ? <span>&#x2299;</span>
                          : <span>&#x2295;</span>}
                      </div>,
                    style: {
                      cursor: "pointer",
                      fontSize: 25,
                      padding: "0",
                      textAlign: "center",
                      userSelect: "none"
                    }
                  },
                  {
                    Header: "Estado",
                    accessor: "estado",
                    id: "state",
                    width: 110,
                    Cell: ({ value }) => (value === "activo" ? "Activo" : "Expirado"),
                    filterMethod: (filter, row) => {

                         if (filter.value === "all") {
                           return true;
                         }
                         if (filter.value === "true") {
                           return row[filter.id] === "activo";
                         }

                         return row[filter.id] === "expirado";
                     },
                     Filter: ({ filter, onChange }) =>
                       <select
                         onChange={(event) => onChange(event.target.value)}
                         style={{ width: "100%" }}
                         value={filter ? filter.value : "all"}>
                         <option value="all">Todos</option>
                         <option value="true">Activo</option>
                         <option value="false">Expirado</option>
                       </select>
                  }
                ]
              }, {
                 Header: "Periodo",
                 columns: [
                   {
                     Header: "Hora Inicio",
                     accessor: "start",
                     width: 110,
                   },
                   {
                     Header: "Hora Termino",
                     accessor: "end",
                     width: 110,
                   }
                 ]
               },{
                  Header: "Cupos",
                  columns: [
                    {
                      Header: "Cupo Logrado",
                      accessor: "cupoActual",
                      width: 110,
                      filterable: false
                    },
                    {
                      Header: "Cupo Total",
                      accessor: "cupoTotal",
                      width: 110,
                      filterable: false
                    }
                  ]
                }]}
               loading= {isFetching}
               filterable= {true}
               showPagination= {true}
               showPaginationBottom= {true}
               showPageSizeOptions= {false}
               defaultPageSize= {10}
               style={{
                  height: "auto"
                },{
                  border: "none"
                }}

               onFetchData={this.onSubmit}
               defaultSortMethod= {this.defaultSort}
             />
          </div>
        </div>

    </div>)

  }

}

export default GroupList
