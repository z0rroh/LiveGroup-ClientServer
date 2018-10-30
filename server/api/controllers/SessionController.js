/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport')
var _ = require('lodash');


function _onPassportAuth(req, res, error, user, info) {
  if (error){
    return res.json({
    code: 'SIGNIN_ERR',
    message: 'Ah ocurrido un error inesperado'
    });
  }
  if(!_.isEmpty(info)){
    return res.json(info);
  }
  return res.json({
		code:'SUCCESS',
    token: CipherService.createToken(user),
    user: user
  });
}

module.exports = {

	signUp: function (req, res) {

			const newUser = req.allParams();
			User.Validate(newUser.email,function(response){
				if(!response){
					return res.json({code:"EMAIL_FOUND", message:"El correo ingresado ya se encuentra registrado"})
				}
				var userObj={
					name: newUser.name,
					email: newUser.email,
					rut: newUser.rut,
					password: newUser.password
				}
				User.create(userObj, function (err, user) {
					if(err){
						return res.json({code:"FAIL", message:"Se produjo un error al crear la cuenta"})
					}
					return res.json({
						code:"SUCCESS", message:"Cuenta creada con exito!", token: CipherService.createToken(user),
					 	user: user
					});

				})
			});
	},

	signIn: function (req, res) {
		passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
	},

  facebook: function(req, res) {
    passport.authenticate('facebook-token', function(error, user, info) {
      if (error){
        return res.json({
        code: 'SIGNIN_ERR',
        message: 'Ah ocurrido un error al validar con facebook'
        });
      }
      return res.json({
        code:'SUCCESS',
        token: CipherService.createToken(user),
        user: user
      });
    })(req, res);
  },

	logout: function (req,res){
		req.logout();
		return res.json({
			code: 'LOGOUT',
			message: 'Session destruida'
		});
	},


};
