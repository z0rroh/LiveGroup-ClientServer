/**
 * Anuncios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/
var moment=require('moment');
var lang = require('lodash/lang');
var nestedPop = require('nested-pop');

module.exports = {

  attributes: {

  	text:{
  		type:'mediumtext',
  		required: true
  	},
  	group:{
  		model: 'group'
  	},
    autor:{
      model: 'user'
    },
    comment:{
      collection: 'comentario',
      via: 'anuncio',
    },

  },
  anunciosFindByGroup: function (options, cb) {
     var anuntios = [];
     Anuncio.find({group:options}).populate('autor').populate('comment').sort({ createdAt: 'desc' })
      .then(function(anuncios){
        return nestedPop(anuncios,{
          comment: {
            as: 'Comentario',
            populate:[
              'autor'
            ]
          }
        }).then(function(anuncios){
            moment.locale('es');
            anuncios.map(anuncio =>{
              var comments = []
              anuncio.comment.map(comment =>{
                var autor = {
                  id: comment.autor.id,
                  name: comment.autor.name,
                  user_img: comment.autor.user_image
                }
                var now = moment(comment.createdAt).fromNow();
                var newComment = {
                  autor: autor,
                  id: comment.id,
                  text: comment.text,
                  anuncio: comment.anuncio,
                  fecha: now
                }
                comments.push(newComment);
              })
              comments.reverse();
              var autor = {
                id: anuncio.autor.id,
                name: anuncio.autor.name,
                user_img: anuncio.autor.user_image
              }
              var now = moment(anuncio.createdAt).fromNow();
              var newAnuncio = {
                id: anuncio.id,
                autor: autor,
                text: anuncio.text,
                group: anuncio.group,
                fecha: now,
                comment: comments
              }
              anuntios.push(newAnuncio)
            })
            return cb(null,anuntios);
        }).catch(function(err){
            throw err;
        })
      }).catch(function(err){
          throw err;
      })

   },

   anuncioFindByGroup: function (options, cb) {
      Anuncio.findOne({id:options.id}).populate('autor').populate('comment')
      .exec(function (err, anuncio) {
        if (err) return cb(err);
        if (!anuncio) return cb(new Error('Anuncios not found.'));
        moment.locale('es');
        var now = moment(anuncio.createdAt).fromNow();
        var comments = [];
        var autor = {
          id: anuncio.autor.id,
          name: anuncio.autor.name,
          user_img: anuncio.autor.user_image
        }
        var newAnuncio = {
          autor: autor,
          id: anuncio.id,
          text: anuncio.text,
          comment: comments,
          fecha: now
        }
        Anuncio.publishCreate(newAnuncio);
        cb(null,newAnuncio);
      });
    }

};
