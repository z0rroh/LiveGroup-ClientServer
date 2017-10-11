/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt=require('bcrypt');

module.exports = {
	new: function(req,res){
		if(req.session.User && req.session.authenticated){
				res.redirect('anuncios');
		}
		else {
				res.view('session/new');
		}
	},
	create: function(req, res, next){
		if(!req.param('email') || !req.param('password')) {
			var NoEmailOrPassword =[{message: 'Debe ingresar Email y Contraseña'}]
			return res.send(NoEmailOrPassword);
		}
		User.findOneByEmail(req.param('email'), function foundUser (err, user) {
        if (err) return next(err);

        if(!user) {
          var noAccountError = [{ name: 'noAccount', message: 'El email ingresado: '+req.param('email') + ' no se encuentra' }]
          //return res.send(noAccountError);
        }

        bcrypt.compare(req.param('password'), user.password, function (err, valid) {

          if (err) return next(err);
          if(!valid) {
            var usernamePasswordMismatchError = [{ name: 'usernamePasswordMismatch', message: 'Combinacion de email y contraseña invalida' }]
						return next(null, false, {
							code: 'AUTH_SIGNIN_NO_E',
							message: 'Error con contraseña o email'
						});
          }
          //if the password is valid we get here and log the user in
          //req.session.authenticated = true;
          req.session.User = user;

					user.online = true;
					user.save(function(err){
						if (err) return next(err);
					});

					User.publishUpdate(user.id,{
						id: user.id,
						name: user.name,
						id_group: user.id_group,
						online: true
					});
					res.json(user);
        }); //end bcrypt.compare
      });//end findOneByEmail
	},
  destroy: function(req, res, next){

		User.findOne(req.session.User.id, function foundUser(err,user){
			var userId = req.session.User.id;

			user.online = false;
			user.save(function(err){
				if (err) return next(err);
			});
			User.publishUpdate(user.id,{
				id: user.id,
				name: user.name,
				id_group: user.id_group,
				online: false
			});

			req.session.destroy();
			res.redirect('/');

		});

  }


};
