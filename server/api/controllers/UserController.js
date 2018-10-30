/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  subscribe: function(req, res) {

      var user = req.user;
      if(req.isSocket && user){
          User.findOne({id:user.id}).exec(function (err, user) {
          // Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
              User.subscribe(req, user);
          });

          User.watch(req);
          sails.log( 'Usuario suscrito a el mismo con la id: ' + req.socket.id );
      }
  },

  getUser: function(req,res){

    var user = req.user;
    User.findOne({id: user.id}).populate('group').populate('turnos')
    .then(function(user){
      var turnos = [];
      var grupo;
      var admin;
      var providerId;
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

      if ( user.admin ){
        admin = "Administrador"
      }
      else{
        admin = "Comun"
      }
      if(user.providerId){
        providerId = user.providerId;
      }
      else{
        providerId = ""
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
        group: user.groupName,
        providerId: providerId
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

  addUserToGroup: function(req,res){

    var userSession = req.user;
    var addUser = req.param('user');
    User.findOne({id:addUser.id}, function(err, user){
      if(err){
        return res.json({code:"FAIL", message: "Se produjo un error"})
      }
      if(user.group !== null){
        user.groupName = userSession.groupName;
        user.group = userSession.group;
        user.save(function(err){});
      }
      else{
        return res.json({code:"FAIL", message: "Este usuario ya fue asociado a un grupo de trabajo"})
      }

    })
    return res.json({code:"SUCCESS", message: "El usuario fue agregado correctamente a tu grupo de trabajo"})
  },

  addGroup: function(req,res){

    var userSession = req.user;
    Group.findGroupByKey(req.param('key'),function(err,group){
      if(err){
  			return res.json({code:"FAIL",message: 'La clave de grupo ingresa no es valida'});
      }
      User.findOne({id: userSession})
        .then(function(user){
          user.groupName = group.name;
          user.online = true;
          user.group= group.id;
          user.save(function(err){});
          User.publishCreate(user);

          return res.json({code: 'SUCCESS', message: "Te has unido correctamente al grupo de trabajo", user: user})

        })
        .fail(function(err){
          return res.json({code:"FAIL",message: err});
        });
    });
	}


};
