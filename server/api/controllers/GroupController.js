/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {


	getUsers: function(req,res, next){
		
		var user = req.user;
		User.usersFindByGroup(user.group, function(err,users){
			if(err)
				return next(err);

			return res.ok(users)
		});
	},

	create: function(req, res){

		var newGroup = req.param('group');
		var user = req.user;
		Group.create(newGroup, function(err, group){
				if(err){
					return res.json({code:'FAIL', message:'Error al crear grupo'});
				}
				User.findOne({id: user.id}, function(err, user){
					user.groupName = group.name;
					user.group = group.id;
					user.save(
						function(err){
					});
					return res.json({code:'SUCCESS', user: user});
				})
		})
	},

};
