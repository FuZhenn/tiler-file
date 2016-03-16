# tiler-xyz
[![Circle CI](https://circleci.com/gh/FuZhenn/tiler-xyz.svg?style=svg)](https://circleci.com/gh/FuZhenn/tiler-xyz)

A nodejs map tile file reader coordinating by X,Y,Z.

## Introduction
This is a map tile file reader for map tiles in XYZ schema.

Because the path rule to store tile files is arbitrary, a path template phrase is needed to interprate XYZ to a actual file path. 

[Mustache](https://github.com/janl/mustache.js) is used here as the template engine. You can see how to use it in the example below.

## See Also
[tiler-mbtiles](https://github.com/FuZhenn/tiler-mbtiles):
a nodejs map tile reader for mapbox mbtiles format.

[tiler-arcgis-xyz](https://github.com/FuZhenn/tiler-arcgis-xyz):
a nodejs map tile reader for exploded tiles by ESRI ArcGIS

[tiler-arcgis-compact](https://github.com/FuZhenn/tiler-arcgis-compact):
a nodejs map tile reader for compact tiles by ESRI ArcGIS

## Install

```bash
npm install tiler-xyz
```

## Usage

```javascript
var Tiler = require('tiler-xyz');
//template of the file path, shorten is a lambda function in mustache.
//x, y, z is the tile's coordinate values.
var tiler = new Tiler(
    __dirname+'/sample/{{z}}/{{#shorten}}{{x}}{{/shorten}}/{{#shorten}}{{y}}{{/shorten}}/{{x}}_{{y}}.png', 
    //extra hash properties besides x,y,z in the mustache template 
    {
        //shorten the number with 1 digit
        shorten:function() {
            return function(text, render) {
                return parseInt(parseInt(render(text))/10)
            }
        }        
    }
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