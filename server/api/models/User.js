/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
	  	name:{
	  		type:'string',
	      required: true
	  	},
			rut:{
				type:'string',
			},
	  	password:{
	  	  type:'string',
	      required: true
	  	},
	  	email:{
	  		type:'email',
	  		unique: true,
	      required: true

	  	},
	  	admin:{
	   		type:'boolean',
	   		defaultsTo: false
	  	},
	  	user_image:{
	   		model: 'archivo',
				defaultsTo : 'default_user.png'
	  	},
	  	phone:{
	  		type: 'string',
	  		unique: true,
	  		defaultsTo: '569-xxxxxxx'
	  	},
	  	adress:{
	  		type: 'string',
	  		defaultsTo: 'Sin ingresar'
	  	},
			tokens:{
				type: 'int',
				defaultsTo : '3'
			},
			groupName:{
				type: 'string'
			},
			anuncios:{
				collection: 'anuncio',
				via: 'autor',
			},
			group:{
				model: 'group'
			},
			turnos:{
				collection: 'turnolog',
				via: 'users',

			},
			online:{
				type: 'boolean',
				defaultsTo: false
			},
	  	toJSON: function(){
		 	var obj= this.toObject();
		  	delete obj.password;
		  	delete obj._csrf;
		  	return obj;
  		}

    },

		beforeCreate: function (values, next) {
			CipherService.hashPassword(values);
			next();
		},
		Validate: function(value,cb){
			User.findOne({email:value}).exec(function (err, user) {
      	if (err) return cb(err);
      	if (user) {
        	return cb(false);
      	}
				return cb(true)
			});
		},
	  usersFindByGroup: function (options, cb) {
			 var groupList = [];
			 User.find({group:options}).populateAll()
	      .then(function(users){
				 	users.map(user =>{
						var newUser = {
							id: user.id,
							rut: "123456789",
							name: user.name,
							email: user.email,
							telefono: user.phone,
							direccion: user.adress,
							tipo: user.admin,
							tokens: user.tokens
						}
						groupList.push(newUser)
					})
					return cb(null,groupList);
			 })
			 .catch(function(err){
					 throw err;
			 })
	 },


		// Hook that gets called after the default publishUpdate is run.
	// We'll use this to tell all public chat rooms about the user update.

};
