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
			var infoUser = {
				name: req.session.User.name,
				group: req.session.User.id_group
			}
			if(req.isSocket && req.session.User){
					Anuncio.find({id_group:req.session.User.id_group}).exec(function (err, anuncios) {
					// Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
							Anuncio.subscribe(req, anuncios,['update','create','destroy']);
					});
					Anuncio.watch(req);
					sails.log( 'Usuario suscrito a anuncios con la id: ' + req.socket.id );
			}
	},
	new: function(req,res){
		res.view('anuncios/new');
	},
	show: function(req, res, next){
		/*
		User.findByGroup(req.session.User.id_group, function(err,users){
			res.view({
				users: users
			});
		});
*/

	},
	create: function(req, res){
		var anuncioObj={
			text: req.param('text'),
			autor: req.session.User.id,
			group: req.session.User.id_group
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

		Anuncio.anunciosFindByGroup(req.session.User.id_group, function(err, anuncios){
					res.ok(anuncios);
			});
	}

};
