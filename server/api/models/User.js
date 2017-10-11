/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
	  	name:{
	  		type:'string',
	      required: true

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
			id_group:{
				type: 'string'
			},
			anuncios:{
				collection: 'anuncio',
				via: 'autor',
			},
			group:{
				model: 'group',
				defaulsTo: ""
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
		  	//delete obj.password;
		  	delete obj._csrf;
		  	return obj;
  		}

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
    beforeCreate: function (values, next) {
	    bcrypt.hash(values.password, 10, function passwordEncrypted(err, hash) {
	      if (err) return next(err);
	      values.password = hash;
	      next();
	    });
	  },

	  usersFindByGroup: function (options, cb) {
		 User.find({id_group:options}).exec(function (err, users) {
			 if (err) return cb(err);
			 if (!users) return cb(new Error('Users not found.'));
			 return cb(null,users);
		 });
	 },

	findByGroup: function (options, cb) {
				User.find({id_group: options})
	 			 .then(function (data){
	 				 var groupHijos = Group.find({ group_parent: options })
	 							 .then(function(groupData) {
	 									 var new_data = groupData;
	 									 delete new_data.createdAt;
	 									 delete new_data.updatedAt;
	 									 return new_data;
	 							 });
	 				 return cb(null,[data,groupHijos])
	 			 });
	},
		// Hook that gets called after the default publishUpdate is run.
	// We'll use this to tell all public chat rooms about the user update.





};
