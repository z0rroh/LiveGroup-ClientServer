/**
 * TurnosController
 *
 * @description :: Server-side logic for managing turnos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');

module.exports = {

	create: function(req, res,next){
		var params = req.params.all();
		var turnosObj=[]
		if(!params.name.length){
			return res.status(400).json({code: 'NO_NAME', message: 'Debes ingresar un nombre'});
		}
		if(params.cupo === 0){
			return res.status(400).json({code: 'NO_CUPO', message: 'Debes ingresar la cantidad de cupos'});
		}
		if(!params.dias.length){
			return res.status(400).json({code: 'NO_DIAS', message: 'No se ha seleccionado ningun dia'});
		}
		else{
			for (var i in params.dias){
				auxObj= {
					start: params.timeStart,
					end : params.timeEnd,
					name: params.name,
					cupo: params.cupo,
					day: params.dias[i].id,
					group: req.session.User.group,
				}
				turnosObj.push(auxObj);
			}
			Turno.create(turnosObj).exec(function(err, turnos){

				for(var i in turnos){
					var exp = Turnolog.expiracion(turnos[i].day,turnos[i].start,function(fecha){
						return fecha;
					});
					var turnologObj={
					 name: turnos[i].name,
					 start: turnos[i].start,
					 end: turnos[i].end,
					 day: turnos[i].day,
					 cupoTotal: turnos[i].cupo,
					 cupoActual: 0,
					 expiracion: exp,
					 estado: 'activo',
					 group: turnos[i].group,
					 id_turno: turnos[i].id,
					}
					Turnolog.create(turnologObj,function (err,turnolog) {
						if(err){
							return res.json({code: 'FAIL', message: 'Se produjo un error en el servidor'})
						}
						Turnolog.publishCreate(turnolog);

					});
				}
				return res.json({code: 'SUCCESS', message: 'Turnos creados correctamente'})
			});

		}

	},

	index: function(req, res, next){
		Turno.find({group:req.session.User.group},function foundUsers(err, turnos){
			for(var i in turnos){
				var diaSemana="";

				if ( turnos[i].day === '0' )
					diaSemana = "Lunes";
				if ( turnos[i].day === '1' )
					diaSemana = "Martes";
				if ( turnos[i].day === '2' )
					diaSemana = "Miercoles";
				if ( turnos[i].day === '3' )
					diaSemana = "Jueves";
				if ( turnos[i].day === '4' )
					diaSemana = "Viernes";
				if ( turnos[i].day === '5' )
					diaSemana = "Sabado";
				if ( turnos[i].day === '6' )
					diaSemana = "Domingo";
				turnos[i].dia = diaSemana;
			}
			res.view({
				turnos: turnos
			});
		});
	},

	destroy: function(req, res, next){
		Turno.destroy(req.param('id'), function userDestroy(err){
			if(err){
				return next(err);
			}
			Turnolog.destroy({id_turno: req.param('id')},function userDestroy(err){
				if(err)
					return next(err);
				res.redirect('/admin');
			});

		});
	},
	populateTurnolog: function(req,res,next){
		Turno.find({group: req.session.User.group},function(err,turnos){
			if(err){
				var noTurn=[{message: 'no hay turnos registrados'}]
				req.session.flash={
						err: noTurn
				}
				res.redirect('/admin');
			}
			if(turnos){
				for(var i in turnos){
					var exp = Turnolog.expiracion(turnos[i].day,turnos[i].start,function(fecha){
						return fecha;
					});
					var turnologObj={
				   name: turnos[i].name,
				   start: turnos[i].start,
				   end: turnos[i].end,
				   day: turnos[i].day,
				   cupoTotal: turnos[i].cupo,
					 cupoActual: 0,
					 expiracion: exp,
				   estado: 'activo',
				   group: req.session.User.group,
				   id_turno: turnos[i].id,
				  }
					Turnolog.findOrCreate({id_turno: turnos[i].id, estado: 'activo'},turnologObj,function (err,turnologs) {
						if(err){
							return next(err);
						}

					});
				}
				res.redirect('/turnos');
			}
		});
	},
};
