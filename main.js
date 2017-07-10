var _ = require('underscore');
var http = require('http');
var fs = require('fs');

const PATH = "/api/starships/";
var options = { host: "swapi.co",
    method: "GET",
    headers: {Accept: "application/json"}
}

var ships = [];
var outputFile = "ships.json";

console.log("\n");

  grabShip(process.argv[2])
  .then((res) => {
    console.log("status: ", res);
  })
  .catch((e) => {
    console.log("ERROR: " + e);
  })
  // .then(saveShips("ships.json"));
  .then(()=> {
    fs.writeFile(outputFile, JSON.stringify(ships), function (err, result) {
      console.log("SHIPS: ", ships);
      // if (err) { reject(err); }
      // else { resolve(result); }
    });
  });

// function(saveShipsfilename) {
//     return new Promise(function (resolve, reject) {
//       fs.writeFile(filename, JSON.stringify(ships), function (err, result){
//         console.log("SHIPS: ", ships);
//         if (err) { reject(err); }
//         else { resolve(result); }
//       });
//     })
//   }

function grabShip(index) {
  return new Promise((resolve, reject) => {
      getInfo(options, index)
      .then(parseShip)
      .then(checkShip)
      .then(() => {
        resolve("ship number " + index + " was successfully parsed");
      })
      .catch((error) => {
        console.error("failed to get ship number ", index, ": "+ error);
      })
  })
}

function checkShip(ship) {
  return new Promise((resolve, reject) => {
    if(ship) {
      console.log("ship checked: ", ship.model);
      ships.push(ship);
      return resolve();
    } else {
      return reject();
    }
  })
}

function parseShip(raw) {
  return new Promise((resolve, reject) => {
    // console.log("\nget raw: ", raw);

    var object = JSON.parse(raw);
    // console.log("\nparsed: ", object);
    object = _.pick(object, 'model', 'cost_in_credits', 'length', 'crew', 'passengers');
    console.log("parse ship: ", object);

    return resolve(object);
  });
}

function getInfo(options, index) {
  return new Promise((resolve, reject) => {
    options.path = PATH + index + "/";
    console.log("get ship number: ", index);

    http.get(options, (response) => {
      var str = "";

      // console.log("response with: ", response.statusCode, "...");
      if(response.statusCode !== 200) {
        return reject("bad response: " + response.statusCode);
      }
      response.on("data", (chunk) => {
        str += chunk;
        // console.log("BODY: ", chunk);
        return resolve(str);
      })

      // response.on("end", () => {
      //   var buf = new Buffer(str);
      //   console.log("buffer: ", buf.toString('utf-8'));
      // })
    });
  });
}
