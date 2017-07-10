// function readFile(filename, enc){
//   return new Promise(function (fulfill, reject){
//     fs.readFile(filename, enc, function (err, res){
//       if (err) reject(err);
//       else fulfill(res);
//     });
//   });
// }
//



// function myPromise(aSync) {
//   return new Promise(function (resolve, reject) {
//     return (aSync) ? resolve(1) : reject(new Error("can't do"));
//   });
// }
//
// myPromise(process.argv[2])
//   .then (function (res) {
//     console.log("res: ", res);
//   })
//   .catch(function (e) {
//     console.log("error: ", e.message);
//   });


//timer example

// console.log("before...");
// delay(1000)
// .then((val) => {
//     console.log("after: " + val);
//   }
// );

// delay(1000)
// .then((val) => {
//   console.log("1 sec...");
//   return delay(1000)
// })
// .then((val) => {
//   console.log("finish: ", val);
// })
//
//
// function delay(interval) {
//   return new Promise((resolve) => {
//     // setTimeout(resolve(2), interval);
//     setTimeout(function () {
//       return resolve(18);
//       // console.log("resolve");
//     }, interval);
//   })
// }


//promise all
function fetch1(val) {
  return new Promise( function (resolve, reject) {
    return (val) ? resolve("done") : reject("cancel");
  })
}

// fetch1(false)
// .then((val) => {
//   console.log(val);
// })
// .catch(function (err) {
//   console.error(err);
// });

Promise.all([
  fetch1(true),
  fetch1(true),
  fetch1(false)
])
.then((val) => {
  console.log("AFTER ALL: ", val);
})
.catch((val) => {
  console.error("ERROR: ", val);
})
