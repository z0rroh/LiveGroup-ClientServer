/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport')

/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unAuthorized(null, info && info.code, info && info.message);

  return res.json({
    // TODO: replace with new type of cipher service
		code:'SUCCESS',
    token: CipherService.createToken(user),
    user: user
  });
}

module.exports = {
	/**
	 * Sign up in system
	 * @param {Object} req Request object
	 * @param {Object} res Response object
	 */
	signUp: function (req, res) {

			const newUser = req.allParams();

			User.Validate(newUser.email,function(response){
				if(!response){
					return res.json({code:"EMAIL_FOUND", message:"El correo ingresado ya se encuentra registrado"})
				}
				var userObj={
					name : newUser.name,
					email : newUser.email,
					password: newUser.password
				}
				User.create(userObj, function (err, user) {
					if(err){
						return res.json({code:"FAIL", message:"Se produjo un error al crear la cuenta"})
					}
					return res.json({
						code:"SUCCESS",
						message:"Cuenta creada con exito!",
						token: CipherService.createToken(user),
					 	user: user
					});

				})
			});
	},

	/**
	 * Sign in by local strategy in passport
	 * @param {Object} req Request object
	 * @param {Object} res Response object
	 */
	signIn: function (req, res) {

		passport.authenticate('local',
			_onPassportAuth.bind(this, req, res))(req, res);
	},

	logout: function (req,res){
		req.logout();
		return res.json({
			code: 'LOGOUT',
			message: 'Session destruida'
		});
	},

  destroy: function(req, res, next){
		User.findOne(req.session.User.id, function foundUser(err,user){

			user.online = false;
			user.save(function(err){
				if (err) return next(err);
			});
			User.publishUpdate(user.id,{id:user.id, name: user.name, user_image: user.user_image,online: user.online});
			req.session.destroy();
			return res.json({
				code: 'LOGOUT',
				message: 'Session destruida'
			});
		});

  }


};
