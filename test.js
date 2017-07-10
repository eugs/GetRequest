var http = require('http');


var request = http.request({
    hostname: "swapi.co",
    path: "/api/starships/9/",
    method: "GET",
    headers: {Accept: "application/json"}
  }, function (response) {
    console.log("response with: ");
    // console.log(response.json);

    response.on("data", function(chunk) {
      console.log("BODY: " + chunk);
    });
  });
  request.end();



var options = {
  host: 'swapi.co',
  path: '/api/starships/9/'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    console.log("end");
  });
}

http.request(options, callback).end();
