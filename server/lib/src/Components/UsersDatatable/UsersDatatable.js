import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import ReactDataGrid from 'react-data-grid/dist/react-data-grid.min.js';
import axios from 'axios';


const rowGetter = function(i){
  return _rows[i];
};

const columns = [

  {
    key: 'nombre',
    name: 'Nombre',
    sortable : true,
    width: 300,
    textAlign: 'left',
  },
  {
    key: 'email',
    name: 'Email',
    sortable : false,

  },
  {
    key: 'telefono',
    name: 'Teléfono',
    sortable : false,

  },
  {
    key: 'group',
    name: 'Group',
    sortable : false,

  },
  {
    key: 'tokens',
    name: 'Tokens',
    sortable : false,

  }
]

class UsersDatatable extends Component {
  constructor(){
    super();
    this.state = {
      rows: [{name:"carlos",email:"hola@hola",phone:"131242",id_group:"totus",tokens:"100"},
      {name:"juan",email:"hola@hola",phone:"131242",id_group:"totus",tokens:"100"}
    ],
    }
  }

  rowGetter(rowIdx){
    const user = this.state.rows[rowIdx];
    const aux ={
      nombre: user.name,
      email: user.email,
      telefono: user.phone,
      group: user.id_group,
      tokens: user.tokens
    }

    return aux;
  }
/*
  componentDidMount(){
      const allusers = [];
      axios.get('/group/getUsers')
        .then( response => {
          const users = response.data;
          this.setState({
            rows: users,
          })
      });
    }*/

  handleGridSort(sortColumn,sortDirection){
      const comparer = (a,b) => {
        if(sortDirection === 'ASC'){
          return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
        }else if(sortDirection === 'DESC'){
          return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
        }
      }
      let rows = sortDirection === 'NONE' ? this.state.rows.slice(0) : this.state.rows.sort(comparer);
      this.setState({rows : rows})
    }


  render(){
    return (
      <section className="Layout-Content row center-lg">
        <div className="card material-table col-lg-10 col-xlg-8">
          <div className="table-header"><span className="table-title">Lista de Funcionarios</span>
        <div className="actions"><a className="search-toggle waves-effect btn-flat nopadding" href="#"><i className="material-icons">search</i></a></div>
          </div>
          <ReactDataGrid
            onGridSort={(a,b) => this.handleGridSort(a,b)}
            columns={columns}
            rowGetter={data => this.rowGetter(data)}
            rowsCount={this.state.rows.length}
            minHeight={150}
            onRowUpdated={data => this.handleRowUpdated(data)}
            isScrolling={false}
            defaultPageSize={10}
            showCellBorders= {true}
            paginationToolbarProps={{
            pageSizes: [
              10,
              50,
              100
            ]
            }}
          />
        </div>
    </section>
      )
  }

}




export default UsersDatatable;
