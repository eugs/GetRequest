var fs = require("fs");

function copyFile(from, to) {
  return new Promise(function (res, rej) {
    fs.createReadStream('test.txt')
      .pipe(fs.createWriteStream('test_out.txt'));
      return res("copied!!");
  })
}


copyFile('test.txt', 'test_out.txt')
.then(myFunc);

console.log("DONE");

function myFunc(res) {
  console.log("result: ", res);
}
