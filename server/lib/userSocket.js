/*// Attach a listener which fires when a connection is established:
io.socket.on('connect', function socketConnected() {

    // Show the main UI
    $('#disconnect').hide();
    $('#chatbox').show();

    // Announce that a new user is online--in this somewhat contrived example,
    // this also causes the CREATION of the user, so each window/tab is a new user.
    io.socket.get("/user/announce", function(data){
      window.me = data;
      // Get the current list of users online.  This will also subscribe us to
      // update and destroy events for the individual users.
      io.socket.get('/user', updateUserList);
    });


    // Listen for the "room" event, which will be broadcast when something
    // happens to a room we're subscribed to.  See the "autosubscribe" attribute
    // of the Room model to see which messages will be broadcast by default
    // to subscribed sockets.


    // Listen for the "user" event, which will be broadcast when something
    // happens to a user we're subscribed to.  See the "autosubscribe" attribute
    // of the User model to see which messages will be broadcast by default
    // to subscribed sockets.

    io.socket.on('user', function messageReceived(message) {
      var userId = message.id;
      switch (message.verb) {
        // Handle user creation
        case 'created':
          updateUserInDom(userId, message);
          break;
        // Handle a user changing their name
        case 'updated':
          addOrRemove(message.data);
          updateUserInDom(userId, message);
          break;
        // Handle user destruction
        case 'destroyed':
          console.log("destroy");
          updateUserInDom(userId, message);
          break;
        // Handle private messages.  Only sockets subscribed to the "message" context of a
        // User instance will get this message--see the onConnect logic in config/sockets.js
        // to see where a new user gets subscribed to their own "message" context
        case 'messaged':
          receivePrivateMessage(message.data);
          break;

        default:
          break;
      }

    });



    // Add a click handler for the "Send private message" button
    // startPrivateConversation() is defined in private_message.js.
    $('#private-msg-button').click(startPrivateConversation);


    console.log('Socket is now connected!');

    // When the socket disconnects, hide the UI until we reconnect.
    io.socket.on('disconnect', function() {
      // Hide the main UI
      $('#chatbox').hide();
      $('#disconnect').show();
    });

});


    function updateUserInDom(userId, message){
          console.log("updateUserInDom");
          console.log(message);
          var page = document.location.pathname;
          page = page.replace(/(\/)$/,'');
          switch(page){
              case '/group/show':

              if(message.verb === 'updated'){
                UserIndexPage.updateUser(userId, message);
              }
              if(message.verb === 'created'){
                UserIndexPage.addUserCreate(message);
              }
              if(message.verb === 'destroyed'){
                UserIndexPage.destroyUser(userId);
              }

      }
    }

    var UserIndexPage = {
       updateUser: function(id, message){
          console.log("updateUser");
       },

       addUserCreate: function(message){
         console.log("addUserCreate");
         var obj={
           user: message.data,
           _csrf: window.overlord.crsf || ''
         };
         $('tr:last').after(
           window.JST['assets/templates/addUserCreate.ejs']( obj )
         );

       },
       destroyUser: function(id){
         console.log("userDestroy");
         $('tr[data-id="'+id+'"]').remove();
       }
    }
*/
