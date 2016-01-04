angular.module( 'app', [ 'btford.socket-io', 'chunked-audio' ] )
.factory( 'socket', function( socketFactory ) {

  // var socket = socketFactory({ioSocket: io.connect('http://audiochunkstream-931d8e9c.matiasinsaurra7bf05fd94789439a.svc.tutum.io:3000')})
  var socket = socketFactory({ioSocket: io.connect('127.0.0.1:3000') })

  socket.streamrequest = function( params ) {
    this.emit( 'streamrequest', params );
  };

  socket.forwardchunks = function( filter, forwardFunction ) {
    socket.on( 'streamchunk', function( e ) {
      console.log( 'receiving chunk!' )
      var shouldForward = filter(e);
      if( shouldForward ) {
        console.log( 'e', e )
        forwardFunction( e.audioData, e, this );
      };
    });
  };

  return socket
})
.controller( 'HomeCtrl', [ '$scope', 'socket', 'ChunkedAudio', function( $scope, socket, ChunkedAudio ) {
  $scope.stream = function() {
    ChunkedAudio.load( 'song', function( stream, player ) {
      console.log( 'load song' )
      socket.streamrequest( { magnet: 'magnet:?xt=urn:btih:e696a041f755a2cd84b255d412e9e2510905eac0&dn=Chet+Faker+-+Built+On+Glass+%282014%29+Album+%40+MP3+%2F+320+Kbps&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
                              filename: '09. 1998.mp3' } )
      socket.forwardchunks(
            function( e ) {
              // if( e.id == item.id ) {
                console.log( 'forwardchunks' )
                return true;
              // };
            },
            function( audioData, event, socket ) {
              console.log( 'chunk?' )
              var chunk = stream.decodeBase64( audioData ),
                  index = stream.append( chunk );
              console.log( 'chunk#', index );
              if( index == 1 ) {
                player.play();
              };
          });
    })
  }
}])
.run( function( socket, $rootScope ) {
})
