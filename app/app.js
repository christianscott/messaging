/*
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

// routing
app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  res.sendfile('index.html')
})

// chatroom
let numUsers = 0;
let currentUsers = {};

io.on('connection', (socket) => {

  numUsers++;
  console.log('users: ' + numUsers);

  socket.emit('setup', {
    currentUsers: currentUsers
  })

  socket.on('new user', (data) => {
    let cleanName = validator.escape(data.username);
    let user = {
      username: cleanName,
      connectTime: data.connectTime,
      numUsers: numUsers,
    }

    currentUsers[cleanName] = {
      username: cleanName,
      connectTime: data.connectTime,
      numUsers: numUsers,
    }

    console.log(cleanName + ' connected');
    io.emit('new user', user);
  })

  socket.on('chat message', (data) => {
    let cleanMsg = validator.escape(data.msg);
    let cleanName = validator.escape(data.username)
    console.log(
      cleanName + ' says: ' + cleanMsg
    );
    io.emit('chat message', {
      msg: cleanMsg,
      username: cleanName
    })
  });

  socket.on('disconnect', () => {
    numUsers--;
    console.log('users: ' + numUsers);
  })

})

// server
http.listen(PORT, () => {
  console.log(`server listening at port ${ PORT }.`);
})
