/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	text:{
  		type:'mediumtext',
  		required: true
  	},
    to:{
      model: 'user'
    },
    from:{
      model: 'user'
    },

  },
  usersOnline: function (options, cb) {
     var usersList = [];
     User.find({group: options, online: true})
      .then(function(users){
        users.map(user=>{
          var user = {
            id: user.id,
            name: user.name,
            user_image: user.user_image,
            online: user.online
          }
          usersList.push(user);
        })
        return cb(null,usersList);
     })
     .catch(function(err){
         throw err;
     })
   }
};
