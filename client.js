var io = require( 'socket.io-client' ),
    socket = io( 'http://127.0.0.1:3000' )

socket.on( 'connect', function() {
  console.log( 'connected' )
})
