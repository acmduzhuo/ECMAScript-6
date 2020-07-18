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
typeof undeclared_variable;
console.log(undeclared_variable);