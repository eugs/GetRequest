var http = require('http');
//
// var server = http.createServer(function (req, res) {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write("<h1> Hello </h1>, <p> your request: " + req.url + "</p>");
//     res.end();
// });
//
// server.listen(8000);


// var request = http.request({
//     host: "swapi.co",
//     path: "/api/starships/9/",
//     method: "GET",
//     headers: {Accept: "application/json"}
//   }, function (response) {
//     console.log("response with: ");
//     // console.log(response.json);
//
//     response.on("data", function(chunk) {
//       console.log("BODY: " + chunk);
//     });
//   });
//   request.end();

var http = require('http');
var options = { host: "swapi.co",
    path: "/api/starships/9/",
    method: "GET",
    headers: {Accept: "application/json"}
}

http.get(options, (res) => {
  console.log("response: ", res.status);
  var str = "";

  res.on("data", (chunk) => {
    str += chunk;
    console.log("BODY: ", chunk);
  })

  res.on("end", () => {
    var buf = new Buffer(str);
    console.log(buf.toString('utf-8'));
  })
});

// http.get(['swapi.co/api/starships/9/'], (res) => {
//   const statusCode = res.statusCode;
//   const contentType = res.headers['content-type'];
//   console.log(res.headers);
// });
//
// http.get({
//        host: 'personatestuser.org',
//        path: '/email'
//    }, function(response) {
