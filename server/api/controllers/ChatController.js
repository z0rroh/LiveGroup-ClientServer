/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

			index: function(req, res, next){
				res.view('chat/index');
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
