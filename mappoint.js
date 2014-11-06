
var stream = require('stream');
var util = require('util');

function Mappoint(options, map) {
  if (!(this instanceof Mappoint)) return new Mappoint(options, map);

  if (typeof options === 'function') {
    map = options;
    options = undefined;
  }

  stream.Transform.call(this, {
    objectMode: !!(options && options.objectMode)
  });

  this._map = map;
}
util.inherits(Mappoint, stream.Transform);
module.exports = Mappoint;

Mappoint.prototype._transform = function (data, encoding, done) {
  var self = this;

  this._map(data, function (err, object) {
    if (err) return done(err);

    if (object !== null && object !== undefined) {
      console.log(object);
      self.push(object);
    }
    done(null);
  });
};

Mappoint.prototype._flush = function (done) {
  console.log('flush');
  this.push(null);
  done(null);
};
