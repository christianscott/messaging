/* Client side code for simple socket.io chat app */

// init variables
const socket = io();
const dt = new Date();

const $textBox = $('#text-box'); //
const $messages = $('#messages');
const $noMessages = $('#no-messages');
const $numUsers = $('#num-users');
const $whoOnline = $('#who-online');

let msgCount = 0;
let username;


// init & parse templates for messages and
// active users defined in index.html
let msgTemplate = $('#msg-template').html();
let userTemplate = $('#user-template').html();
Mustache.parse(msgTemplate);
Mustache.parse(userTemplate);

// helper functions

function getTime() {
  return dt.getHours() + ":" + (dt.getMinutes()<10?'0':'') + dt.getMinutes();
}

function mention(data) {
  // when a username is clicked, focus chat input and
  // change value to @username
  // TODO: change to jquery and move to global scope
  const messageBox = document.getElementById('text-box');
  messageBox.value = `@${ data } `;
  messageBox.focus();
}

function deleteUser(data) {
  // remove parent of '✕' from the DOM,
  // which is the enclosing message element
  const usr = $(data).parent();
  usr.remove();
}

function deleteMessage(data) {
  // remove parent of '✕' from the DOM,
  // parent being the enclosing message element.
  // then, if the message count is zero, the
  // #no-messages li is made visible
  const msg = $(data).parent();
  msg.remove();
  msgCount--;
  if (msgCount == 0) {
    $('#no-messages').show('fast');
  }
}

class NotImplementedError extends Error {

  constructor(message) {
    super(message);
    this.name = 'NotImplementedError';
    this.message = message || 'feature not yet implemented';

  }
}

$('form').submit(() => {
    // emit a new message event if the input
    // is not empty
    if ($textBox.val().length !== 0) {
      socket.emit('chat message', {
        msg: $textBox.val(),
        username,
      });
      $textBox.val('');
    }
  return false
})

// socket.io stuff
socket.on('user disconnect', (data) => {
  throw new NotImplementedError('functionality to handle user ' +
                                'disconnect has ' +
                                'not been implemented yet.')
})

socket.on('chat message', (data) => {
  // message count is incremented by one then
  // the message card is rendered and added to the DOM
  msgCount++;
  let newMsg = Mustache.render(msgTemplate, {
    username: data.username,
    time: getTime(),
    msg: data.msg,
  });

  $messages.append(newMsg);
  $noMessages.hide('fast');
})

socket.on('new user', (data) => {
  // when a new user connects, the user count
  // is updated and a new user card is added
  // to the side bar
  $numUsers.html(data.numUsers);
  console.log(data.numUsers);
  let newUser = Mustache.render(userTemplate, {
    username: data.username,
    connectTime: data.connectTime,
  })
  $whoOnline.append(newUser);
})

$(() => {
  // assign user a random username on load
  // and emit new user event
  username = "user" + Math.floor(Math.random()*10000)
  socket.emit('new user', {
    username: username,
    connectTime: getTime(),
    numUsers: 0
  });
})
