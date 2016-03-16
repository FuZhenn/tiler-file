var ejs = require('ejs'),
    fs  = require('fs');

/**
 * Constructor for the tiler-xyz 
 * 
 * @param {String} path - the path expression of the tile file
 * @class
 */
function tiler(path) {
    this._tmpl = ejs.compile(path);
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
    var filepath = this._tmpl({
        'x':x,
        'y':y,
        'z':z
    });
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