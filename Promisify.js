//1. Promisify一个异步函数

const fs = require('fs');

// 回调用法
// fs.readFile('test.json', (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(data.toString());
//   }
// });

const promisify = (f) => {

};


// 以fs.readFile()为例，测试你的实现