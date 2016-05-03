

var app = { 
  server: 'https://api.parse.com/1/classes/messages',
  friends: []
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
      app.addMessage(message);
      app.fetch();
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
    data: { createdAt: -1 },
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
  var $username = $('<div class="username" data-username=' + message.username + '/>').text(message.username + ': ');
  var $text = $('<div/>').text(message.text);
  $chat.append($username);
  $chat.append ($text);
  $('#chats').append($chat);
};

app.addRoom = function (roomName) {
  $('#roomSelect').append('<option value = ' + roomName + '>' + roomName + '</option>');
};

app.addFriend = function () {
  var friendName = $(this).data('username');
  $('#friend').append('<option value = ' + friendName + '>' + friendName + '</option>');
};

app.handleSubmit = function() {
  var message = {};
  var name = $('#name').val();
  var msg = $('#msg').val();
  message.username = name;
  message.text = msg;
  console.log ('name = ' + name);
  app.send(message);

};

$(document).on('click', '.username', app.addFriend);
//$(document).on('submit', app.handleSubmit);

$('#send').submit(function(event) {
  app.handleSubmit();
  event.preventDefault();
});

