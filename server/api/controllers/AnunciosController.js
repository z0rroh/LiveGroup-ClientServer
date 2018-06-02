/**
 * AnunciosController
 *
 * @description :: Server-side logic for managing anuncios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment=require('moment');

module.exports = {

	subscribe: function(req,res){

		var user = req.user;
		if(req.isSocket && user){
				Anuncio.find({group: user.group}).exec(function (err, anuncios) {
						Anuncio.subscribe(req, anuncios);
				});
				Anuncio.watch(req);
				sails.log( 'Usuario suscrito a anuncios con la id: ' + req.socket.id );
		}
	},

	create: function(req, res){

		var user = req.user;
		var anuncioObj={
			text: req.param('text'),
			autor: user.id,
			group: user.group
		}
		Anuncio.create(anuncioObj,function (err, anuncio) {

			if (err){
				return res.json({
				code: 'FAIL',
				message: 'No se pudo crear el anuncio'
				});
			}
			Anuncio.anuncioFindByGroup(anuncio, function(err, anuncio){
				return res.json({
					code: 'SUCCESS',
					anuncio: "Anuncio creado correctamente"
				});
			})

		});

	},

	getAnuncios: function(req, res){

		var user = req.user;
		Anuncio.anunciosFindByGroup(user.group, function(err, anuncios){
					res.ok(anuncios);
			});
	}

};
