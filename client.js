var io = require( 'socket.io-client' ),
    socket = io( 'http://127.0.0.1:3000' )

socket.on( 'connect', function() {

  console.log( 'client connected' )

  // simulate stream request:

  setTimeout( function() {
    socket.emit( 'streamrequest', { magnet: 'magnet:?xt=urn:btih:e696a041f755a2cd84b255d412e9e2510905eac0&dn=Chet+Faker+-+Built+On+Glass+%282014%29+Album+%40+MP3+%2F+320+Kbps&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
                                    filename: '09. 1998.mp3' } )
  }, 3000 );

})

