var five = require('johnny-five');

var board = new five.Board({port:''});

board.on('ready', function() {


this.repl.inject({
board : board
});
})
