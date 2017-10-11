/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name:{
  		type: 'string',
  		required: true

  	},
    estado:{
      type: 'boolean',
      defaulsTo: false
    },
  	description:{
  		type: 'text',
  		required: true

  	},
    ubication:{
      type: 'string',
      required: true
    },
  	image:{
   		type: 'string'
  	},
    key:{
      type: 'string'
    },
    users:{
      collection: 'user',
      via: 'group'
    },
    anuncios:{
      collection: 'anuncio',
      via: 'group'
    },
    turnos: {
      collection: 'turno',
      via: 'group'
    },
  },
  findGroupByKey: function(value,cb){
    Group.findOne({key:value}).exec(function (err, group) {
      if (err) return cb(err,null);
      if (!group){
        var err = {mesage:'Llave inválida'};
        return cb(err,null);
      }
      return cb(null,group);
    });
  }
};
