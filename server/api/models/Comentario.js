/**
 * Comentario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var moment=require('moment');
module.exports = {

  attributes: {

    text:{
      type:'mediumtext',
      required: true
    },
    autor:{
      model: 'user'
    },
    anuncio:{
      model: 'anuncio'
    },

  },
  comentarioFindByGroup: function (options, cb) {
     Comentario.findOne({id:options.id}).populate('autor')
     .exec(function (err, comentario) {
       if (err) return cb(err);
       if (!comentario) return cb(new Error('Comentario not found.'));
       moment.locale('es');
       var now = moment(comentario.createdAt).fromNow();
       var comments = [];
       var autor = {
         id: comentario.autor.id,
         name: comentario.autor.name,
         user_img: comentario.autor.user_image
       }
       var newComment = {
         autor: autor,
         id: comentario.id,
         text: comentario.text,
         anuncio: comentario.anuncio,
         fecha: now
       }
       Comentario.publishCreate(newComment);
       cb(null,newComment);
     });
   },

};
