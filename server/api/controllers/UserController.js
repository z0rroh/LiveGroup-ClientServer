/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    announce: function(req, res) {
        if(req.isSocket && req.session.User){

                  User.find({id_group:req.session.User.id_group}).exec(function (err, users) {
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
    User.findOne({id: req.session.User.id}).populate('groups').populate('turnos')
    .then(function(user){
      var turnos = [];
      var grupo;
      var admin;
      user.turnos.map(turno =>{
        var dia;
        if( turno.day === "0"){
          dia = "Lunes"
        }
        if( turno.day === "1"){
          dia = "Martes"
        }
        if( turno.day === "2"){
          dia = "Miercoles"
        }
        if( turno.day === "3"){
          dia = "Jueves"
        }
        if( turno.day === "4"){
          dia = "Viernes"
        }
        if( turno.day === "5"){
          dia = "Sabado"
        }
        if( turno.day === "6"){
          dia = "Domingo"
        }
        var turno = {
          id: turno.id,
          name: turno.name,
          start: turno.start,
          end: turno.end,
          day: dia
        }
        turnos.push(turno);
      })
      user.groups.map(group =>{
        grupo = group.name;
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
        group: grupo
      }
      res.ok(userInfo);
    });
  },

  new:function (req, res){
    if(req.session.User && req.session.authenticated){
        res.redirect('anuncios');
    }
    else {
        res.view('user/new');
    }

	},

	create: function(req, res,next){
    User.Validate(req.param('email'),function(response){
      if(!response){
        var NoValidate =[{message: 'El email ya está registrado'}]
  			req.session.flash={
  				err: NoValidate
  			}
        return res.redirect('user/new')
      }
      var userObj={
  			name : req.param('name'),
  			email : req.param('email'),
        password: req.param('password'),
  		}
  		User.create(userObj,function (err, user) {

  			if(err){
          var error = [{message: "Se produjo un error al crear el Usuario"}]
  				req.session.flash={
            err: error
  				}
  				return res.redirect('user/new');
  			}
        req.session.authenticated = false;
        req.session.User = user;
        //User.publishCreate(user);
        var sucess =[{message: 'Usuario creado correctamente'}]
        req.session.flash={
          err: sucess
        }
  			res.redirect('user/group');

  		});
    });

	},

	show: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if(err) return next(err);
			if(!user) return next(err);
			res.json(user);
		});
	},
  index: function(req, res, next){

      User.find({online: true,id_group:req.session.User.id_group},function foundUsers(err, users){

        if(err) return next();

        res.json({
          users
        });

      });
    },

  perfil: function(req,res, next){
    res.view('user/perfil')
  },
  administrar: function(req,res, next){
    res.view('admin/panel')
  },

	edit: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if(err) return next(err);
			if(!user) return next(err);
			res.view({
				user: user
			});
		});
	},
  	updateUser: function(req, res, next){
      var userObj={
        name : req.param('name'),
        email : req.param('email'),
        phone: req.param('phone')
      }

  		User.update(req.param('id'), userObj, function userUpdate(err){
  			if(err) {
  				return res.redirect('user/edit/' + req.param('id'));
  			}
      	res.redirect('user/edit/' + req.param('id'));

  		});
  	},

	update: function(req, res, next){
    var userObj={
      name : req.param('name'),
      email : req.param('email'),
      phone: req.param('phone'),
      tokens: req.param('tokens')
    }

		User.update(req.param('id'), userObj, function userUpdate(err){
			if(err) {
				return res.redirect('user/edit/' + req.param('id'));
			}
    	res.redirect('/group/show');

		});
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

  addGroup: function(req,res){
    Group.findGroupByKey(req.param('key'),function(err,group){
      if(err){
        var NoValidate =[{message: 'La clave de grupo ingresa no es valida'}]
        return res.send(NoValidate);
      }
      User.findOne({id:req.session.User.id})
        .then(function(result){
          var user = result;
          user.id_group = group.id;
          user.online = true;
          user.group.add(group.name);
          user.save(
            function(err){
              return res.send(err);
            });
            User.publishCreate(user);

            req.session.User.group = user.group;

            return res.json(req.session.User);

        })
        .fail(function(err){
          return res.send(err);
        });
    });
	}


};
