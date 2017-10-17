import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { ReactTableDefaults } from 'react-table'
import matchSorter from 'match-sorter'
import axios from 'axios'

/*Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3,
  // etc...
})*/

const data = [{
  rut: '18082418-9',
  name: 'Carlos Riquelme',
  email: 'caarlos@live.cl',
  telefono: '+5691234567',
  direccion: 'Por ahi',
  tipo: true,
  tokens: 99
},
{
  rut: '20342898-9',
  name: 'Juan Tramolao',
  email: 'caarlos@live.cl',
  telefono: '+5691234567',
  direccion: 'Por ahi',
  tipo: false,
  tokens: 100
}]

const columns = [
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
  },
  {
   Header: 'Email',
   id: 'email',
   accessor: d => d.email,
   width: 200,
   filterMethod: (filter, rows) =>
     matchSorter(rows, filter.value, { keys: ["email"] }),
   filterAll: true,
 },{
    Header: 'Telefono',
    accessor: 'telefono',
    width: 130,
  },{
     Header: 'Direccion',
     accessor: 'direccion',
     width: 150,
   },
  {
     Header: 'Tipo',
     accessor: 'tipo',
     width: 80,
     id: "type",
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
    accessor: 'tokens',
    width: 70,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }]


class GroupList extends Component {
  constructor(){
    super();
    this.state={
      users: {},
      isFetching: false,
    }
    this.renderEditable = this.renderEditable.bind(this);
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }


  render() {
    return(
       <ReactTable
          data={data}
          columns={columns}
          loading= {false}
          showPagination= {true}
          showPaginationBottom= {true}
          showPageSizeOptions= {false}
          //pageSizeOptions= {[5, 10, 20, 30]}
          defaultPageSize= {10}
          filterable= {true}
          defaultSortMethod= {(a, b) => {
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
          }}
           style={{
              height: "570px" // This will force the table body to overflow and scroll, since there is not enough room
            }}
          /*onFetchData={(state, instance) => {
            // show the loading overlay
            this.setState({loading: true})
            // fetch your data
            Axios.post('mysite.com/data', {
              page: state.page,
              pageSize: state.pageSize,
              sorted: state.sorted,
              filtered: state.filtered
            })
              .then((res) => {
                // Update react-table
                this.setState({
                  data: res.data.rows,
                  pages: res.data.pages,
                  loading: false
                })
              })*/
        />)

  }

}

export default GroupList
