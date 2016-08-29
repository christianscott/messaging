/*
Backend for simple socket.io chat app
TODO:
  - implement nicknames
  - add dynamic user count to page
  - fix <li> css to allow larger messages
  - make responsive
  - make a chat bot (lol)
  - delete messages across all instances (give msgs unique id's???)
*/

// set up basic express server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const validator = require('validator');

const PORT = 3100;

// serve files from /dist, relative to current directory
app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  // all functionality exists in index
  res.sendfile('index.html')
})

// chatroom
let currentUsers = [];

io.on('connection', (socket) => {

  // when a user connects, send a
  // list of the current users
  socket.emit('setup', {
    currentUsers: currentUsers,
    numUsers: currentUsers.length
  })

  socket.on('new user', (data) => {
    // when the server receives a 'new user' event
    // from the client, that user's userName is
    // escaped and their userName and connect time
    // are sent to every client, along with an updated
    // user count
    let cleanName = validator.escape(data.username);
    let user = {
      username: cleanName,
      connectTime: data.connectTime,
      numUsers: currentUsers.length
    }

    io.emit('new user', user);
  })

  socket.on('chat message', (data) => {
    let cleanMsg = validator.escape(data.msg);
    let cleanName = validator.escape(data.username)

    io.emit('chat message', {
      msg: cleanMsg,
      username: cleanName
    })
  });

  socket.on('disconnect', (data) => {
    io.emit('user disconnect', data);
  })

})

// server
http.listen(PORT, () => {
  console.log(`server listening at port ${ PORT }.`);
})
