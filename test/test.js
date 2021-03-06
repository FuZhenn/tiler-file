var Tiler = require('../index'),
    fs = require('fs'),
    assert = require('assert');

var tiler = new Tiler(
    __dirname+'/sample/<%- z %>/<%- parseInt(x/10) %>/<%- parseInt(y/10) %>/<%- x %>_<%- y %>.png'
);

tiler.getTile(53, 25, 6, function(error, tile) {
    if (error) {
        throw error;
    }
    assert.ok(tile);   
    assert.ok(!isNaN(Date.parse(tile.lastModified)));
    assert.deepEqual(tile.data, fs.readFileSync(__dirname + '/sample/6/5/2/53_25.png'));
    console.log('success!');    
});