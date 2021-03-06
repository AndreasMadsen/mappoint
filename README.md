#mappoint

> When you simply need to map a stream

## Installation

```sheel
npm install mappoint
```

## Documentation

```javascript
var mappoint = require('mappoint');

// buffer example
var stream = mappoint(function (buffer, done) {
  done(null, buffer.toString().replace(/ /g, '-'));
});

stream.end('hallo world');
stream.once('readable', function () {
  stream.read().toString(); // hallo-world
});

// object example
var stream = mappoint({objectMode: true}, function (object, done) {
  done(null, {bool: !object.bool});
});

stream.end({bool: true});
stream.once('readable', function () {
  stream.read(); // {bool: false}
});

// error example
var stream = mappoint(function (object, done) {
  done(new Error('failure'));
});

stream.once('error', function (err) {
  // err = new Error('failure');
});

stream.end('fail');
```

##License

**The software is license under "MIT"**

> Copyright (c) 2013 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
