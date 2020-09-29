var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  //__dirname 는 쓰고있는 자바스크립트 파일의 현재경로
  res.sendFile(__dirname + '/index.html');
});

io.emit('some event', {
  someProperty: 'some value',
  otherProperty: 'other value',
}); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on * : 3000');
});
