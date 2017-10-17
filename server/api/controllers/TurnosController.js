/**
 * TurnosController
 *
 * @description :: Server-side logic for managing turnos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function (req, res){
	//console.log("pagina de registro");
	res.view('turnos/new');
	//req.session.flas={};

	},
	create: function(req, res,next){
		var params = req.params.all();
		var turnosObj=[]
		console.log(params);
		return res.ok()
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
