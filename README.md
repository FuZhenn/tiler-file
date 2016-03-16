# tiler-xyz
[![Circle CI](https://circleci.com/gh/FuZhenn/tiler-xyz.svg?style=svg)](https://circleci.com/gh/FuZhenn/tiler-xyz)

A nodejs map tile file reader coordinating by X,Y,Z.

## Introduction
This is a map tile file reader for map tiles in XYZ schema.

Because the path rule to store tile files is arbitrary, a path template phrase is needed to interprate XYZ to a actual file path. 

[Ejs](https://github.com/mde/ejs) is used here as the template engine. You can see how to use it in the example below.

## Install

```bash
npm install tiler-xyz
```

## Usage

```javascript
var Tiler = require('tiler-xyz');
//template of the file path
var tiler = new Tiler(__dirname+'/sample/<%- z %>/<%- parseInt(x/10) %>/<%- parseInt(y/10) %>/<%- x %>_<%- y %>.png');
//tile's x,y,z
tiler.getTile(53, 25, 6, function(error, tile) {
    if (error) {
        throw error;
    }
    console.log(tile.lastModified);
    fs.writeFileSync('53_25.png', tile.data);
});
```