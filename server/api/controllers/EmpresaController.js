/**
 * EmpresaController
 *
 * @description :: Server-side logic for managing empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var bcrypt=require('bcrypt');

module.exports = {

	new: function (req,res){
		res.view('empresa/new');
	},

  /**
   * `EmpresaController.create()`
   */
  create: function (req, res) {
    var hashGroup = bcrypt.hashSync(req.param('name'), 5);
		var groupObj={
			name: req.param('name'),
			description: req.param('description'),
			ubication: req.param('ubication'),
      key: hashGroup
		}

		Group.create(groupObj, function(err, group){
			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('empresa/new')
			}
			var userObj={
				name : req.param('user'),
				email : req.param('email'),
				password: req.param('pass'),
				groups: group.id,
       	id_group: group.id,
        admin: true
			}
			User.create(userObj,function (err, user) {

				if(err){
					req.session.flash={
						err:err
					}
					return res.redirect('empresa/new');
				}
				return res.redirect('session/new');
			});
		});

  },


  /**
   * `EmpresaController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  }
};
