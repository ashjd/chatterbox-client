

var app = { 
  server: 'https://api.parse.com/1/classes/messages'
};

app.init = function () {
  app.fetch();
};

app.send = function (message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function () {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received', data.results);
      _.each (data.results, function (message) {
        app.addMessage(message);
      });

    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve messages');
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function (message) {
  var $chat = $('<div class="chat" />');
  var $username = $('<div class="username" />').text(message.username + ': ');
  var $text = $('<div/>').text(message.text);
  $chat.append($username);
  $chat.append ($text);
  $('#chats').append($chat);
};

app.addRoom = function (roomName) {
  $('#roomSelect').append('<option value = ' + roomName + '>' + roomName + '</option>');
};