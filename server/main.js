var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');

    // The first here parameter is the event's name (as it is received by the client)
    socket.emit('dataReceived', {
        id: 1,
        text: 'Bienvenido al chat privado',
        author: 'Administrador',
    });

    // Now we will listen for data that's sent from the frontend to the server
    socket.on('dataToServer', function(data) {
        console.log(data);
        renderDataInFrontEnd(data);
    });

});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});