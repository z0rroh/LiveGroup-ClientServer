/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt=require('bcrypt');

module.exports = {

	create: function(req, res, next){

		if(!req.param('email') || !req.param('password')) {
			return res.json({
				code: 'SIGNIN_NO_E_NO_P',
				message: 'Debe ingresar Email y contraseña'
			});
		}

		User.findOneByEmail(req.param('email'), function foundUser (err, user) {

        if (err){
					return res.json({
					code: 'SIGNIN_ERR',
					message: 'Ah ocurrido un error inesperado'
					});
				}

        if(!user) {
					return res.json({
						code: 'SIGNIN_NO_E',
						message: 'El email ingresado no se encuentra registrado'
					});
        }

        bcrypt.compare(req.param('password'), user.password, function (err, valid) {

					if (err){
						return res.json({
						code: 'SIGNIN_ERR',
						message: 'Ah ocurrido un error inesperado'
						});
					}
          if(!valid) {
						return res.json({
							code: 'SIGNIN_INVALID',
							message: 'La cambinacion de email y contraseña no es valida'
						});
          }
          req.session.authenticated = true;
          req.session.User = user;
					user.online = true;
					user.save(function(err){
						if (err) return next(err);
					});
					User.publishUpdate(user.id, user);

					if(user.group == null){
						return res.json({
							code: 'NO_GROUP',
							message: 'No eres parte de ningun grupo'
						});
					}

					return res.json({
						code:'SUCCESS',
						user: user
					});
        }); //end bcrypt.compare
      });//end findOneByEmail
	},
  destroy: function(req, res, next){
		User.findOne(req.session.User.id, function foundUser(err,user){

			user.online = false;
			user.save(function(err){
				if (err) return next(err);
			});
			User.publishUpdate(user.id,user);
			req.session.destroy();
			return res.json({
				code: 'LOGOUT',
				message: 'Session destruida'
			});
		});

  }


};
