# tiler-file
[![Circle CI](https://circleci.com/gh/FuZhenn/tiler-file.svg?style=svg)](https://circleci.com/gh/FuZhenn/tiler-file)

A nodejs map tile file reader coordinating by X,Y,Z.

## Introduction
This is a map tile file reader for map tiles in XYZ schema.

Because the path rule to store tile files is arbitrary, a path template phrase is needed to interprate XYZ to a actual file path. 

[lodash](https://github.com/lodash/lodash) is used here as the template engine. You can see how to use it in the example below.

## See Also

[tiler-arcgis-file](https://github.com/FuZhenn/tiler-arcgis-file):
a nodejs map tile reader for exploded tiles by ESRI ArcGIS

[tiler-arcgis-bundle](https://github.com/FuZhenn/tiler-arcgis-bundle):
a nodejs map tile reader for compact tiles by ESRI ArcGIS 10.0-10.2

## Install

```bash
npm install tiler-file
```

## Usage

```javascript
var Tiler = require('tiler-file');
//template of the file path, lodash's template is used here.
//x, y, z is the tile's coordinate values.
var tiler = new Tiler(
    __dirname+'/sample/<%- z %>/<%- parseInt(x/10) %>/<%- parseInt(y/10) %>/<%- x %>_<%- y %>.png'
);
//tile's x,y,z
//actual path is __dirname+'/sample/6/5/2/53_25.png 
tiler.getTile(53, 25, 6, function(error, tile) {
    if (error) {
        throw error;
    }
    if (error) {
        throw error;
    }
    console.log(tile.lastModified);
    fs.writeFileSync('53_25.png', tile.data);
});
```