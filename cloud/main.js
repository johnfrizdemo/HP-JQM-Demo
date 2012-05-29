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

function getCachedPoints(params,callback) {
  $fh.cache({
    "act": "load",
    "key": "points"
  },function(err,res){
    console.log("err", err);
    console.log("res", res);
    callback(err,res.value);
  });
  
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
    "value": obj,
    "expire": CACHE_TIME
  });
}

function getPoints(params,callback) {
  var response = {};
  getCachedPoints({}, function(err, res) {
    if( res && res.value && res.value.length > 0 ) {
      // Parse the cached data
      var cache = JSON.parse(res.value);
  
      if( params.hash && params.hash === cache.hash ) {
        // Client data is up to date
        response = {'hash':params.hash, 'cached':true};
      } else {
        // Hash value from client missing or incorrect, return cached cloud data
        response = cache;
      }      
    }
    else {
      var data = MARKERS;
      var crypto=require("crypto");
      var md5=crypto.reateHash("md5");
      var hash=md5.update(JSON.stringify(data)).digest();
      // Cache the data
      cachePoints(hash, data);
  
      // Build the response
      response = {'data': data, 'hash':hash, 'cached':false};
    } 
    callback(null, response);
  });
}

module.exports={
	getCachedPoints:getCachedPoints,
	getPoints:getPoints
};