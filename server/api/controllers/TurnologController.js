/**
 * TurnologController
 *
 * @description :: Server-side logic for managing turnologs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var lang = require('lodash/lang');
var moment=require('moment');

 module.exports = {

   subscribe: function(req,res){
       var user = req.user;
       if(req.isSocket && user){
           Turnolog.find({group:user.group}).exec(function (err, turnologs) {
               Turnolog.subscribe(req,turnologs);
           });
           Turnolog.watch(req);
           sails.log( 'Usuario suscrito a turnolog con la id: ' + req.socket.id );
       }
   },

   getTurnos: (req,res)=>{

       var user = req.user;
       moment.locale('es-cl');
       var formatDate1 = moment().startOf('week').toDate();;
       var formatDate2 = moment().endOf('week').toDate();;
       Turnolog.find({group:user.group,estado: 'activo',despliegue: {$gte: formatDate1, $lte: formatDate2}}).populate('users')
       .exec(function(err,turnologs){
         var tokens = req.tokens;
         if(err) {
           return res.json({code:"FAIL", message:"Ah ocurrido un error inesperado"})
         }
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
           if ( turnologs[i].day === 'lunes' )
               lunes.push(turnologs[i]);
           if ( turnologs[i].day === 'martes' )
               martes.push(turnologs[i]);
           if ( turnologs[i].day === 'miércoles' )
               miercoles.push(turnologs[i]);
           if ( turnologs[i].day === 'jueves' )
               jueves.push(turnologs[i]);
           if ( turnologs[i].day === 'viernes' )
               viernes.push(turnologs[i]);
           if ( turnologs[i].day === 'sábado' )
               sabado.push(turnologs[i]);
           if ( turnologs[i].day === 'domingo' )
               domingo.push(turnologs[i]);
         }

         for(var i=0; i<7; i++){
           var aux;
           if( i === 0){
             aux = {
               name: "Lunes",
               id: "lunes",
               data: lunes
             }
             allDays.push(aux);
           }
           if( i === 1){
             aux = {
               name: "Martes",
               id: "martes",
               data: martes
             }
             allDays.push(aux);
           }
           if( i === 2){
             aux = {
               name: "Miercoles",
               id: "miércoles",
               data: miercoles
             }
             allDays.push(aux);
           }
           if( i === 3){
             aux = {
               name: "Jueves",
               id: "jueves",
               data: jueves
             }
             allDays.push(aux);
           }
           if( i === 4){
             aux = {
               name: "Viernes",
               id: "viernes",
               data: viernes
             }
             allDays.push(aux);
           }
           if( i === 5){
             aux = {
               name: "Sabado",
               id: "sábado",
               data: sabado
             }
             allDays.push(aux);
           }
           if( i === 6){
             aux = {
               name: "Domingo",
               id: "domingo",
               data: domingo
             }
             allDays.push(aux);
           }
         }

         res.json({code:"SUCCESS", allDays})
       });
   },

   postTurno: function (req,res) {

      var userSession = req.user;
       Turnolog.findOne(req.param('id')).populate('users')
       .then(function(turnolog){
         if(_.isEmpty(turnolog.users) === false){
             var resul= false;
             turnolog.users.map(user =>{
               if(user.id === userSession.id){
                 resul = true;
               }
             })
             if(resul){
                return res.json({code:"FAIL", message: "Ya has tomado este turno"});
             }
             if(userSession.tokens <= 0){
               return res.json({code:"FAIL", message: "No tienes tokens disponibles"});
             }
             if (resul===false && turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && userSession.tokens>0){
                 var actual = turnolog.cupoActual;
                 var parsed = parseInt(actual, 10);
                 parsed = parsed + 1;
                 turnolog.cupoActual = parsed;
                 var users = turnolog.users;
                 users.push(userSession);
                 Turnolog.update({id: turnolog.id},{cupoActual: parsed, users: users})
                 .exec(function(err, turnolog){
                    if(err){
                      return res.json({code: 'FAIL', message: 'Se produjo un error al actualizar turno'})
                    }
                    var tk = userSession.tokens;
                    tk = tk-1;
                    User.update({id:userSession.id},{tokens:tk}, function (err,user) {

                      if(err){
                        return res.json({code: 'FAIL', message: 'Se produjo un error al actualizar usuario'})
                      }
                      return res.json({code:"SUCCESS", message: "El turno fue tomado con exito"});
                    });
                 })
             }
           }
           else{
             if(userSession.tokens <= 0){
               return res.json({code:"FAIL", message: "No tienes tokens disponibles"});
             }
             if(turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && userSession.tokens>0){

                 var actual = turnolog.cupoActual;
                 var parsed = parseInt(actual, 10);
                 parsed = parsed + 1;
                 var users = [];
                 users.push(userSession);
                 Turnolog.update({id: turnolog.id},{cupoActual: parsed, users: users})
                 .exec(function (err,turnolog){
                    if(err){
                      return res.json({code: 'FAIL', message: 'Se produjo un error al actualizar turno'})
                    }
                    var tk = userSession.tokens;
                    tk = tk-1;
                    User.update({id:userSession.id},{tokens:tk}, function (err,user) {
                      
                      if(err){
                        return res.json({code: 'FAIL', message: 'Se produjo un error al actualizar usuario'})
                      }
                      return res.json({code:"SUCCESS", message: "El turno fue tomado con exito"});
                    });
                 })
              }
           }

       })
       .fail(function(err){
         res.json({code:"FAIL", message:"Ocurrio un problema al tomar el turno"})
       });
     },

     listTurnsFromDate: (req, res)=>{
       var user = req.user;
       moment.locale('es-cl');
       var dateFilter1 = req.param('date');
       var formatDate1 = moment(dateFilter1,'DD-MM-YYYY').toDate();
       var formatDate2 = moment(formatDate1).add(1,'days').toDate();
       Turnolog.find({group:user.group, despliegue: {$gte: formatDate1, $lt: formatDate2}}).populate('users')
       .exec((err,turnos)=>{
           if(err) {
             return res.json({code:"FAIL", message:"Ah ocurrido un error inesperado"})
           }
           var turnologs = [];
           for (var i in turnos){
             var turno={
              name: turnos[i].name,
              start: turnos[i].start,
              end: turnos[i].end,
              day: turnos[i].day,
              cupoTotal: turnos[i].cupoTotal,
              cupoActual: turnos[i].cupoActual,
              estado: turnos[i].estado,
              users: turnos[i].users,
              id: turnos[i].id
             }
             turnologs.push(turno);
           }
           return res.json({code: 'SUCCESS', turnos: turnologs})
         })

      },

 };
