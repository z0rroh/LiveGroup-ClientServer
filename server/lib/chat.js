    // Start a private conversation with another user
/*
    function startPrivateConversation() {

      // Get the user list
      var select = $('#users-list');

      // Make sure a user is selected in the list
      if (select.val() === null) {
        return alert('Please select a user to send a private message to.');
      }

      // Get the recipient's name from the text of the option in the <select>
      var recipientName = $('option:selected', select).text();
      var recipientId = select.val();

      // Prompt for a message to send
      var message = prompt("Enter a message to send to "+recipientName);

      // Create the UI for the room if it doesn't exist
      createPrivateConversationRoom({name:recipientName, id:recipientId});

      // Add the message to the room
      addMessageToConversation(window.me.id, recipientId, message);

      // Send the private message

      io.socket.post('/chat/private', {to:recipientId, msg: message});

    }

    // Create the HTML to hold a private conversation between two users
    function createPrivateConversationRoom(penPal) {

      // Get the ID of the HTML element for this private convo, if there is one
      var roomName = 'private-room-'+penPal.id;

      // If HTML for the room already exists, return.
      if ($('#'+roomName).length) {
        return;
      }

      var penPalName = penPal.name == "unknown" ? ("User #"+penPal.id) : penPal.name;

      // Create a new div to contain the room
      var roomDiv = $('<div id="'+roomName+'"></div>');

      //Create the HTML for the room
      var roomHTML = '<h2>Private conversation with <span id="private-username-'+penPal.id+'">'+penPalName+'</span></h2>\n' +
                     '<div id="private-messages-'+penPal.id+'" style="width: 50%; height: 300px; overflow: auto; border: solid 1px #666; padding: 5px; margin: 5px"></div>'+
                     '<input id="private-message-'+penPal.id+'"/> <button id="private-button-'+penPal.id+'">Send message</button">';


      roomDiv.html(roomHTML);

      // Add the room to the private conversation area
      $('#convos').append(roomDiv);

      // Hook up the "send message" button
      $('#private-button-'+penPal.id).click(onClickSendPrivateMessage);


    }

    // Callback for when the user clicks the "Send message" button in a private conversation
    function onClickSendPrivateMessage(e) {

      // Get the button that was pressed
      var button = e.currentTarget;

      // Get the ID of the user we want to send to
      var recipientId = button.id.split('-')[2];

      // Get the message to send
      var message = $('#private-message-'+recipientId).val();
      $('#private-message-'+recipientId).val("");

      // Add this message to the room
      addMessageToConversation(window.me.id, recipientId, message);

      // Send the message
      io.socket.post('/chat/private', {to: recipientId, msg: message});

    }

    // Add HTML for a new message in a private conversation
    function addMessageToConversation(senderId, recipientId, message) {

      var fromMe = senderId == window.me.id;
      var roomName = 'private-messages-' + (fromMe ? recipientId : senderId);
      var senderName = fromMe ? "Me" : $('#private-username-'+senderId).html();
      var justify = fromMe ? 'right' : 'left';

      var div = $('<div style="text-align:'+justify+'"></div>');
      div.html('<strong>'+senderName+'</strong>: '+message);
      $('#'+roomName).append(div);

    }

    // Handle an incoming private message from the server.
    function receivePrivateMessage(data) {

      var sender = data.from;

      // Create a room for this message if one doesn't exist
      createPrivateConversationRoom(sender);

      // Add a message to the room
      addMessageToConversation(sender.id, window.me.id, data.msg);

    }


    // Remove a user from the list of available users to chat with, by sending
    // either a user object or a user ID.
    function addOrRemove(user) {


      if(user.online === false){
        // Get the user's ID.
        var id = user.id || user;

        var userName = $('#user-'+id).text();
        // Remove the corresponding element from the users list

        // Re-append it to the body as a hidden element, so we can still
        // get the user's name if we need it for other messages.
        // A silly hack for a silly app.
        $('#user-'+id).css('display', 'none');
        $('#users-lists').find('#user-'+id).remove();
        //$('#users-lists').find('#user-'+id).remove();

        // Post a user status message if we're in a private convo
        if ($('#private-room-'+id).length) {
          postStatusMessage('private-messages-'+id, userName + ' has disconnected.');
          $('#private-message-'+id).remove();
          $('#private-button-'+id).remove();
        }
     }else if(user.online === true){
               if (user.id == me.id) {return;}
               // Get a handle to the user list <select> element
               var select = $('#users-lists');

               // Create a new <option> for the <select> with the new user's information
               //var option = $('<option id="'+"user-"+user.id+'" value="'+user.id+'">'+(user.name == "unknown" ? "User #" + user.id : user.name)+'</option>');
               var addToChatBox = $('<div  class="sidebar-name"><a id="'+"user-"+user.id+'" data-name="'+user.name+'" href="javascript:register_popup('+"'"+user.name+"'"+','+"'"+user.name+"'"+');"><img width="30" height="30" src="/images/avatars/default_user.png" /><span>'+user.name+'</span></a></div>');
               // Add the new <option> element

               select.append(addToChatBox);
     }


    }

    // Add a user to the list of available users to chat with
    function addUser(user) {
      var id = user.id || user;
      if (user.id == me.id) {return;}
      // Get a handle to the user list <select> element
      var select = $('#users-lists');
      // Create a new <option> for the <select> with the new user's information
      //var option = $('<option id="'+"user-"+user.id+'" value="'+user.id+'">'+(user.name == "unknown" ? "User #" + user.id : user.name)+'</option>');
      var addToChatBox = $('<div  class="sidebar-name"><a id="'+user.id+'" data-name="'+user.name+'" href="javascript:register_popup('+"'"+user.name+"'"+','+"'"+user.name+"'"+');"><img width="30" height="30" src="/images/avatars/default_user.png" /><span>'+user.name+'</span></a></div>');
      // Add the new <option> element

      select.append(addToChatBox);
    }

    // Add multiple users to the users list.
    function updateUserList(data) {
      data.users.forEach(function(user) {
        if (user.id == me.id) {return;}
        addUser(user);
      });
    }



    //this function can remove a array element.
    Array.remove = function(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };

    //this variable represents the total number of popups can be displayed according to the viewport width
    var total_popups = 0;

    //arrays of popups ids
    var popups = [];

    //this is used to close a popup
    function close_popup(id)
    {
        for(var iii = 0; iii < popups.length; iii++)
        {
            if(id == popups[iii])
            {
                Array.remove(popups, iii);

                document.getElementById(id).style.display = "none";

                calculate_popups();

                return;
            }
        }
    }

    //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
    function display_popups()
    {
        var right = 220;

        var iii = 0;
        for(iii; iii < total_popups; iii++)
        {
            if(popups[iii] != undefined)
            {
                var element = document.getElementById(popups[iii]);
                element.style.right = right + "px";
                right = right + 320;
                element.style.display = "block";
            }
        }

        for(var jjj = iii; jjj < popups.length; jjj++)
        {
            var element = document.getElementById(popups[jjj]);
            element.style.display = "none";
        }
    }

    //creates markup for a new popup. Adds the id to popups array.
    function register_popup(id, name)
    {

        for(var iii = 0; iii < popups.length; iii++)
        {
            //already registered. Bring it to front.
            if(id == popups[iii])
            {
                Array.remove(popups, iii);

                popups.unshift(id);

                calculate_popups();


                return;
            }
        }

        var element = '<div class="popup-box chat-popup" id="'+ id +'">';
        element = element + '<div class="popup-head">';
        element = element + '<div class="popup-head-left">'+ name +'</div>';
        element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\''+ id +'\');">&#10005;</a></div>';
        element = element + '<div style="clear: both"></div></div><div class="popup-messages"></div><div class="send-messages"> <textarea placeholder="Escribe..."></textarea></div></div>';

        document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;

        popups.unshift(id);

        calculate_popups();

    }

    //calculate the total number of popups suitable and then populate the toatal_popups variable.
    function calculate_popups()
    {
        var width = window.innerWidth;
        if(width < 540)
        {
            total_popups = 0;
        }
        else
        {
            width = width - 200;
            //320 is width of a single popup box
            total_popups = parseInt(width/320);
        }

        display_popups();

    }

    //recalculate when window is loaded and also when window is resized.
    window.addEventListener("resize", calculate_popups);
    window.addEventListener("load", calculate_popups);
*/
