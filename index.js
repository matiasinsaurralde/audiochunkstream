var io = require( 'socket.io' )( 3000 ),
    torrentStream = require( 'torrent-stream'),
    memoryStorage = require( 'torrent-memory-storage' );

io.on( 'connection', function( socket ) {
  console.log( 'incoming connection', socket.id );
 
  var engine;

  socket.on( 'streamrequest', function(e) {

     engine = null;

    console.log( 'got streamRequest', e );
/*
    models.Song.findOne({ where: { id: e.id }, include: [ models.Torrent ] }).then( function( song ) {
      if( song ) {
        engine = torrentStream( song.Torrent.magnetLink, { storage: memoryStorage } );
        engine.on( 'ready', function() {
          engine.files.forEach( function( file ) {
            if( file.name.indexOf( song.fileName ) > -1 ) {
              var stream = file.createReadStream(),
                  totalChunks = 0;
              stream.on( 'data', function( chunk ) {
                var data =  { id: e.id, audioData: chunk.toString('base64') };
                if( totalChunks == 0 ) {
                  console.log( 'first chunk, attach meta!' );
                  // data.duration = match.duration;
                };
                socket.emit( 'chunk', data );
                totalChunks++;
              });

              stream.on( 'end', function() {
                socket.emit( 'streamEnd', { id: e.id, totalChunks: totalChunks } );
              });

            };
          });
        });
      } else {
        console.log( 'song not found' );
      };
    });
*/

  });

});
