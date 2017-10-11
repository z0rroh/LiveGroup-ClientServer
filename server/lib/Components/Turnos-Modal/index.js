$(document).ready(function(){
  $('.clockpicker').clockpicker({
    align: 'left',
    donetext: 'Cerrar'
  });
});

$(document).ready(function(){
   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
   $('.modal-trigger').leanModal();
 });


 $(".modal-trigger").click(function(){
   if($(this).data("link") == "ajax"){
     var turno = $(this).attr('value');
     var ajaxURL = '/turnolog/showEmpleados/' + turno
     EmpleadoPage(ajaxURL);

     return false;
   }
 });

 function EmpleadoPage(url){
   $.get({
     url: url
   }).done(function(data){

   });
 }
