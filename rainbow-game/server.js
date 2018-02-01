const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

const users = {}

io.on('connection', function(socket){
  console.log('a user connected')
  users[socket.id] = 0
  socket.on('disconnect', function(){
    delete users[socket.id]
  })

  socket.on('telemetry', xPercent => {
    users[socket.id] = xPercent
  })

})

setInterval(() => {
  io.emit('all-data', users)
}, 16)

http.listen(3000, function(){
  console.log('listening on *:3000')
})

