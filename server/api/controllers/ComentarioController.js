/**
 * ComentarioController
 *
 * @description :: Server-side logic for managing comentarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		subscribe: function(req,res){
				if(req.isSocket && req.session.User){
						Comentario.find({id_group:req.session.User.id_group}).exec(function (err, comentarios) {
						// Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
								Comentario.subscribe(req, comentarios,['update','create','destroy']);
						});
						Comentario.watch(req);
						sails.log( 'Usuario suscrito a comentarios con la id: ' + req.socket.id );
				}
		},
		create: function(req, res){

			var commentObj={
				text: req.param('text'),
				autor: req.session.User.id,
				anuncio: req.param('anuncio')
			}
			Comentario.create(commentObj,function (err, comentario) {

				if(err){
					var noAnuncio=[{message: 'No se pudo publicar el comentario'}]
					req.session.flash={
							err: noAnuncio
					}
					return res.redirect('/anuncios');
				}
				//console.log("se creo bien el anuncio");

				var sucessAnuncio=[{message: 'Comentario creado correctamente'}]
				req.session.flash={
						err: sucessAnuncio
				}

				Comentario.comentarioFindByGroup(comentario, function(err, comentario){
						res.ok(comentario);
				});

			});
		},

};
