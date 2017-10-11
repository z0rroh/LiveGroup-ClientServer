
$(document).ready(function(){

  var Turnotable = $('#datatableTurno').DataTable({
    "language":{
      "lengthMenu": "Filas por página _MENU_",
      "info": "Página  _PAGE_ de _PAGES_",
      "infoEmpty": "No hay registros para mostrar",
      "sSearch": "",
      "emptyTable": "No hay registros para mostrar",
      "oPaginate": {
      	"sFirst":    	"Primero",
      	"sPrevious": 	"Anterior",
      	"sNext":     	"Siguiente",
      	"sLast":     	"Último"
      },
    },
    "bAutoWidth" : false,
    "aoColumnDefs": [
      { "sWidth": "10%", "aTargets": [ 0,2,3,4,5,6 ] },
      { "sWidth": "15%", "aTargets": [ 1] },
    ],
    "order": [[ 1, "desc" ]]
  });
  $('#datatableTurno_filter input').attr("placeholder", "Buscar Turno...");



});
