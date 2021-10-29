var socket = io.connect( "http://localhost:8080", {'forceNew':true} );

// Here we call the event name 'dataReceived' that we defined in the server's backend with socket IO's emit method
socket.on('dataReceived', function(data){
    console.log(data);
    renderDataInFrontEnd(data);
});

function renderDataInFrontEnd(data) {
    var html = `<div>
                    Author: <strong>${data.author}</strong>
                    <p>Text: ${data.text}</p>
                </div>`;

    document.getElementById('websocketData').innerHTML = html;
}

function sendDataToServer(e) {
    // Grab the data from the form
    var request = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    };

    // Send the data to the server with socket.io's emit method
    socket.emit('dataToServer', request);
    return false;
}