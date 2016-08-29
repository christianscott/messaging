const socket = io()

let dt = new Date()
let msgCount = 0;
let username;

let msgTemplate = $('#msg-template').html();
let userTemplate = $('#user-template').html();
Mustache.parse(msgTemplate);
Mustache.parse(userTemplate);

function getTime() {
  return dt.getHours() + ":" + dt.getMinutes();
}

function mention(data) {
  const messageBox = document.getElementById('text-box');
  messageBox.value = `@${ data } `;
  messageBox.focus();
}

function deleteMessage(data) {
  const usr = $(data).parent();
  usr.remove();
}

function deleteUser(data) {
  const msg = $(data).parent();
  msg.remove();
  msgCount--;
  if (msgCount == 0) {
    $('#no-messages').show('fast');
  }
}

$('form').submit(() => {
  socket.emit('chat message', {
    msg: $('#text-box').val(),
    username,
  });
  $('#text-box').val('');
  return false
})

socket.on('chat message', (data) => {
  msgCount++;
  let newMsg = Mustache.render(msgTemplate, {
    username: data.username,
    time: getTime(),
    msg: data.msg,
  });

  $('#messages').append(newMsg);
  $('#no-messages').hide('fast');
})

socket.on('new user', (data) => {
  console.log(data);
  $('#num-users').html(data.numUsers);
  let newUser = Mustache.render(userTemplate, {
    username: data.username,
    connectTime: data.connectTime,
  })
  $('#who-online').append(newUser);
})

$(() => {
  username = "user" + Math.floor(Math.random()*10000)
  socket.emit('new user', {
    username: username,
    connectTime: getTime(),
    numUsers: 0
  });
  return false;
})
