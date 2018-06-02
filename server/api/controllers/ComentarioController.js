/**
 * ComentarioController
 *
 * @description :: Server-side logic for managing comentarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	subscribe: function(req,res){
			var user = req.user;
			if(req.isSocket && user){
					Comentario.find({group: user.group}).exec(function (err, comentarios) {
							Comentario.subscribe(req, comentarios);
					});
					Comentario.watch(req);
					sails.log( 'Usuario suscrito a comentarios con la id: ' + req.socket.id );
			}
	},
	create: function(req, res){
			var user = req.user;

			var commentObj={
				text: req.param('text'),
				autor: user.id,
				anuncio: req.param('anuncio')
			}
			Comentario.create(commentObj,function (err, comentario) {

				if (err){
					return res.json({
					code: 'FAIL',
					message: 'No se pudo crear el comentario'
					});
				}
				Comentario.comentarioFindByGroup(comentario, function(err, comentario){
					return res.json({
						code: 'SUCCESS',
						anuncio: "Comentario creado correctamente"
					});
				});

			});
	},

};
