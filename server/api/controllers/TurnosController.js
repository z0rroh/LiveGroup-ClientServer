/**
 * TurnosController
 *
 * @description :: Server-side logic for managing turnos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');

module.exports = {

	create: function(req, res){
		moment.locale('es-cl');
		var params = req.params.all();
		var turnosObject=[]
		if(!params.name.length){
			return res.status(400).json({code: 'NO_NAME', message: 'Debes ingresar un nombre'});
		}
		if(params.timeStart === params.timeEnd ){
			return res.status(400).json({code: 'NO_HH', message: 'La hora de inicio y de fin deben ser distintas'});
		}
		if(params.cupo === 0){
			return res.status(400).json({code: 'NO_CUPO', message: 'Debes ingresar la cantidad de cupos'});
		}
		if(params.startDate === null){
			return res.status(400).json({code: 'NO_STARTDAY', message: 'No se ha seleccionado ningun dia'});
		}
		if(params.startDate && params.endDate === null){
			var dia = moment(params.startDate).format("dddd");
			var despliegue = moment(params.startDate).toDate();
			auxObj= {
				start: params.timeStart,
				end : params.timeEnd,
				name: params.name,
				cupo: params.cupo,
				day: dia,
				despliegue: despliegue,
				group: req.session.User.group,
			}
			Turno.create(auxObj)
			.exec(function(err, turno){
					var exp = Turnolog.expiracion(turno.day,turno.start,function(fecha){
						return fecha;
					});
					var turnologObj={
					 name: turno.name,
					 start: turno.start,
					 end: turno.end,
					 day: turno.day,
					 cupoTotal: turno.cupo,
					 cupoActual: 0,
					 expiracion: exp,
					 estado: 'activo',
					 despliegue: turno.despliegue,
					 group: turno.group,
					 id_turno: turno.id,
					}
					Turnolog.create(turnologObj,function (err,turnolog) {
						if(err){
							return res.json({code: 'FAIL', message: 'Se produjo un error en el servidor'})
						}
						Turnolog.publishCreate(turnolog);
					});
					return res.json({code: 'SUCCESS', message: 'Turno creado correctamente'})
			});
		}
		else{
			var firstDay = moment(params.startDate).toDate();
			var ultimateDay = moment(params.endDate).toDate();
			for (var i=firstDay; i<=ultimateDay; i=moment(i).add(1,'days').toDate()){
	      var dia = moment(i).format("dddd");
	      var despliegue = i;
	      auxObj= {
	        start: params.timeStart,
	        end : params.timeEnd,
	        name: params.name,
	        cupo: params.cupo,
	        day: dia,
	        despliegue: despliegue,
	        group: req.session.User.group,
	      }
	      turnosObject.push(auxObj);
	    }
	    Turno.create(turnosObject)
	    .exec(function(err, turnos){
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
	         despliegue: turnos[i].despliegue,
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

};
