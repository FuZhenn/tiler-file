var ejs = require('ejs');

/**
 * Constructor for the tiler-xyz 
 * 
 * @param {String} path - the path expression of the tile file
 * @class
 */
function tiler(path) {
    this._tmpl = ejs.compile('<%- '+path+' %>');
}

/**
 * Get a tile, Schema is XYZ.
 * Structure of the result tile is :
 * {
 *  lastModified : {Date} Time when tile file last modified
 *  data         : {Buffer}
 * }
 * @param {Number} x - tile x coordinate.
 * @param {Number} x - tile x coordinate.
 * @param {Number} x - tile x coordinate.
 * @param {Function(error, tile)} callback - tile x coordinate.
 * @return  {Object} tile data.
 */
tiler.prototype.getTile=function(x,y,z, callback) {
    var filepath = this._tmpl({
        'x':x,
        'y':y,
        'z':z
    });
    fs.stat(filepath, function(err1, stats) {
        if (err1) {
            callback(err1);
            return;
        }    
        fs.readFile(filepath, function(err2, data) {
            if (err2) {
                callback(err2);
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