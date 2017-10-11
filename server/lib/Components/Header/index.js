

$(document).ready(function(){
  $('#User-dropdown').dropdown({
    belowOrigin: false,
    constrain_width: false,
  });
  var pathArray = window.location.pathname.split( '/' );
  if(pathArray[1] == 'admin'){
    $('#Nav-Button').append('<a class="Nav-Button btn-floating btn-large waves-effect waves-light" href="#Turnos-Modal"><i class="material-icons">add</i></a>');
    $('#Nav-Admin').addClass('is-active');
  }
  if(pathArray[1] == 'group'){
    $('#Nav-Grupos').addClass('is-active');
  }
  if(pathArray[1] == 'turnos'){
    $('#Nav-Turnos').addClass('is-active');
  }
  if(pathArray[1] == 'anuncios'){
    $('#Nav-Anuncios').addClass('is-active');
  }
  if(pathArray[1] == 'perfil'){
    $('#Nav-Perfil').addClass('is-active');
  }
  $('.Nav-Button').leanModal();

  $('#chat-on').sideNav({
      menuWidth: 200, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
  $('#chat-off').sideNav('hide');
/*
  $( "#chat-on" ).click(function() {
    $('#slide-out').addClass('fixed');
  });
*/

});
