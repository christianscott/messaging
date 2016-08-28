const socket = io()

let msgCount = 0;

function mention(data) {
  const messageBox = document.getElementById('text-box');
  messageBox.value = `@${ data } `;
  messageBox.focus();
}

function deleteMessage(data) {
  const msg = $(data).parent();
  msg.hide();
  msgCount--;
  if (msgCount == 0) {
    $('#no-messages').show('fast');
  }
}

$('form').submit(() => {
  socket.emit('chat message', $('#text-box').val());
  $('#text-box').val('');
  return false
})

socket.on('chat message', (msg) => {
  msgCount++;
  console.log(msgCount);
  let newMsg = '<li><div><span class="stamp">' +
               'user at some point in time - ' +
               '</span><span class="msg">' + msg +
               '</span></div><a href="#" ' +
               'onclick="deleteMessage(this);" ' +
               'class="delete-user">✕</a></li>';

  $('#messages').append(newMsg);
  $('#no-messages').hide('fast');
})
