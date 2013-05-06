
var mappoint = require('./mappoint.js');
var test = require('tap').test;

test('buffer mode', function (t) {
  var stream = mappoint(function (buffer, done) {
    done(null, buffer.toString().replace(/ /g, '-'));
  });

  stream.end('hallo world');
  stream.once('readable', function () {
    t.equal(stream.read().toString(), 'hallo-world');
    t.end();
  });
});

test('object mode', function (t) {
  var stream = mappoint({objectMode: true}, function (object, done) {
    done(null, {bool: !object.bool});
  });

  stream.end({bool: true});
  stream.once('readable', function () {
    t.deepEqual(stream.read(), {bool: false});
    t.end();
  });
});

test('error emit', function (t) {
  var stream = mappoint({objectMode: true}, function (object, done) {
    done(new Error('failure'));
  });

  stream.once('error', function (err) {
    t.equal(err.message, 'failure');
    t.end();
  });

  stream.end({});
});
