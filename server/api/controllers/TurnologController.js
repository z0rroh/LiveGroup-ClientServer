/**
 * TurnologController
 *
 * @description :: Server-side logic for managing turnologs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var lang = require('lodash/lang');
 module.exports = {

   index: function(req,res){
     res.view('turnolog/index');
   },
   entrar:function (req,res) {

       if(req.isSocket && req.method === 'POST') {
         Turnolog.findOne(req.param('id')).populate('users')
                 .then(function(result){
                   var turnolog = result;
                   if(_.isEmpty(turnolog.users) === false){
                       var resul= false;
                       turnolog.users.map(user =>{
                         if(user.id === req.session.User.id){
                           resul = true;
                           console.log("El usuario ya tomo este turno");
                         }
                       })

                       if (resul===false && turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && req.session.User.tokens>0){
                           console.log("El usuario no a tomado este turno")
                           var actual = turnolog.cupoActual;
                           var parsed = parseInt(actual, 10);
                           parsed = parsed + 1;
                           turnolog.cupoActual = parsed;
                           turnolog.users.add(req.session.User.id);

                           turnolog.save(function(err){
                             var sucessTurno=[{message: 'Se tomo correctamente el turno'}]
                             req.session.flash={
                                 err: sucessTurno
                             }

                           });
                           Turnolog.publishUpdate(turnolog.id, {
                           id: turnolog.id,
                           name: turnolog.name,
                           start: turnolog.start,
                           end: turnolog.end,
                           day: turnolog.day,
                           cupoTotal: turnolog.cupoTotal,
                           cupoActual: turnolog.cupoActual,
                           expiracion: turnolog.expiracion,
                           estado: turnolog.estado,
                           group: turnolog.group,
                           createdAt: turnolog.createdAt,
                           updatedAt: turnolog.updatedAt,
                           users: turnolog.users
                           });

                           var tk = req.session.User.tokens;

                           tk = tk-1;
                           req.session.User.tokens = tk;
                           req.session.save();
                           User.update({id:req.session.User.id},{tokens:tk},function(err, user) {
                             if (err){
                             }
                             res.send({tk: tk})
                           });
                       }
                     }
                     else{
                       if(turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && req.session.User.tokens>0){

                         var actual = turnolog.cupoActual;
                         var parsed = parseInt(actual, 10);
                         parsed = parsed + 1;
                         turnolog.cupoActual = parsed;
                         turnolog.users.add(req.session.User.id);

                         turnolog.save(function(err){
                           var sucessTurno=[{message: 'Se tomo correctamente el turno'}]
                           req.session.flash={
                               err: sucessTurno
                           }


                         });
                         Turnolog.publishUpdate(turnolog.id, {
                         id: turnolog.id,
                         name: turnolog.name,
                         start: turnolog.start,
                         end: turnolog.end,
                         day: turnolog.day,
                         cupoTotal: turnolog.cupoTotal,
                         cupoActual: turnolog.cupoActual,
                         expiracion: turnolog.expiracion,
                         estado: turnolog.estado,
                         group: turnolog.group,
                         createdAt: turnolog.createdAt,
                         updatedAt: turnolog.updatedAt,
                         users: turnolog.users
                         });

                         var tk = req.session.User.tokens;

                         tk = tk-1;
                         req.session.User.tokens = tk;
                         req.session.save();
                         User.update({id:req.session.User.id},{tokens:tk},function(err, user) {
                           if (err){
                           }
                           res.send({tk: tk})
                         });
                       }

                     }
                     //console.log(turnolog);
         })
         .fail(function(err){
           var failTurno=[{message: 'No se pudo tomar el turno'}]
           req.session.flash={
               err: failTurno
           }
           res.redirect('/turnolog/index');

         });

       }
      else if(req.isSocket){

         Turnolog.find({}).exec(function(e,turnologs){
            Turnolog.subscribe(req.socket,turnologs);
         });
         sails.log( 'Usuario suscrito a la id: ' + req.socket.id );

       }

       if(req.isSocket && req.method === 'GET') {
         Turnolog.find({group:req.session.User.id_group,estado: 'activo'},function(err,turnologs){
           if(err) {
             sails.log(err);
             sails.log("Error occurred in database operation");
           }
           else {
             //res.send(turnologs);
             var allDays = [];
             var tokensUpdate;
             var lunes = [];
             var martes = [];
             var miercoles = [];
             var jueves = [];
             var viernes = [];
             var sabado = [];
             var domingo = [];
             for(var i in turnologs){
               if ( turnologs[i].day === '0' )
                   lunes.push(turnologs[i]);
               if ( turnologs[i].day === '1' )
                   martes.push(turnologs[i]);
               if ( turnologs[i].day === '2' )
                   miercoles.push(turnologs[i]);
               if ( turnologs[i].day === '3' )
                   jueves.push(turnologs[i]);
               if ( turnologs[i].day === '4' )
                   viernes.push(turnologs[i]);
               if ( turnologs[i].day === '5' )
                   sabado.push(turnologs[i]);
               if ( turnologs[i].day === '6' )
                   domingo.push(turnologs[i]);
             }

             for(var i=0; i<7; i++){
               var aux;
               if( i === 0){
                 aux = {
                   name: "Lunes",
                   id: i,
                   data: lunes
                 }
                 allDays.push(aux);
               }
               if( i === 1){
                 aux = {
                   name: "Martes",
                   id: i,
                   data: martes
                 }
                 allDays.push(aux);
               }
               if( i === 2){
                 aux = {
                   name: "Miercoles",
                   id: i,
                   data: miercoles
                 }
                 allDays.push(aux);
               }
               if( i === 3){
                 aux = {
                   name: "Jueves",
                   id: i,
                   data: jueves
                 }
                 allDays.push(aux);
               }
               if( i === 4){
                 aux = {
                   name: "Viernes",
                   id: i,
                   data: viernes
                 }
                 allDays.push(aux);
               }
               if( i === 5){
                 aux = {
                   name: "Sabado",
                   id: i,
                   data: sabado
                 }
                 allDays.push(aux);
               }
               if( i === 6){
                 aux = {
                   name: "Domingo",
                   id: i,
                   data: domingo
                 }
                 allDays.push(aux);
               }
             }

             //console.log(allDays);

             res.send(allDays);
             }
         });
       }

   },
   tokens: function(req, res){
      if(req.isSocket && req.method === 'GET') {
       tokens = req.session.User.tokens;
       res.send({tokens: tokens});
      }
   },

   showEmpleados: function(req, res, next){

 		Turnolog.find({id_turno: req.param('id')}, function(err, turnolog){
 			res.view({
 				turnolog: turnolog
 			});
 		});

 	}

 };
