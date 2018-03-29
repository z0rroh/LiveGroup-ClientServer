/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    announce: function(req, res) {
        if(req.isSocket && req.session.User){

                  User.find({id_group:req.session.User.group}).exec(function (err, users) {
                  // Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
                      User.subscribe(req, users,['update','create','destroy']);
                  });

                    // Get the socket ID from the reauest
                    var socketId = sails.sockets.getId(req);

                    // Get the session from the request

                    // Create the session.users hash if it doesn't exist already
                    req.session.users = req.session.users || {};
                      // Save this user in the session, indexed by their socket ID.
                      // This way we can look the user up by socket ID later.
                      req.session.users[socketId] = req.session.User;

                      // Subscribe the connected socket to custom messages regarding the user.
                      // While any socket subscribed to the user will receive messages about the
                      // user changing their name or being destroyed, ONLY this particular socket
                      // will receive "message" events.  This allows us to send private messages
                      // between users.
                      User.subscribe(req, req.session.User, 'message');

                      // Get updates about users being created
                      User.watch(req);
                      sails.log( 'Usuario suscrito a user con la id: ' + req.socket.id );
                      /*
                      User.findOne({id: req.session.User.id}).populate('groups').populate('turnos')
                      .then(function(user){
                        res.ok(user);
                      });*/

      }
  },

  getUser: function(req,res){
    User.findOne({id: req.session.User.id}).populate('group').populate('turnos')
    .then(function(user){
      var turnos = [];
      var grupo;
      var admin;
      user.turnos.map(turno =>{

        var turno = {
          id: turno.id,
          name: turno.name,
          start: turno.start,
          end: turno.end,
          day: turno.day
        }
        turnos.push(turno);
      })

      if ( user.admin === true){
        admin = "Administrador"
      }
      else{
        admin = "Comun"
      }
      var userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adress: user.adress,
        tokens: user.tokens,
        admin: admin,
        user_image: user.user_image,
        turnos: turnos,
        group: user.groupName
      }
      res.ok(userInfo);
    });
  },

	create: function(req, res){
    const newUser = req.allParams();
    User.Validate(newUser.email,function(response){
      if(!response){
        return res.json({code:"EMAIL_FOUND", message:"El correo ingresado ya se encuentra registrado"})
      }
      var userObj={
  			name : newUser.name,
  			email : newUser.email,
        rut: newUser.rut,
        password: newUser.password
  		}
  		User.create(userObj,function (err, user) {
  			if(err){
          return res.json({code:"FAIL", message:"Se produjo un error al crear la cuenta"})
  			}
        return res.json({code:"SUCCESS", message:"Cuenta creada con exito!", user: user})
  		});
    });

	},

	updateUser: function(req, res, next){
    var id = req.param('id');
    var param = req.param('param')

		User.update(id, param, function userUpdate(err){
			if(err) {
				return res.status(400).json({code: "BAD_R", message: "No fue posible modificar el usuario"})
			}
    	return res.json({code: "SUCCESS", message: "Usuario modificado correctamente"});
		});
	},

  searchUser: function(req,res){
    var email = req.param('email');

    User.findOne({email: email}, function (err, user){
      if(err){
        return res.json({code: 'FAIL', message:"Se produjo un error inesperado"})
      }
      if(!user){
        return res.json({code: 'FAIL', message:"El correo ingresado no se encuentra registrado"})
      }
      return res.json({code: 'SUCCESS', user: user})
    })
  },

	destroy: function(req, res, next){
      User.findOne(req.param('id'), function foundUser(err, user){
        if (err) return next(err);

    		User.destroy(req.param('id'), function userDestroy(err){
    			if(err) return next(err);
          User.publishDestroy(user.id);

    		});
        res.redirect('/group/show');
      });
	},

  addUserToGroup: function(req,res){
    var addUser = req.param('user');
    User.findOne({id:addUser.id}, function(err, user){
      if(err){
        return res.json({code:"FAIL", message: "Se produjo un error"})
      }
      if(user.group !== null){
        user.groupName = req.session.User.groupName;
        user.group = req.session.User.group;
        user.save(
          function(err){

        });
      }
      else{
        return res.json({code:"FAIL", message: "Este usuario ya fue asociado a un grupo de trabajo"})
      }

    })
    return res.json({code:"SUCCESS", message: "El usuario fue agregado correctamente a tu grupo de trabajo"})
  },

  addGroup: function(req,res){
    Group.findGroupByKey(req.param('key'),function(err,group){
      if(err){
        var NoValidate =[{message: 'La clave de grupo ingresa no es valida'}]
  			req.session.flash={
  				err: NoValidate
  			}
        return res.view('user/group');
      }
      User.findOne({id:req.session.User.id})
        .then(function(result){
          var user = result;
          user.groupName= group.name;
          user.online = true;
          user.group= group.id;
          user.save(
            function(err){
              req.session.flash={
                err:err
              }
            });
            User.publishCreate(user);

            req.session.User.group = user.group;
            Group.findOne(req.session.User.group, function foundGroup(err, group){
              if (err) return next(err);
              req.session.Group = group;
            });
            res.redirect('/session/new');

        })
        .fail(function(err){
          req.session.flash={
            err:err
          }
          return res.view('user/group');
        });
    });
	}


};
