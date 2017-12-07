/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

			subscribeGroupChat: function(req, res, next){

				if(req.isSocket && req.session.User){
						User.find({group:req.session.User.group}).exec(function (err, users) {
						// Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
								User.subscribe(req, users,['update']);
						});
						User.watch(req);
						sails.log( 'Usuario suscrito a chat con la id: ' + req.socket.id );
				}
			},
			groupOnline: function(req, res){
				Chat.usersOnline(req.session.User.group, function(err, users){
						res.ok(users);
				});
			},

			createMessage(req, res){
					var newMessage={
						text: req.param('text'),
						to: req.param('to'),
						from: req.session.User.id
					}

					Chat.create(newMessage, function(err, message){
						if(err){
							res.json({code: "FAIL", error: "OCURRIO UN PROBLEMA AL ENVIAR EL MENSAJE" })
						}
						res.json({code:"SUCCESS", message: message})
					})

			},

			searchMessages(req, res){
					var allMessages = [];
					var to = req.param('to')
					var from = req.session.User.id
					Chat.find({from: from, to: to}).populate('from').populate('to').sort({ createdAt: 'desc' })
					.then( (messagesSend) =>{
							allMessages.push(messagesSend)
							if( to !== from ){
								Chat.find({from: to, to:from}).populate('from').populate('to').sort({ createdAt: 'desc' })
								.then((messagesReceive)=>{
										allMessages.push(messagesReceive);
										console.log(allMessages);

								})
							}
							else{
								res.json(allMessages);
							}

					})
			},

			private: function(req, res) {
				// Get the ID of the currently connected socket
				var socketId = sails.sockets.getId(req.socket);
				// Use that ID to look up the user in the session
				// We need to do this because we can have more than one user
				// per session, since we're creating one user per socket
				User.findOne(req.session.users[socketId].id).exec(function(err, sender) {
					// Publish a message to that user's "room".  In our app, the only subscriber to that
					// room will be the socket that the user is on (subscription occurs in the onConnect
					// method of config/sockets.js), so only they will get this message.
					User.message(req.param('to'), {
						from: sender,
						msg: req.param('msg')
					});

				});

		}

};
