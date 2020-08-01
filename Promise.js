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
// getJSON("/posts.json").then(function (json) {
//     return json.post;
// }).then(function (post) {//then的方法是定义在原型对象Promise.prototype上的，为Promise实例添加状态改变时的回调函数
//
// });//链式写法，then方法返回的是一个新的Promise实例，then方法后面再调用另一个then方法

//前一个回调函数，返回一个Promise对象，这时后一个回调函数，等该Promise对象状态发生变化，才会被调用
// getJSON("/post/1.json").then(function (post) {
//     return getJSON(post.commentURL);
// }).then(function (comments) {
//     console.log("resolved: ", comments);
// },function (err) {
//     console.log("rejected: ", err);
// });//这个新的Promise对象状态发生变化。如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。

//箭头函数表示
// getJSON("/post/1.json").then(
//     post => getJSON(post.commentURL)
// ).then(
//     comments => console.log("resolved: ", comments),
//     err => console.log("rejected: ", err)
// );


//Promise.prototype.catch()
//是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误的回调函数
// getJSON('/posts.json').then(function (posts) {
//     //
// }).catch(function (error) {//捕获Promise对象变为rejected状态和then方法中抛出的错误
//     console.log('发生错误！', error);//处理getJSON和前一个回调函数运行时发生的错误
// });

// p.then((val) => console.log('fulfilled:', val))
//     .catch((err)=>console.log('rejected', err));
// //等同于
// p.then((val) => console.log('fulfilled:', val))
//     .then(null,(err)=>console.log("rejected:", err));

//实例
// const promise = new Promise(function (resolve, reject) {
//     throw new Error('test');
// });
// promise.catch(function (error) {
//     console.log(error);//promise抛出一个错误，就被catch捕获
// });

// const promise = new Promise(function (resolve, reject) {
//     try{
//         throw new Error('test');
//     } catch (e) {
//         reject(e);
//     }
// });
// promise.catch(function (error) {
//     console.log(error);
// });
// const promise = new Promise(function (resolve, reject) {
//     reject(new Error('test'));//等于抛出错误
// });
// promise.catch(function (error) {
//     console.log(error);
// });

//Promise状态变为resolved，再抛出错误是无效的
// const promise = new Promise(function (resolve,reject) {
//     resolve('ok');//Promise状态一旦改变了，就永久保持该状态
//     throw new Error('test');//无效
// });
// promise
//     .then(function (value) {
//         console.log(value);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

//Promise对象的错误总是具有“冒泡”性质，会一直向后传递，直到被捕获
// getJSON('/post/1.json').then(function (post) {
//     return getJSON(post.commentURL);
// }).then(function (comments) {
//
// }).cache(function (error) {
//     //处理前面三个Promise产生的错误
//     //一个getJSON产生，两个then产生
// })

//不要在Reject状态的回调函数（即then的第二个参数），总是使用catch方法
//错误示例
// promise
//     .then(function (data) {
//         //success
//     }, function (err) {
//         //error
//     });
//正确示例
// promise
//     .then(function (data) {
//         //success
//     })
//     .catch(function (err) {
//         //error
//     })

//不同于try catch，Promise对象的错误不会传递到外层代码
// const someAsyncThing = function () {
//     return new Promise(function (resolve, reject) {
//         resolve(x + 2);//会报错
//     });
// };
// someAsyncThing().then(function() {
//     console.log('everything is great');
// });
//
// setTimeout(() => { console.log(123) }, 2000);//但并不影响2秒后输出123
// //Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
// process.on('unhandledRejection', function (err, p) {
//     throw err;
// });//node.js专门监听未捕获的reject错误，上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误。

// const promise = new Promise(function (resolve, reject) {
//     resolve('ok');
//     setTimeout(function () {
//         throw new Error('test')
//     }, 0)//在Promise函数体外抛出的，会冒泡到最外层，成了未捕获的错误
// });
// promise.then(function (value) {
//     console.log(value);
// });
//ok
// Uncaught Error: test

//一般总是建议，Promise 对象后面要跟catch()方法，这样可以处理 Promise 内部发生的错误。catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。
// const someAsyncThing = function () {
//     return new Promise(function (resolve, reject) {
//         resolve(x+2);
//     });
// };
// someAsyncThing()
//     .catch(function (error) {
//         console.log('oh no', error);//oh no ReferenceError: x is not defined
//     })
//     .then(function () {
//         console.log('carry on');//carry on
//     })
//
//如果then方法无误，则会跳过catch方法
// Promise.resolve()
//     .catch(function (error) {
//         console.log('oh fuck', error);
//     })
//     .then(function () {
//         console.log('carry on');
// });//carry on

//catch还能再抛出错误
const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        resolve(x + 2);//报错
    });
};
// someAsyncThing().then(function () {
//     return someAsyncThing();
// }).catch(function (error) {
//     console.log('oh no', error);
//     y + 2;//报错
// }).then(function () {
//     console.log('carry on');
// })//catch()方法抛出一个错误，因为后面没有别的catch()方法了，导致这个错误不会被捕获，也不会传递到外层
//改写一下
// someAsyncThing().then(function () {
//     return someAsyncThing();
// }).catch(function (error) {
//     console.log('oh on', error);
//     y + 2;//报错
// }).catch(function (error) {
//     console.log('carrty on', error);
// })//oh on ReferenceError: x is not defined
//第二个catch()方法用来捕获前一个catch()方法抛出的错误。