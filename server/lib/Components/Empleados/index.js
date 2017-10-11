


(function(window, document, undefined) {


  var factory = function($, DataTable) {
    "use strict";

    $('.search-toggle').click(function() {
      if ($('.hiddensearch').css('display') == 'none')
        $('.hiddensearch').slideDown();
      else
        $('.hiddensearch').slideUp();
    });

    /* Set the defaults for DataTables initialisation */
    $.extend(true, DataTable.defaults, {
      dom: "<'hiddensearch'f'>" +
        "tr" +
        "<'table-footer'lip'>",
      renderer: 'material'
    });

    /* Default class modification */
    $.extend(DataTable.ext.classes, {
      sWrapper: "dataTables_wrapper",
      sFilterInput: "form-control input-sm",
      sLengthSelect: "form-control input-sm"
    });

    /* Bootstrap paging button renderer */
    DataTable.ext.renderer.pageButton.material = function(settings, host, idx, buttons, page, pages) {
      var api = new DataTable.Api(settings);
      var classes = settings.oClasses;
      var lang = settings.oLanguage.oPaginate;
      var btnDisplay, btnClass, counter = 0;

      var attach = function(container, buttons) {
        var i, ien, node, button;
        var clickHandler = function(e) {
          e.preventDefault();
          if (!$(e.currentTarget).hasClass('disabled')) {
            api.page(e.data.action).draw(false);
          }
        };

        for (i = 0, ien = buttons.length; i < ien; i++) {
          button = buttons[i];

          if ($.isArray(button)) {
            attach(container, button);
          } else {
            btnDisplay = '';
            btnClass = '';

            switch (button) {

              case 'first':
                btnDisplay = lang.sFirst;
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'previous':
                btnDisplay = '<i class="material-icons">chevron_left</i>';
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'next':
                btnDisplay = '<i class="material-icons">chevron_right</i>';
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

              case 'last':
                btnDisplay = lang.sLast;
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

            }

            if (btnDisplay) {
              node = $('<li>', {
                  'class': classes.sPageButton + ' ' + btnClass,
                  'id': idx === 0 && typeof button === 'string' ?
                    settings.sTableId + '_' + button : null
                })
                .append($('<a>', {
                    'href': '#',
                    'aria-controls': settings.sTableId,
                    'data-dt-idx': counter,
                    'tabindex': settings.iTabIndex
                  })
                  .html(btnDisplay)
                )
                .appendTo(container);

              settings.oApi._fnBindAction(
                node, {
                  action: button
                }, clickHandler
              );

              counter++;
            }
          }
        }
        $('select').material_select();
      };

      // IE9 throws an 'unknown error' if document.activeElement is used
      // inside an iframe or frame.
      var activeEl;

      try {
        // Because this approach is destroying and recreating the paging
        // elements, focus is lost on the select button which is bad for
        // accessibility. So we want to restore focus once the draw has
        // completed
        activeEl = $(document.activeElement).data('dt-idx');
      } catch (e) {}

      attach(
        $(host).empty().html('<ul class="material-pagination"/>').children('ul'),
        buttons
      );

      if (activeEl) {
        $(host).find('[data-dt-idx=' + activeEl + ']').focus();
      }
    };

    /*
     * TableTools Bootstrap compatibility
     * Required TableTools 2.1+
     */
    if (DataTable.TableTools) {
      // Set the classes that TableTools uses to something suitable for Bootstrap
      $.extend(true, DataTable.TableTools.classes, {
        "container": "DTTT btn-group",
        "buttons": {
          "normal": "btn btn-default",
          "disabled": "disabled"
        },
        "collection": {
          "container": "DTTT_dropdown dropdown-menu",
          "buttons": {
            "normal": "",
            "disabled": "disabled"
          }
        },
        "print": {
          "info": "DTTT_print_info"
        },
        "select": {
          "row": "active"
        }
      });

      // Have the collection use a material compatible drop down
      $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
        "collection": {
          "container": "ul",
          "button": "li",
          "liner": "a"
        }
      });
    }

  }; // /factory

  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }

})(window, document);


$(document).ready(function(){
  var Empleadotable = $('#datatable').DataTable({
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
      { "sWidth": "5%", "aTargets": [ 0 ] },
      { "sWidth": "20%", "aTargets": [ 1,2,4 ] },
      { orderable: false, targets: -1 },
      { orderable: false, targets: -2 },
      { orderable: false, targets: -3 },
      { orderable: false, targets: -7 },
    ],
    "order": [[ 1, "desc" ]]
  });

  $('#datatable_filter input').attr("placeholder", "Buscar Empleados...");
  $('select').material_select();

    $(".Empleado-Edit").click(function(){
      if($(this).data("link") == "ajax"){
        var user = $(this).attr('value');
        var ajaxURL = '/user/show/' + user
        EmpleadoPage(ajaxURL);

        return false;
      }
    });

    var pathArray = window.location.pathname.split( '/' );
    if(pathArray[1] == 'admin'){
    $('.fixed-action-btn').append('<div class="fixed-action-btn" style="bottom: 45px; right: 24px;"><a href="/populateturnos" class="btn-floating btn-large waves-effect waves-light Button-Float"><i class="large material-icons">file_upload</i></a>  </div>');
    }

    function EmpleadoPage(url){
      $.get({
        url: url
      }).done(function(data){
        $("#Empleado-Name").val(data.name);
        $("#Empleado-Email").val(data.email);
        $("#Empleado-Phone").val(data.phone);
        $("#Empleado-Tokens").val(data.tokens);
        $('#Empleado-Modal').openModal();
        $("#Empleado-Send").attr("action",'/user/update/'+data.id);
      });
    }

    
});
