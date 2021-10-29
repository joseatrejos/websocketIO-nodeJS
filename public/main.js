var socket = io.connect( "http://localhost:8080", {'forceNew':true} );

// Here we call the event name 'dataReceived' that we defined in the server's backend with socket IO's emit method
socket.on('dataReceived', function(data){
    console.log(data);
    renderDataInFrontEnd(data);
});

function renderDataInFrontEnd(data) {
    var html = data
    .map(function (elem, index) {
      return `<div>
              <strong>${elem.username}</strong>:
              <em>${elem.text}</em>
            </div>`;
    })
    .join(" ");

    document.getElementById('websocketData').innerHTML = html;
}

function sendDataToServer(e) {
    // Grab the data from the form
    let username = document.getElementById("username").value
    let text = document.getElementById("text").value;

    // Send the data to the server with socket.io's emit method
    socket.emit("dataToServer", {
        username,
        text
    });
    return false;
}