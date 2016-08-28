let socket = io()

const mention = function(data) {
  const messageBox = document.getElementById('text-box');
  messageBox.value = `@${ data } `;
  messageBox.focus();
}

$('form').submit(() => {
  socket.emit('chat message', $('#text-box').val());
  $('#text-box').val('');
  return false
})

socket.on('chat message', (msg) => {
  let newMsg = '<li><div><span class="stamp">' +
               'user at some point in time - ' +
               '</span><span class="msg">' + msg +
               '</span></div><a href="#" ' +
               'onclick="console.log(\'woah word\')" ' +
               'class="delete-user">✕</a></li>';

  $('#messages').append(newMsg);
  $('#no-messages').hide('fast');
})

socket.on('fuck up', () => {
  alert('fuck you');
})
