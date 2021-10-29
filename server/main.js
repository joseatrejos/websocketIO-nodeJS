var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

app.use(express.static('public'));

// Initial debug data 
var messages = [
    {
        username: "Chompy",
        text: "Hola! que tal?",
    },
    {
        username: "Pepe",
        text: "Muy bien! y tu??",
    },
    {
        username: "Paco",
        text: "Genial!",
    },
];

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');

    // The first here parameter is the event's name (as it is received by the client)
    socket.emit('dataReceived', messages);

    // Now we will listen for data that's sent from the frontend to the server
    socket.on('dataToServer', function(data) {
        console.log(data);
        messages.push(data);
        io.sockets.emit('dataReceived', messages);
    });

});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});