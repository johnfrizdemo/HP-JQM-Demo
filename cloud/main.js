/*
 * Maps
 */
// Cache points for 10 seconds
var CACHE_TIME = 30;
var MARKERS = {
  locations: [
    {
      lat: '52.245671',
      lon: '-7.080002'
    },
    {
      lat: '52.257861',
      lon: '-7.136993'
    }
  ]
};

function getCachedPoints() {
  var ret = $fh.cache({
    "act": "load",
    "key": "points"
  });
  return ret.val;
}

function cachePoints(hash, data) {
  var obj = {
    "hash": hash,
    "data": data,
    "cached": true
  };
  $fh.cache({
    "act": "save",
    "key": "points",
    "val": obj,
    "expire": CACHE_TIME
  });
}

exports.getPoints = function(params, callback) {
  var response = {};
  var cache    = getCachedPoints();

  if (cache.length === 0) {
    var data = MARKERS;
    var hash = $fh.hash({
      algorithm: 'MD5',
      text: $fh.stringify(data)
    });

    // Cache the data
    cachePoints(hash, data);

    // Build the response
    response = {'data': data, 'hash':hash, 'cached':false};
  } else {
    // Parse the cached data
    cache = $fh.parse(cache);

    if( $params.hash && $params.hash === cache.hash ) {
      // Client data is up to date
      response = {'hash':$params.hash, 'cached':true};
    } else {
      // Hash value from client missing or incorrect, return cached cloud data
      response = cache;
    }
  }
  return callback(null, response);
};