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
		console.log(req.param('email'), req.param('password'));
		if(!req.param('email') || !req.param('password')) {
			var NoEmailOrPassword =[{message: 'Debe ingresar Email y Contraseña'}]
			req.session.flash={
				err: NoEmailOrPassword
			}
			return res.redirect('/session/new');
		}

		User.findOneByEmail(req.param('email'), function foundUser (err, user) {
                if (err) return next(err);

                if(!user) {
                  var noAccountError = [{ name: 'noAccount', message: 'El email ingresado: '+req.param('email') + ' no se encuentra' }]
                  req.session.flash = {
                    err: noAccountError
                  }
                  res.redirect('/session/new');
                  return;
                }

                bcrypt.compare(req.param('password'), user.password, function (err, valid) {

                  if (err) return next(err);
                  if(!valid) {
                    var usernamePasswordMismatchError = [{ name: 'usernamePasswordMismatch', message: 'Combinacion de email y contraseña invalida' }]
                    req.session.flash = {
                      err: usernamePasswordMismatchError
                    }
                    res.redirect('/session/new');
                    return;
                  }


                  //if the password is valid we get here and log the user in
                  req.session.authenticated = true;
                  req.session.User = user;

									user.online = true;
									user.save(function(err){
										if (err) return next(err);

									});
									User.publishUpdate(user.id,{
										id: user.id,
										name: user.name,
										group: user.group,
										online: true
									});


									if(user.group == null){
											return res.redirect('/user/group')
									}
                  //redirect the user to the profile page

                  Group.findOne(req.session.User.group, function foundGroup(err, group){
                    if (err) return next(err);
                    req.session.Group = group;
                    res.redirect('/anuncios');
                  });



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
				group: user.group,
				online: false
			});

			req.session.destroy();
			res.redirect('/');

		});

  }


};
