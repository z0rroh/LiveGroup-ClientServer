/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

		getUsers: function(req,res, next){
			console.log("Empresa controller");
			var user = req.user;
			User.usersFindByGroup(user.group, function(err,users){
				if(err)
					return next(err);
				res.json({
					users: users
				});

			});
		},

		index: function(req, res, next){
			console.log("Empresa controller");
			var user = req.user;
			User.findByGroup(user.group, function(err, data){
			});
		},

};
