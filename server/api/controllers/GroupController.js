/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {


	getUsers: function(req,res, next){
		User.usersFindByGroup(req.session.User.group, function(err,users){
			if(err)
				return next(err);

			return res.ok(users)
		});
	},

	create: function(req, res){
		var newGroup = req.param('group');
		var user = req.session.User;
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
					req.session.User = user;
					return res.json({code:'SUCCESS', user: user});
				})
		})
	},

	destroy: function(req, res, next){
		Group.destroy(req.param('id'), function groupDestroy(err){
			if(err){
				return next(err);
			}
			res.redirect('group/index');
		});
	},


};
