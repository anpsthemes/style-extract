## What is style-extract?

Style-extract is a [Node.js](http://nodejs.org/) script for extracting only specific CSS properties and their selectors from CSS code. We use it in our workflow to get `background-color`, `color`, `font-size` and other CSS properties, which we want our users to change.

## Install

```
npm install style-extract
```

## Settings

extract(code, [options])

`code`: String of the CSS code.

`options`:
* properties: an array of CSS properties, that will be extracted

## Usage

``` javascript
var extract = require('style-extract');
var fs = require('fs');

var css = fs.readFileSync('style.css').toString();
var options = {
    properties: ['color', 'background-color']
};

var result = extract(css, options);

fs.writeFileSync("result.css", new Buffer(result));
```

### Before

``` css
/* Foo */
.foo {
  background-color: #fff;
  color: #000;
  display: block;
  font-size: 12px;
}

/* Bar */
.bar {
  text-align: center;
}
```

### After
``` css
.foo {
  background-color: #fff;
  color: #000;
}
```
## Grunt version
The Grunt version can be found at [grunt-style-extract](https://www.npmjs.com/package/grunt-style-extract).

## Gulp version
The Gulp version can be found at [gulp-style-extract](https://www.npmjs.com/package/gulp-style-extract).

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License)
