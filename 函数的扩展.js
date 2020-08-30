//基本用法
//ES6之前，不能直接在函数的参数指定默认值
// function log(x, y) {
//     //y = y || 'World';
//     if(typeof y === 'undefined'){
//         y = 'World';
//     }
//     console.log(x,y);
// }
// log('Hello');
// log('Hello', 'China');
// log('Hello', '');
// log('Hello', false);//Hello World 但是对应的布尔值为false，则该赋值不起作用
//ES6写法 简洁
// function log(x, y = 'World') {
//     console.log(x, y);
// }
// log('Hello');
// log('Hello', 'China');
// log('Hello', '');

// function Point(x=0, y=0) {
//     //var x = 1; //变为1
//     //let x = 2;//SyntaxError
//     //const x = 2;//SyntaxError
//     this.x = x;
//     this.y = y;
// }
// const  p = new Point();
// console.log(p);//Point { x: 0, y: 0 }

// function foo(x, x, y) {
// }
// function foo(x, x, y=1) {
//
// }//使用参数默认值时，函数不能有同名参数。
//小插曲
// function f(x) {
//     return x;
// }
// function f(x) {
//     return x+1;
// }
// var x = 0;
// console.log(f(x));//1

//参数默认值惰性求值，每一次都要重新计算默认值表达式的值
// let x = 99;
// function foo(p = (x + 1)) {
//     console.log(p);
// }
// foo();//100
// x = 100;
// foo();//101
// let x = 99;
// function foo(p) {
//     p = x + 1;
//     console.log(p);
// }
// foo();//100
//x = 100;
// foo();//101

//与解构赋值默认值结合使用
// function foo({x, y=5}) {
//     console.log(x, y);
// }
// foo({});//undefined 5
// foo({x:1});//1 5
// foo({x:1, y:2});//1 2
// foo();//TypeError

// function foo({x, y=5} = {}) {
//     console.log(x, y);
// }
// foo();//undefined 5
// foo({x:1, y:2});//1 2