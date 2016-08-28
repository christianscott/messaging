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

io.on('connection', (socket) => {

  numUsers++;
  console.log('users: ' + numUsers);

  socket.on('chat message', (msg) => {
    let cleanMsg = validator.escape(msg)
    io.emit('chat message', cleanMsg)
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
