/**
 * Turnos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {

  attributes: {
    name:{
      type:'string',
      required: true
    },
    start:{
      type:'string',
      required: true
    },
    end:{
      type:'string',
      required: true
    },
    day:{
      type: 'string',
      required: true
    },
    cupoTotal:{
      type: 'int'
    },
    cupoActual:{
      type: 'int',
      defaultsTo: '0'
    },
    estado:{
      type: 'string',
      required: true
    },
    expiracion:{
      type: 'date'
    },
    group: {
      type: 'string',
      required: true
    },

    users:{
      collection: 'user',
      via: 'turnos',
      dominant: true
    },
    id_turno:{
      type:'string',
      required: true
    }
  },
  expiracion: function(day,start,cb){
      var now = moment();
      var monto = '';
      var salida = '';
      var array = start.split(':');
      if(now.format('d') >= day){
        monto = now.format('d')-day;
        salida = now.subtract(monto,'d');
        salida = salida.add(1,'week');
        salida = salida.set({'hour':parseInt(array[0]) -1,'minute':parseInt(array[1])})
      }
      else{
        monto = day - now.format('d');
        salida = now.add(monto,"d");
        salida = salida.set({'hour':parseInt(array[0]) -1,'minute':parseInt(array[1])})
      }
      return cb(salida.format());
    },
    validarExpiracion: function(date,cb){


    },

};
