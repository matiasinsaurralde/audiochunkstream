var io = require( 'socket.io' )( 3000 ),
    torrentStream = require( 'torrent-stream')

    // memoryStorage = require( 'torrent-memory-storage' )

io.on( 'connection', function( socket ) {
  console.log( 'incoming connection', socket.id )

  var engine

  socket.on( 'streamrequest', function( request ) {
    console.log( 'got streamrequest', request )
    engine = torrentStream( request.magnet )

    engine.on( 'ready', function() {
      console.log( 'engine ready' )

      engine.files.forEach( function( file ) {
        if( file.name.indexOf( request.filename ) > -1 ) {
          var stream = file.createReadStream(), totalChunks = 0

          stream.on( 'data', function( chunk ) {
            var data = { audioData: chunk.toString( 'base64' ) }
            if( totalChunks == 0 ) {
              console.log( 'first chunk?' )
            }
            console.log( 'sending chunk #', totalChunks )
            socket.emit( 'streamchunk', data )
            totalChunks++
          })

          stream.on( 'end', function() {
            socket.emit( 'streamend', {} )
          })
        }
      })

      /*
      engine.files.forEach( function( file ) {
        if( file.name.indexOf( request.filename ) > -1 ) {
          var stream, totalChunks = 0
          stream.on( 'data', function( chunk ) {
            var data = { audioData: chunk.toString( 'base64' ) }
            if( totalChunks == 0 ) {
              console.log( 'first chunk!' )
            }
            socket.emit( 'streamchunk', data )
            totalChunks++
          })
          stream.on( 'end', function() {
            socket.emit( 'streamend', {} )
          })
        }
      })*/
    })

  });

});
