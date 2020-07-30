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
function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        const image = new Image();
        image.onload = function() {
            resolve(image);
        };

        image.onerror = function() {
            reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    });
}
loadImageAsync("https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E7%9B%97%E5%A2%93%E7%AC%94%E8%AE%B0&step_word=&hs=0&pn=154&spn=0&di=53240&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1554479173%2C369057525&os=3800189175%2C3772963134&simid=0%2C0&adpicid=0&lpn=0&ln=1693&fr=&fmq=1596079436672_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fe4635885bfb3eb29e3bc86d486e62c399ba8e263.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bktstktst_z%26e3Bv54AzdH3F6jw1AzdH3Fve899ld0bAzdH3F&gsm=99&rpstart=0&rpnum=0&islist=&querylist=&force=undefined");