var Tiler = require('../index');

var tiler = new Tiler(__dirname+'/sample/<%- z %>/<%- parseInt(x/10) %>/<%- parseInt(y/10) %>/<%- x %>_<%- y %>.png');

tiler.getTile(53, 25, 6, function(error, tile) {
    if (error) {
        throw error;
    }
    if (!tile) {
        throw new Error('data is null');
    }
    if (!tile.lastModified) {
        throw new Error('lastModified is null');
    }
    if (!tile.data) {
        throw new Error('data is null');
    }
    if (!tile.data.length === 0) {
        throw new Error('data is empty');
    }
    console.info('success!');
});