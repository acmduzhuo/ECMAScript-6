// {
//     let a  = 10;
//     var b  = 1;
// }
// console.log(a);
//     console.log(b);
// for(let i = 0;i < 10;i++){
//
// }
// console.log(i);
// var a = [];
// for(var i = 0;i < 10;i++){
//     a[i] = function () {
//         console.log(i);
//     }
// }
// a[6]();
// var b = [];
// for(let i = 0;i < 10;i++){
//     a[i] = function () {
//         console.log(i);
//     }
// }
// a[6]();
// for(let i = 0;i<3;i++){//父作用域
//     let i = 'abc';//子作用域
//     console.log(i);
// }
//变量提升
// console.log(a);
// var a = 10;//undefined
// console.log(b);
// let b = 10;//报错
//暂时性死区
var tmp = 123;
if(true){
    tmp = 'abc';
    //let tmp;
}
//隐藏死区
// function bar(x = y, y = 2) {
//     return [x, y];
// }
// console.log(bar());//报错，在y声明前使用了y
// function bar(x = 2, y = x) {
//     return [x, y];
// }
// console.log(bar());//无误

// var x = x;
// let x = x;//报错，在声明前使用

//不允许重复声明
// function func() {
//     let a = 10;
//     let a  = 1;//报错
//     console.log(a);
// }
// func();
// function func() {
//     let a = 1;
//     var a = 10;//报错
//     console.log(a);
// }
// func();

// function func(arg) {
//     let arg;//函数内部重新声明参数报错
//     console.log(arg);
// }
// func();
// function func(arg) {
//     {
//         let arg;
//     }
// }
// func();//不报错


//块级作用域
// var tmp = new Date();
// function f() {
//     console.log(tmp);
//     if(false){
//         var tmp = 'hello world';
//     }
// }
// f();
//内层变量覆盖了外层变量
// var s = 'hello';
// for(var i = 0;i < s.length;i++){
//     console.log(s[i]);
// }
// console.log(i);//5
//泄露为全局变量

//ES6中的块级作用域
// function f1() {
//     let n = 5;
//     if(true){
//         let n = 10;
//     }
//     console.log(n);
// }
// f1();输出5，不受内层代码块的影响
//
// if(false){
//     console.log(1);
// }

// {{{{
//     {let insane = 'Hello, World'}
//     console.log(insane);//无法读取到第五层作用域内部变量
// }}}}

// {{{{
//     let insane = 'Hello, World12';
//     {let insane = 'Hello World'
//         console.log(insane);}
// }}}}//内层作用域可以定义外层作用域的同名变量
//
// (function () {
//     var temp = 1;
//     console.log(temp);
// }());//立即执行函数
// {
//     let tmp = 10;
//     console.log(tmp);
// }//方便书写立即执行函数

//块级作用域与函数声明
// if(true){
//     f();
//     function f() {
//         console.log(1);
//     }
// }
//避免在块级作用域内声明函数，如果需要，可以写为函数表达式
// {
//     let a = 'secret';
//     function f() {
//         return a;
//     }
// }
// console.log(f());
// {
//     let a = 'secret';
//     let f = function () {
//         return a;
//     };
// }
// console.log(f());

//大括号作为块级引用域的标志
//let只能在当前作用域的顶层
// if(true)
//     let x = 1;//报错
// if(true){
//     let x = 1;
// }//正常

if(true){
    function f() {

    }
}//不报错

if(true)
    function f1() {

    }//报错


//const命令
//一旦声明，常量的值不能改变
// const PI = 3.1415;
// console.log(PI);
//一旦声明，必须初始化
// const a;//声明不赋值，报错
// if(true){
//     const  MAX  = 5;
// }
// console.log(MAX);//报错，只在块级作用域内有效
//暂存死区
// if(true){
//     console.log(MAX);
//     const MAX = 5;
// }//暂存死区
// //不可重复声明
// var message = 'Hello!';
// let age = 25;
// const message = 'World!';
// let age = 10;//报错

//本质
//const可以指向内存地址，但是指向的数据结构可变，指向不可变
// const foo = {};
// foo.prop = 123;
// console.log(foo.prop);
// foo = {};

// const a = [];
// a.push('Hello');
// a.length = 0;//无误
// a = ['Dave'];
// //a可写，但不可赋值

// const foo = Object.freeze({});
// foo.prop = 123;

window.a = 1;
console.log(a);