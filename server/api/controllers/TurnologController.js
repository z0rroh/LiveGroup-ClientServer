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
       if(req.isSocket && req.session.User){
           Turnolog.find({group:req.session.User.group}).exec(function (err, turnologs) {
           // Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
               Turnolog.subscribe(req,turnologs);
           });
           Turnolog.watch(req);
           sails.log( 'Usuario suscrito a turnolog con la id: ' + req.socket.id );
       }
   },

   getTurnos: (req,res)=>{
       Turnolog.find({group:req.session.User.group,estado: 'activo'}).populate('users')
       .exec(function(err,turnologs){
         var tokens = req.session.User.tokens;
         if(err) {
           return res.json({code:"FAIL", message:"Ah ocurrido un error inesperado"})
         }
         /*if(!turnologs.length){
           return res.json({code:"NO_TURNOS", message:"No hay turnos creados"})
         }*/
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

         res.json({code:"SUCCESS", allDays})
       });
   },

   postTurno: function (req,res) {

         Turnolog.findOne(req.param('id')).populate('users')
                 .then(function(result){
                   var turnolog = result;
                   if(_.isEmpty(turnolog.users) === false){
                       var resul= false;
                       turnolog.users.map(user =>{
                         if(user.id === req.session.User.id){
                           resul = true;
                         }
                       })
                       if(resul){
                          return res.json({code:"FAIL", message: "Ya has tomado este turno"});
                       }
                       if(req.session.User.tokens <= 0){
                         return res.json({code:"FAIL", message: "No tienes tokens disponibles"});
                       }
                       if (resul===false && turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && req.session.User.tokens>0){
                           var actual = turnolog.cupoActual;
                           var parsed = parseInt(actual, 10);
                           parsed = parsed + 1;
                           turnolog.cupoActual = parsed;
                           turnolog.users.add(req.session.User.id);
                           turnolog.save(function(err){
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
                           });
                           var tk = req.session.User.tokens;
                           tk = tk-1;
                           req.session.User.tokens = tk;
                           req.session.save();
                           User.update({id:req.session.User.id},{tokens:tk},function(err, user) {
                             return res.json({code:"SUCCESS", message: "El turno fue tomado con exito"})
                           });
                       }
                     }
                     else{
                       if(req.session.User.tokens <= 0){
                         return res.json({code:"FAIL", message: "No tienes tokens disponibles"});
                       }
                       if(turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && req.session.User.tokens>0){

                         var actual = turnolog.cupoActual;
                         var parsed = parseInt(actual, 10);
                         parsed = parsed + 1;
                         turnolog.cupoActual = parsed;
                         turnolog.users.add(req.session.User.id);

                         turnolog.save(function(err){
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
                         });

                         var tk = req.session.User.tokens;
                         tk = tk-1;
                         req.session.User.tokens = tk;
                         req.session.save();
                         User.update({id:req.session.User.id},{tokens:tk},function(err, user) {
                           if (err){
                           }
                           return res.json({code:"SUCESS", message: "El turno fue tomado con exito"})
                         });
                       }

                     }

         })
         .fail(function(err){
           res.json({code:"FAIL", message:"Ocurrio un problema al tomar el turno"})
         });
       },


       listTurnsFromDate: (req, res)=>{
         var date = req.param('date');
         var formatDate = moment(date,'DD-MM-YYYY').format('YYYY-MM-DD');
         Turnolog.find({group:req.session.User.group, createdAt: { '>': formatDate, '<': moment(formatDate).add(1,'days').format() }}).populate('users')
         .exec((err,turnos)=>{
           if(err) {
             return res.json({code:"FAIL", message:"Ah ocurrido un error inesperado"})
           }
           var turnologs = [];
           for(var i in turnos){
             var aux = "";
             if( turnos[i].day === "0"){
               aux = "lunes"
             }
             if( turnos[i].day === "1"){
               aux = "martes"
             }
             if( turnos[i].day === "2"){
               aux = "miercoles"
             }
             if( turnos[i].day === "3"){
               aux = "jueves"
             }
             if( turnos[i].day === "4"){
               aux = "viernes"
             }
             if( turnos[i].day === "5"){
               aux = "sabado"
             }
             if( turnos[i].day === "6"){
               aux = "domingo"
             }
             var turno={
              name: turnos[i].name,
              start: turnos[i].start,
              end: turnos[i].end,
              day: aux,
              cupoTotal: turnos[i].cupoTotal,
              cupoActual: turnos[i].cupoActual,
              estado: turnos[i].estado,
              users: turnos[i].users,
              id: turnos[i].id
             }
             turnologs.push(turno);
           }
           return res.json({code: 'SUCCESS', turnos: turnologs})
         });

       }
 };
