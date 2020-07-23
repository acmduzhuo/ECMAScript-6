// let [a, b, c] = [1, 2, 3];
// let [foo, [[bar], baz]] = [1, [[2], 3]];//模式匹配
// console.log(foo);
// let [, , third] = ["foo", "bar", "baz"];
// console.log(third);
// let [x] = [1,2,3];
// console.log(x);
// let [x, y, z] = [1];//报错
// let [head,...tail] = [1, 2, 3, 4];
// console.log(tail);//[2,3,4]
// console.log(head);//1
// let [x,y,...z] = ['a'];
// console.log(x);//a
// console.log(y);//undefined
// console.log(z);//[]
// let [x, y, z] = [1];
// console.log(x);//1
// console.log(y);//undefined
// console.log(z);//undefined
//解构不成功，变量值就等于undefined
// let [foo] = [];
// console.log(foo);//undefined
// let [bar, foo] = [1];
// console.log(bar);//1
// console.log(foo);//undefined
//不完全解构
// let [x, y] = [1, 2, 3];
// console.log(x);//1
// console.log(y);//2
// let [a, [b], d] = [1, [2, 3], 4];
// console.log(a);//1
// console.log(b);//2
// console.log(d);//4

//如果右边不是数组，那么将会报错
//let [foo] = 1;
//let [foo] = false;
//let [foo] = NaN;
//let [foo] = undefined;
//let [foo] = null;
//let [foo] = {};
//let [foo] = {1};
//以上代码均报错

//Set结构
// let [x, y, z] = new Set(['a', 'b', 'c']);
// console.log(x);//a
// function* fibs() {
//     let a = 0;
//     let b = 1;
//     while(true){
//         yield a;//函数执行暂停点，相同于return
//         [a, b] = [b, a+b];
//     }
// }
// let [first, second, third, fourth, fifth, sixth] = fibs();
// console.log(sixth);//生成器

//默认值
// let [foo = true] = [];
// console.log(foo);//true
// let [x,y = 'b'] = ['a'];
// console.log(x);//a
// console.log(y);//b
// let [x, y='b'] = ['a', undefined];
// console.log(x);//a
// console.log(y);//b

//ES6内部使用严格的运算符===只有当数组内成员严格等于undefined时，默认值才生效；
// let [x=1] = [undefined];
// console.log(x);
// let [x = 1] = [null];
// console.log(x);//null

// function f() {
//     console.log('aaa');
// }
// let [x = f()] = [1];
// console.log(x);//1
//表达式是惰性求值，只有在用到的时候才会求值

// let[x = 1, y = x] = [];
// console.log(x);//1
// console.log(y);//1
// let[x = 1, y = x] = [2];
// console.log(x);//2
// console.log(y);//2
// let[x = 1, y = x] = [1, 2];
// console.log(x);//1
// console.log(y);//2
// let[x = y,y = 1] = [];//报错
// console.log(x);
// console.log(y);


//对象的解构赋值
// let {foo, bar} = {foo: 'aaa', bar:'bbb'};
// console.log(foo);//aaa
// console.log(bar);//bbb
//对象解构赋值可以没有顺序
// let {foo, bar} = {bar:'bbb', foo: 'aaa'};
// console.log(foo);//aaa
// console.log(bar);//bbb
// let {baz} = {foo:'aaa', bar:'bbb'};
// console.log(baz);//undefined
//解构失败，变量值就为undefined
// let {foo} = {bar:'baz'};
// console.log(foo);//undefined
//let {log, sin, cos} = Math;
//将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上
//const { log } = console;
//log('hello');//将console.log赋值到log变量
//变量名与属性名不一致赋值到某个变量
// let {foo : baz} = {foo:'aaa', bar:'bbb'};
// console.log(baz);//aaa
// let {foo : baz} = {foo:'aaa', bar:'bbb'};
// console.log(foo);//报错
// let {foo : baz} = {baz:'aaa', bar:'bbb'};
// console.log(baz);//undefined
//是先找到同名属性，然后再赋给对应的变量
//foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式fo

//嵌套结构对象
// let obj = {
//     p:[
//         'Hello',
//         {y:'World'}
//     ]
// };
// let {p:[x,{y}]} = obj;
// console.log(x);//Hello
// console.log(y);//World
// let {p, p:[x,{y}]} = obj;//p作为变量赋值
// console.log(p);//[ 'Hello', { y: 'World' } ]
// const node = {
//     loc:{
//         start:{
//             line : 1,
//             colum : 5
//         }
//     }
// };
// let {loc, loc:{start}, loc:{start:{line}}} = node;
// console.log(line);//1
// console.log(loc);//{ start: { line: 1, colum: 5 } }
// console.log(start);//{ line: 1, colum: 5 }
//其中只有line是变量，其余都是模式

//嵌套赋值
// let obj = {};
// let arr = [];
// ({foo:obj.prop, bar:arr[0]} = {foo:123,bar:true});
// console.log(obj);//{ prop: 123 }
// console.log(obj.prop);//123
// console.log(arr);//[ true ]
// console.log(arr[0]);//true

//let {foo:{bar}} = {baz:'baz'};//报错，子对象的父属性不存在

// const obj1 = {};
// const obj2 = {foo:'bar'};
// Object.setPrototypeOf(obj1,obj2);//obj1继承obj2属性foo
// const {foo} = obj1;
// console.log(obj1);//{]
// //foo属性不是obj1自身的属性，而是继承自obj2的属性，解构赋值可以取到这个属性。
// console.log(obj2);//{ foo: 'bar' }
// console.log(obj1.foo);//bar
// console.log(foo);//bar

//默认值
// var {x = 3} = {};
// console.log(x);//3
// var {x, y = 5} = {x:1};
// console.log(x);//1
// console.log(y);//5
// var {x:y=3} = {};
// console.log(y);//3
// console.log(x);//报错
// var {x:y = 3} = {x:5};
// console.log(y);//5
//默认值生效的条件是，对象的属性值严格等于undefined。
// var {x = 3} = {x : undefined};
// console.log(x);//3
// var {x = 3} = {x:null};
// console.log(x);//null

// let x;
// {x} = {x:1};
//     console.log(x);//报错
//将其解释为了代码块
// let x;
// ({x} = {x:1});
// console.log(x);//1
//数组本身是特殊的对象，也可以进行对象属性的解构
// let arr = [1, 2, 3];
// let {0: first, [arr.length-1] : last} = arr;
// console.log(first);//1
// console.log(last);//3

//字符串解构赋值
// const [a, b, c, d, e] = 'hello';
// console.log(a);//h
// console.log(b);//e
// console.log(c);//l
// console.log(d);//l
// console.log(e);//o
// let {length:len} = 'hello';
// console.log(len);//5

//数值和布尔值的解构赋值
// let {toString:s} = 123;
// console.log(s === Number.prototype.toString);//true
// let {toString:s} = true;
// console.log(s === Boolean.prototype.toString);//true

//函数参数的解构赋值
// function add([x, y]) {
//     return x + y;
// }
// add([1,2]);
//[[1,2], [3,4]].map(([a,b]) => a + b);
// function move({x= 0,y=0} = {}) {
//     return[x, y];
// }
// console.log(move({x:3,y:8}));//[ 3, 8 ]
// console.log(move({x:3}));//[ 3, 0 ]
// console.log(move({}));//[ 0, 0 ]
// console.log(move());//[ 0, 0 ]
// function movement({x,y} = {x:0, y:0}) {
//     return [x, y];
// }
// console.log(movement({x:3,y:8}));
// console.log(movement({x:3}));//[ 3, undefined ]
// console.log(movement({}));//[ undefined, undefined ]
// console.log(movement());
//由于函数是对参数赋值，并非对xy赋值，因此当出现undefined时，会触发默认值。

//圆括号内容
//不得使用圆括号
//变量声明
//let [(a)] = [1];
//let {x:(c)} = {};
//let {(x:c)} = {};
//let {(x):c} = {};

//函数参数
// function f([(z)]) {
//     return z;
// }
// function f([z,(x)]) {
//     return x;
// }

//赋值语句的模式
//({p:a}) = {p:42};
//([a]) = [5];
//[({p:a}), {x:c}] = [{}, {}];
//([a] = [5]);//不报错
//[a] = ([5]);//不报错
//[a] = [(5)];//不报错

//可以使用圆括号的情况赋值语句的非模式部分
// [(b)] = [3];
// ({p:(d)} = {});
// [(parseInt.prop)] = [3];

//用途
//交换变量的值
// let x = 1;
// let y = 2;
// [x, y] = [y, x];
// console.log(x);//2
// console.log(y);//1

//从函数返回多个值
// function example() {
//     return [1, 2, 3];
// }
// let [a, b ,c] = example();
// console.log(example());//返回一个对象
// function example() {
//     return {
//         foo : 1,
//         bar : 2
//     };
// }
// let {foo, bar} = example();
// console.log(example());//{ foo: 1, bar: 2 }
//要返回多个值，只能将它们放在数组或对象里返回

//函数参数定义
// function f([x, y, z]) {
//
// }
// f([1, 2, 3]);//参数一组有次序的值
// function f1({x, y, z}) {
//
// }
// f1({x:1,z:3,y:2});//参数可以无次序

//提取JSON数据
// let jsonData = {
//     id : 42,
//     status : "OK",
//     data : [867, 5309]
// };
// let {id, status, data:number} = jsonData;
// console.log(id, status, number);

//函数参数的默认值
//就避免了在函数体内部再写var foo = config.foo || 'default foo'

//遍历Map结构
// const map = new Map();
// map.set('first', 'hello');
// map.set('second', 'world');
// for(let [key, value] of map){
//     console.log(key + " is " + value);
// }
// //任何部署了 Iterator 接口的对象，都可以用for...of循环遍历
// for(let [key] of map){
//
// }//获取键名
// for(let [, value] of map){
//
// }//获取键值

//输入模块指定方法
