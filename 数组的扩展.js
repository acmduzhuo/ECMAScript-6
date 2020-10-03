//1、扩展运算符
//将数组转为逗号分隔的参数序列
// console.log(...[1, 2, 3]);
// console.log(1, ...[2, 3, 4], 5);
// console.log(...document.querySelectorAll('div'));//也可以转换DOM
//用于函数调用
// function push(array, ...items) {
//     array.push(...items);
// }
// function add(x, y) {
//     return x + y;
// }
// const numbers = [4, 38];
// console.log(add(...numbers));
//扩展运算符结合正常函数参数
// function f(v, w, x, y, z) {}
// const args = [0, 1];
// console.log(f(-1, ...args, 2, ...[3]));
//扩展运算符后面还可以放置表达式
// const arr = [
//     ...(x>0 ? ['a']: []),
//     'b',
// ];
// console.log(arr);
//空数组的扩展运算符，无效果
// console.log([...[], 1]);//[ 1 ]
//注意，只有当函数调用时，扩展运算符才能放到
// console.log(...[1, 2]);
// console.log((...[1, 2]));//SyntaxError

//替代函数的apply方法
// function f(x, y, z) {
//     return x+y+z;
//     //ES5
// }
// var args = [0, 1, 2];
// console.log(f.apply(null, args));
//
// function f1(x, y, z) {
//     return x+y+z;
//     //ES6
// }
// console.log(f(...args));
// console.log(Math.max.apply(null, [14, 3, 77]));//ES5
// console.log(Math.max(...[14, 3, 77]));//ES6
// console.log(Math.max(14, 3, 77));//与上等同
//ES5中的push
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// Array.prototype.push.apply(arr1, arr2);
// console.log(arr1);
//ES6
// arr1.push(...arr2);
// console.log(arr1);
// console.log(new(Date.bind.apply(Date, [null, 2015, 1, 1])));
// console.log(new Date(...[2015, 1, 1]));

//扩展运算符的应用
//（1）复制数组
// const a1 = [1, 2];
// const a2 = a1;
// a2[0] = 2;
// console.log(a1);//[ 2, 2 ]
// console.log(a2);//[ 2, 2 ]
//实现一种浅拷贝
// const a1 = [1, 2];
// const a2 = a1.concat();
// a2[0] = 2;
// console.log(a1);//[ 1, 2 ]
// console.log(a2);//[ 2, 2 ]
//ES5写法，实现一种深拷贝
// const a1 = [1, 2];
// //const a2 = [...a1];
// const [...a2] = a1;//效果相同
// a2[0] = 2;
// console.log(a1);//[ 1, 2 ]
// console.log(a2);//[ 2, 2 ]
//实现一种深拷贝
//（2）合并数组
// const arr1 = ['a', 'b'];
// const arr2 = ['c'];
// const arr3 = ['d', 'e'];
// console.log(arr1.concat(arr2, arr3));//ES5的合并数组
// console.log([...arr1, ...arr2, ...arr3]);//ES6的合并数组
// const a1 = [{foo:1}];
// const a2 = [{bar:2}];
// const a3 = a1.concat(a2);
// console.log(a3);//[ { foo: 1 }, { bar: 2 } ]
// const a4 = [...a1, ...a2];
// console.log(a4);
// console.log(a3[0] === a1[0]);//true
// console.log(a4[0] === a1[0]);//true
//实现一种浅拷贝
//（3）与解构赋值结合
//伪代码
// var list = [0, 1, 2, 3]
// var a = list[0]
// var rest = list.slice(1);//ES5
// var a, rest=[];
// [a, ...rest] = list;//ES6
// console.log(a);
// console.log(rest);
// var a;
// var rest = [1, 2, 3];
// var list = [0, 1, 2, 3];
// [a, ...rest] = list;
// console.log(a);
// console.log(rest);
//other
// const [first, ...rest] = [1, 2, 3, 4 ,5];
// console.log(first);
// console.log(rest);
// const [first, ...rest] = [];
// console.log(first);//undefined
// console.log(rest);//[]
// const [first, ...rest] = ["foo"];
// console.log(first);//foo
// console.log(rest);//[]
//数组赋值，只能扩展运算符放在参数最后一位
// const [...a, b] = [1, 2, 3];//SyntaxError: Rest element must be last element