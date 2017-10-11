/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {



	new: function(req,res){
		res.view();
	},

	show: function(req, res, next){
		User.usersFindByGroup(req.session.User.id_group, function(err,users){
			res.view({
				users: users
			});

		});

	},
	getUsers: function(req,res, next){
		User.usersFindByGroup(req.session.User.id_group, function(err,users){
			if(err)
				return next(err);
			res.json({
				users: users
			});

		});
	},
	groupdatatable: function(req,res, next){
		res.view('group/groupdatatable')
	},

	create: function(req, res){
		User.findOne(req.session.User.id, function (err, user) {
			if(err){

			}
			user.group.add(
				{
					name: req.param('name'),
					description: req.param('description'),
					ubication: req.param('ubication'),
				}
			);
			user.save(function(err) {
				return res.send(err);
			});
		});
		res.send(res);
	},
	index: function(req, res, next){

		/*User.findOne(req.session.User.id).populateAll().exec(function(err, user){
			if(err) return next(err);
			res.view({
				user: user
			});
		});
*/
		User.findByGroup(req.session.User.id_group, function(err, data){
			});
	},
	update: function(req, res, next){
		Group.update(req.param('id'), req.params.all(), function groupUpdate(err){
			if(err) {
				return res.redirect('group/show/' + req.param('id'));
			}
			res.redirect('group/show/' + req.param('id'));
		});
	},
	destroy: function(req, res, next){
		Group.destroy(req.param('id'), function groupDestroy(err){
			if(err){
				return next(err);
			}
			res.redirect('group/index');
		});
	},
	active: function(req,res,next){
		Group.findOne(req.session.User.id_group,{estado: true},function groupSetEstado(err){
			if(err){
				return next(err);
			}
			res.redirect('/admin');
		});
	},
	desactive: function(req,res,next){
		Group.findOne(req.session.User.id_group,{estado: false},function groupSetEstado(err){
			if(err){
				return next(err);
			}
			res.redirect('/admin');
		});
	},


	showGroups: function(req,res,next){

				User.findOne(req.session.User.id).populate('groups').exec(function(err, user){
					if(err) return next(err);
					res.view({
						user: user
					});
				});
	}




};
