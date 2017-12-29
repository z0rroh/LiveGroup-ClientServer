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
  	description:{
  		type: 'text',
  		required: true

  	},
    ubication:{
      type: 'string',
      required: true
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

};
