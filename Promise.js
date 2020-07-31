// const promise = new Promise(function (resolve,reject) {
//     if(){
//         resolve(value);//将Promise对象状态从“未完成”变成“成功”，异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
//     } else {
//         reject(error);//将Promise对象状态从“未完成”变成“失败”，异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去；
//     }
// });
// promise.then(function (value) {
//     //success
// }, function (error) {//可选的，不一定提供
//     //failure
// })//resolved状态和rejected状态的回调参数

//简单例子
// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve,ms,'done');//过了指定的时间（ms参数）以后，Promise实例的状态变为resolved
//     });
// }
// timeout(100).then(value => {
//     console.log(value);//就会触发then方法绑定的回调函数。
// });

// let promise = new Promise(function (resolve,reject) {
//     console.log('Hello');//新建后立即执行
//     resolve();
// });
// promise.then(function () {
//     console.log('World!');//指定回调函数，当前脚本所有同步任务执行完才会执行
// });
// console.log('the');

//ajax操作
// const getJSON = function(url) {
//     const promise = new Promise(function(resolve, reject){
//         const handler = function() {
//             if (this.readyState !== 4) {
//                 return;
//             }
//             if (this.status === 200) {
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         };
//         const client = new XMLHttpRequest();
//         client.open("GET", url);
//         client.onreadystatechange = handler;
//         client.responseType = "json";
//         client.setRequestHeader("Accept", "application/json");
//         client.send();
//
//     });
//
//     return promise;
// };
//
// getJSON("/posts.json").then(function(json) {
//     console.log('Contents: ' + json);
// }, function(error) {
//     console.error('出错了', error);
// });
// console.log(getJSON("https://api.apiopen.top/recommendPoetry"));

//异步加载图片
// function loadImageAsync(url) {
//     return new Promise(function (resolve, reject) {
//        const image = new Image();
//        image.onload = function () {
//            resolve(image);//加载成功，调用resolve方法
//        };
//         image.onerror = function () {
//             reject(new Error('Could not image at ' + url));//失败调用reject
//         };
//         image.src = url;
//     });
// }

//实现Ajax操作
// const getJSON = function (url) {
//     const promise = new Promise(function (resolve, reject) {
//         const handler = function () {
//             if(this.readyState !== 4){
//                 return ;
//             }
//             if(this.status === 200){
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         };
//         const client = new XMLHttpRequest();
//         client.open("GET",url);
//         client.onreadystatechange = handler;
//         client.responseType = "json";
//         client.setRequestHeader("Accept", "application/json");
//         client.send();
//     });
//     return promise;
// };
// getJSON("/post.json").then(function (json) {
//     console.log('Contents:' + json);
// }, function (error) {
//     console.log('出错了', error);
// })

//resolve函数的参数还可以是另一个Promise实例
// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(() =>reject(new Error('fail')), 3000);
// })//p1是一个 Promise，3 秒之后变为rejected
// const p2 = new Promise(function (resolve, reject) {
//     setTimeout(()=>resolve(p1), 1000)
// })//p2的状态在 1 秒之后改变，resolve方法返回的是p1。
// p2
//     .then(result => console.log(result))
//     .catch(error => console.log(error));//又过了2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

//resolve或reject并不会终结Promise的参数函数执行
// new Promise((resolve, reject) => {
//     resolve(1);
//     console.log(2);
// }).then(r=>{
//     //console.log("r="+r);//1
//     console.log(r);
// })//resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
// 2
// 1

//调用resolve或reject以后，Promise 的使命就完成了
//后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面
// new Promise((resolve, reject) => {
//     return resolve(1);
//     console.log(2);//不输出
// })


//Promise.prototype.then()
