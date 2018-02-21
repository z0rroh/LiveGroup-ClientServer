import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { ReactTableDefaults } from 'react-table'
import matchSorter from 'match-sorter'
import axios from 'axios'
import { DateInput, IDateFormatProps } from "@blueprintjs/datetime";
import { Position } from "@blueprintjs/core";

/*Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3,
  // etc...
})*/

class GroupList extends Component {
  constructor(){
    super();
    this.state={
      users: [],
      isFetching: false,
      date: ""
    }
    this.renderEditable = this.renderEditable.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.defaultSort = this.defaultSort.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const users = [...this.state.users];
          users[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ users });
          console.log(users[cellInfo.index].id);
          var columnId = cellInfo.column.id;
          var id = users[cellInfo.index].id;
          var param = { [columnId]: users[cellInfo.index][cellInfo.column.id]}

        }}
        dangerouslySetInnerHTML={{
          __html: this.state.users[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  fetchData(state, instance){
    this.setState({isFetching: true})
    axios.get('/groupList')
      .then((res) => {
        console.log(res.data);
        this.setState({
          users: res.data,
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

  onSubmit(){

  }

  handleKeyDown (e) {

  };

  handleDateChange(date){
    this.setState({date: date });
  }

  render() {
    const { users, isFetching, date } = this.state;
    return(
      <div className="col-xs-12 ">
        <div className="col-xs-12 addUsersContainer">
          <div className="col-xs-12 addUsersTitle">
            <h3>Buscar Turnos</h3>
          </div>
          <div className="col-xs-10 addUsersFormContainer row">
            <div className="col-xs-6 addUsersEmail">
              <form
                onSubmit={(e) => this.onSubmit(e)}
                onKeyDown={(e) => { this.handleKeyDown(e); }}>
                <span>Selecciona un dia:</span>
                <DateInput
                  placeholder="Buscar dia especifico"
                  value={this.state.date}
                  onChange={this.handleDateChange}
                  format="DD/MM/YYYY"
                  popoverProps={Position.TOP}
                />
              </form>
            </div>
            <div className="addUsersSearchButton col-xs-6">
              <input
                onClick={this.onSubmit}
                className="btn"
                type="submit"
                value="Buscar"/>
            </div>
          </div>
        </div>
        {
          date &&
          <div className="col-xs-12 crearTurnosContainer">
            <div className="col-xs-12 crearTurnosTitle">
              <h3>Listar Turnos</h3>
            </div>
           <ReactTable
              data={users}
              columns={[
                {
                  Header: 'RUT',
                  id: 'rut',
                  accessor: d => d.rut, // String-based value accessors!
                  width: 130,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["rut"] }),
                  filterAll: true,
                  Cell: this.renderEditable
                }, {
                  Header: 'Name',
                  id: 'name',
                  accessor: d => d.name,
                  width: 250,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                  filterAll: true,
                  Cell: this.renderEditable
                },
                {
                 Header: 'Email',
                 id: 'email',
                 accessor: d => d.email,
                 width: 200,
                 filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["email"] }),
                 filterAll: true,
                 Cell: this.renderEditable
               },{
                  Header: 'Telefono',
                  accessor: 'telefono',
                  width: 130,
                  Cell: this.renderEditable
                },{
                   Header: 'Direccion',
                   accessor: 'direccion',
                   width: 150,
                   Cell: this.renderEditable
                 },
                {
                   Header: 'Tipo',
                   id: 'admin',
                   accessor: 'tipo',
                   width: 80,
                   id: "type",
                   Cell: this.renderEditable,
                   Cell: ({ value }) => (value === true ? "Admin" : "Comun"),
                   filterMethod: (filter, row) => {
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
                 },
               {  Header: 'Tokens',
                  id: 'tokens',
                  accessor: 'tokens',
                  width: 70,
                  Cell: props => <span className='number'>{props.value}</span>,
                  Cell: this.renderEditable
                }]}
              loading= {isFetching}
              showPagination= {true}
              showPaginationBottom= {true}
              showPageSizeOptions= {false}
              //pageSizeOptions= {[5, 10, 20, 30]}
              defaultPageSize= {14}
              filterable= {true}
              defaultSortMethod= {this.defaultSort}
              style={{
                 height: "auto"
               }}
              onFetchData={this.fetchData}
            />
          </div>
        }

    </div>)

  }

}

export default GroupList
