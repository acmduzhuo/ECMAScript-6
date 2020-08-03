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
// const someAsyncThing = function () {
//     return new Promise(function (resolve, reject) {
//         resolve(x + 2);//报错
//     });
// };
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


//Promise.prototype.finally()
//不管Promise对象最后状态如何
// promise
//     .then(result=>{})
//     .catch(error=>{})
//     .finally(()=>{});//无论Promise最后状态，都会执行finally回调函数
// server.listen(port)
//     .then(function () {
//
//     })
//     .finally(server.stop);//finally不接受参数，并不关心Promise对象的结果

//finally是then的特例
// promise
//     .finally(()=>{
//         //语句
//     });
//等同于
// promise
//     .then(
//         result=>{
//             return result;
//         },
//         error => {
//             throw error;
//         }
//     );

//实例
// Promise.prototype.finally = function (callback) {
//     let p = this.constructor;
//     return this.then(
//         value => P.resolve(callback()).then(()=>value),
//         reason => P.resolve(callback()).then(()=>callback);
//     );
// };//不管Promise对象是fulfilled还是rejected，都会调用callback

//finally方法总是会返回原来的值
// Promise.resolve(2).then(()=>{},()=>{});//undefined
// Promise.resolve(2).finally(()=>{});//2
// Promise.reject(3).then(() => {}, () => {})// reject 的值是 undefined
// Promise.reject(3).finally(() => {})// reject 的值是 3

//Promise.all()
//将多个Promise实例，包装为一个新的Promise实例
//const p = Promise.all([p1, p2, p3]);
//如果这三个元素不都是Promise对象，则会调用Promise.sesolve方法，将参数转为Promise实例
//参数可以不是数组，但是必须具有Iterator接口，且返回的每个成员都是Promise实例
//p的状态由p1，p2，p3决定
//三者均为fulfilled，p的状态才为fulfilled，三者返回值组成一个数组，传递给p的回调函数
//只要有一个被rejected，p的状态就会变为rejected，第一个被reject的实例，会返回p的回调函数
// const promise = [2, 3, 5, 7, 11, 13].map(function (id) {
//     return getJSON('/post/' + id + ".json");
// });
// Promise.all(promise).then(function (posts) {
// //
// }).catch(function (reason) {
//
// })
//只有6个都变为fulfilled或者其中一个变为rejected，才会调用Promise回调函数

//如果作为参数的Promise实例，自己定义了catch方法，一旦被reject，那么并不会出发Promise.all中的catch
// const p1 = new Promise((resolve, reject) => {
//     resolve('hello');
// })
//     .then(result => result)
//     .catch(e => e);
// const p2 = new  Promise((resolve, reject) => {
//     throw new Error('报错了');
// })
//     .then(result => result)
//     .catch(e => e);//由于p2自己有catch，当error时，会执行catch方法，返回一个新的Promise对象，状态为resolved，
// Promise.all([p1, p2])//两个参数均为resolved，所有调用then
//     .then(result => console.log(result))
//     .catch(e => console.log(e));
//[ 'hello',
//   Error: 报错了]

//如果p2没有自己的catch方法
// const p1 = new Promise((resolve, reject) => {
//     resolve('hello');
// })
//     .then(result => result);
//
// const p2 = new Promise((resolve, reject) => {
//     throw new Error('报错了');//p2的状态为reject
// })
//     .then(result => result);
//
// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(e => console.log(e));//执行catch方法，输出第一个为reject的实例p2
//Error: 报错了


//Promise.race()
//只要有一个实例率先改变状态，p就会跟着改变，率先改变的Promise实例的返回值，就会传递给p的回调函数
//参数同Promise.all()，如果不是Promise实例，那么就调用Promise.resolve()方法
// const p = Promise.race([
//     fetch('/resource-that-may-a-while'),
//     new Promise(function (resolve, reject) {
//         setTimeout(()=>reject(new Error('request timeout')), 5000)//五秒内未返回结构，p的状态就会变为rejected，从而触发catch
//     })
// ]);
// p
//     .then(console.log)
//     .catch(console.error);


//Promise.allSettled()
//接受一组Promise实例作为参数，包装成一个新的Promise实例
//只有等参数实例都返回结果，不管结果如何，包装实例才会结束
// const promises = [
//     fetch('/api-1'),
//     fetch('/api-2'),
//     fetch('/api-3'),
// ];//等到三个请求都结束，不管请求结果如何，加载的滚动图标就会消失
// await Promise.allSettled(promises);//返回新的实例，状态总是fulfilled
// removeEventListener();//监听函数接受到的参数是一个数组，每个成员对应传入的Promise实例

// const resolved = Promise.resolve(42);
// const rejected = Promise.reject(-1);
// const  allSettledPromise = Promise.allSettled([resolved,rejected]);//状态只能为fufilled
// allSettledPromise.then(function (results) {
//     console.log(results);//成员对应两个Promise实例
// });

//返回值用法的例子
// const promises = [fetch('index.html'), fetch('https://does-not-exiset')];
// const results = await Promise.allSettled(promises);
//
// const successfulPromises = results.filter(p => p.status === 'fulfilled');//过滤出成功的请求
//
// const errors = results
//     .filter(p => p.status === 'rejected')
//     .map(p => p.reason);//过滤出失败的请求，并输出原因
//Promise.all方法
// const urls = ['https://ababaab'];
// const requests = urls.map(x => fetch(x));
// try{
//     await Promise.all(results);
//     console.log('所有请求都成功。');
// } catch {
//     console.log('至少一个请求失败，其他的可能还没结束');
// }


//Promise.any()
//接收一组Promise实例，包装成一个新的fufilled状态；
//只要有一个fulfilled，包装实例就会变为fulfilled状态
//如果都是rejected，包装实例就会变为rejected
//尚未被所有浏览器支持，webstorm不具备提示信息
// const promise = [
//     fetch('a').then(()=>'a'),
//     fetch('b').then(()=>'b'),
//     fetch('c').then(()=>'c'),
// ];
// try {
//     const first = await Promise.any(promise);
//     console.log(first);//其中只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled。
// } catch (error) {
//     console.log(error);//如果所有三个操作都变成rejected，那么await命令就会抛出错误。
// }

//Promise.any()抛出的错误，是一个AggregateError 实例。它相当于一个数组，每个成员对应一个被rejected的操作所抛出的错误；
//new AggregateError() extends Array -> AggregateError
// const err = new AggregateError();
// err.push(new Error("first error"));
// err.push(new Error("second error"));
// throw err;

//捕捉错误的另一种写法
// Promise.any(promises).then(
//     (first) => {
//         //一些为fulfilled
//     },
//     (error) => {
//         //所有为rejected
//     }
// );

//实例
//var resolved = Promise.resolve(42);
// var rejected = Promise.reject(-1);
// var alsoRejected = Promise.reject(Infinity);
//
// Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
//     console.log(result); // 42
// });//fulfilled
//
// Promise.any([rejected, alsoRejected]).catch(function (results) {
//     console.log(results); // [-1, Infinity]
// });//rejected


//Promise.resolve()
//转为Promise对象
//const jsPromise = Promise.resolve($.ajax('/whatever.json'));
//上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。

//等价写法
// Promise.resolve('foo');
// new Promise(resolve => resolve('foo'));

//参数的四种情况
//1、参数是一个Promise实例
//不改动

//2、参数是一个thenable对象
//将其转为Promise对象，然后立即执行该对象的then方法
// let thenable = {
//     then:function (resolve, reject) {
//         resolve(42);
//     }
// };
// let p1 = Promise.resolve(thenable);
// p1.then(function (value) {
//     console.log(value);
// });
//thenable对象then方法执行后，对象p1变为resolved，
//立即执行后面的then回调函数

//3、参数不是具备then方法的对象，或者根本不是对象
//返回一个新的Promise对象，状态为resolved
// const p = Promise.resolve('Hello');
// p.then(function (s) {
//     console.log(s);//'Hello'
// });
//从一生成就是resolved状态，因此回调函数可以立即执行

//不带有任何参数
//Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
// const p = Promise.resolve();
// p.then(function () {
//
// })

//立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
// setTimeout(function () {
//     console.log('three');
// }, 0);
//
// Promise.resolve().then(function () {
//     console.log('two');
// });
// console.log('one');
//one
// two
// three

//题外话
// new Promise(resolve => {
//     resolve(1);
//     Promise.resolve({
//         then: function(resolve, reject){
//             console.log(2);
//             resolve(3)
//         }
//     }).then(t => console.log(t))
//     console.log(4);
// }).then(t => console.log(t));
// console.log(5);
// 4
// 5
// 2
// 1
// 3

// new Promise(resolve => {
//
//     resolve(1);
//     new Promise(resolve=>{
//         console.log(2);
//         resolve(3)
//     }).then((t) => console.log(t));
//     console.log(4);
// }).then(t => console.log(t));
// console.log(5);
// 2
// 4
// 5
// 3
// 1


//Promise.reject()
// const p = Promise.reject('出错了');
// 等同于
// const p = new Promise((resolve, reject) => reject('出错了'));
// p.then(null, function (s) {
//     console.log(s);//出错了
// })

//Promise.reject()方法的参数，会原封不动的作为reject的理由，变为后续方法的参数
//Promise.resolve方法则不同，继承下来的是数据
// const thenable = {
//     then(resolve, reject){
//         reject('出错了');
//     }
// };
// Promise.reject(thenable)
//     .catch(e=>{
//         console.log(e === thenable);//true
//     })//执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。


//应用
//加载图片
// const preloadImage = function (path) {
//     return new Promise(function (resolve, reject) {
//         const image = new Image();
//         image.onload = resolve;
//         image.onerror = reject;
//         image.src = path;
//     });
// };//一旦加载完成，Promise的状态就发生变化。


//Promise.try()
Promise.try()
Promise.any()