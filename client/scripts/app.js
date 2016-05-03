

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
  if (app.friends.indexOf(friendName) === -1) {
    app.friends.push(friendName);
    $('#friend').append('<option value = ' + friendName + '>' + friendName + '</option>');
  }
  

};

app.handleSubmit = function() {
  console.log('Got to handleSubmit!');
  var name = $('#name').val();
  var msg = $('#msg').val();

  var message = {
    'username': name,
    'text': msg
  };

  app.send(message);
  app.fetch();
};

$(document).on('click', '.username', app.addFriend);
$(document).on('click', '#send', function(evt) {
  evt.preventDefault();
  app.handleSubmit();
});

setInterval(app.fetch, 5000);


