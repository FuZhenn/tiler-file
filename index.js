var Mustache = require('mustache'),
    fs  = require('fs');

/**
 * Constructor for the tiler-xyz 
 * 
 * @param {String} pattern - the mustache expression of the tile path
 * @class
 */
function tiler(template, hash) {
    this._template = template;
    this._hash = hash;
    Mustache.parse(this._template);
}

/**
 * Get a tile, Schema is XYZ.
 * Structure of the result tile is :
 * {
 *  lastModified : {Date} Time when tile file last modified
 *  data         : {Buffer}
 * }
 * @param {Number} x - tile x coordinate.
 * @param {Number} y - tile y coordinate.
 * @param {Number} z - tile z coordinate.
 * @param {Function(error, tile)} callback - tile x coordinate.
 * @return  {Object} tile data.
 */
tiler.prototype.getTile=function(x,y,z, callback) {
    var hash = {};
    if (this._hash) {
        for (var p in this._hash) {
            hash[p] = this._hash[p];
        }    
    }    
    hash.x = x;
    hash.y = y;
    hash.z = z;
    var filepath = Mustache.render(this._template, hash);
    fs.stat(filepath, function(error, stats) {
        if (error) {
            callback(error);
            return;
        }    
        fs.readFile(filepath, function(error, data) {
            if (error) {
                callback(error);
                return;
            }
            callback(null, {
               'lastModified' : stats.mtime,
               'data'         : data   
            });
        });
    });
    
}

exports = module.exports = tiler;