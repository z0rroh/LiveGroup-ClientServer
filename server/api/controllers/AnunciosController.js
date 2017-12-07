/**
 * AnunciosController
 *
 * @description :: Server-side logic for managing anuncios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment=require('moment');

module.exports = {

	index: function(req,res){
		res.view('anuncios/index');
	},
	subscribe: function(req,res){

			if(req.isSocket && req.session.User){
					Anuncio.find({group:req.session.User.group}).exec(function (err, anuncios) {
					// Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
							Anuncio.subscribe(req, anuncios,['update','create','destroy']);
					});
					Anuncio.watch(req);
					sails.log( 'Usuario suscrito a anuncios con la id: ' + req.socket.id );
			}
	},
	create: function(req, res){
		var anuncioObj={
			text: req.param('text'),
			autor: req.session.User.id,
			group: req.session.User.group
		}

		Anuncio.create(anuncioObj,function (err, anuncio) {

			if(err){
				var noAnuncio=[{message: 'No se creo el anuncio'}]
				req.session.flash={
						err: noAnuncio
				}
				return res.redirect('anuncios/new');
			}

			var sucessAnuncio=[{message: 'Anuncio creado correctamente'}]
			req.session.flash={
					err: sucessAnuncio
			}
			Anuncio.anuncioFindByGroup(anuncio, function(err, anuncio){
					res.ok(anuncio);
			})

		});

	},
	getAnuncios: function(req, res){

		Anuncio.anunciosFindByGroup(req.session.User.group, function(err, anuncios){
					res.ok(anuncios);
			});
	}

};
