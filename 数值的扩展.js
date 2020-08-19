//1、二进制和八进制的表示法
// console.log(0b111110111 === 503)//0b 0B前缀表示二进制
// console.log(0o767 === 503)//0o 0O前缀表示八进制

// (function () {
//     console.log(0o11 === 011);//true， 但是报错
// })()//从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示。
// (function () {
//     `use strict`;
//     console.log(0o11 === 011);//true
//     //Octal literals with prefix '0' are not allowed. Use '0o' prefix instead
// })()//ES6 进一步明确，要使用前缀0o表示。

//将0b与0o前缀字符串转为十进制
// console.log(Number('0b111'));//7
// console.log(Number('0o10'));//8


//2、Number.isFinite() Number.isNaN()
// Number.isFinite()//检查一个数是不是有限的，即不是Infinity
// console.log(Number.isFinite(15));//true
// console.log(Number.isFinite(0.8))//true
// console.log(Number.isFinite(NaN));//false
// console.log(Number.isFinite(Infinity));//false
// console.log(Number.isFinite(-Infinity));//false
// console.log(Number.isFinite('15'))//false
// console.log(Number.isFinite(true));//false
// console.log(Number.isFinite())//false 空值

//Number.isNaN()//检查一个值是否为NaN
//如果参数类型不是NaN 那么一律返回false
// console.log(Number.isNaN(NaN));//true
// console.log(Number.isNaN(15))//false
// console.log(Number.isNaN('15'))//false
// console.log(Number.isNaN(true))//false
// console.log(Number.isNaN(9/NaN));//true
// console.log(Number.isNaN(NaN/9))//true
// console.log('true'/ 0)//NaN
// console.log('a' / 0)//NaN
// console.log('a' / 'a')//NaN
// console.log(Number.isNaN())//false

//与传统isFinite(),isNaN()区别在于，传统方法先要调用Number方法，把非数值转为数值
// console.log(isFinite(25))//true
// console.log(isFinite('25'));//true
// console.log(Number.isFinite("25"))//false
// console.log(isNaN(NaN))//true
// console.log(isNaN("NaN"))//true
// console.log(isNaN(1))//false


//3、Number.parseInt(),Number.parseFloat()与parseInt()parseFloat()
// console.log(parseInt('12.34'))//12
// console.log(parseInt('12.*12'))//12
// console.log(parseInt('1#1'))//1
// console.log(parseFloat('12.^23'))//12
// console.log(parseFloat('12.34#'))//12.34
// console.log(parseInt('12.34#11'))//12

//ES6写法
// console.log(Number.parseInt('12.34'))//12
// console.log(Number.parseFloat('123.45#'))//123.45

// console.log(Number.parseInt === parseInt)//true
// console.log(Number.parseFloat === parseFloat)//true
//减少全局性方法，使得语言逐步模块化

//4、Number.isInteger()判断一个数值是否为整数
// console.log(Number.isInteger(25))//true
// console.log(Number.isInteger(25.1))//false
// console.log(Number.isInteger(25.0))//在JS内部，整数和浮点数采用的是同样的储存方式，因此25和25.0被视为同一个值

//如果参数不是数值，会返回false
// console.log(Number.isInteger())//false
// console.log(Number.isInteger(null));//false
// console.log(Number.isInteger('15'))//false
// console.log(Number.isInteger(true))//false

// console.log(Number.isInteger(3.0000000000000002));//true
///由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，
// 数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。
// 如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。

// console.log(Number.MIN_VALUE);//5e-324
// console.log(Number.isInteger(5e-324))//false JavaScript 能够分辨的最小值,被识别为0
// console.log(Number.isInteger(5e-325))//true
//对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。

// 5、Number.EPSILON
// 这是一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
// console.log(Number.EPSILON === Math.pow(2, -52))//true
// console.log(Number.EPSILON);//2.220446049250313e-16
// console.log(Number.EPSILON.toFixed(20))
// var n = 1.458;
// console.log(n.toFixed(2))//1.46 四舍五入 保存指定位数小数点
//误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

//浮点数的计算并不精确
// console.log(0.1+0.2);//0.30000000000000004
// console.log(0.1 + 0.2 === 0.3)//false

//通过Number.EPSILON设置可以接受的最小误差范围
// function Within(left, right) {
//     return Math.abs(left - right) < Number.EPSILON*Math.pow(2, 2);
// }
// console.log(0.1 + 0.2 === 0.3)
// console.log(Within(0.1+0.2, 0.3))//true


//6、安全整数Number.isInteger()
//JS能够准确表示的整数范围在-2^53到2^53之间
// console.log(Math.pow(2, 53))//9007199254740992
// console.log(Math.pow(2,53) === Math.pow(2,53)+1)//true
//超出 2 的 53 次方之后，一个数就不精确了。

// console.log(Number.MAX_SAFE_INTEGER);//9007199254740991
// console.log(Number.MAX_VALUE);//1.7976931348623157e+308
// console.log(Number.MIN_VALUE);//5e-324
// console.log(Number.MIN_SAFE_INTEGER);//-9007199254740991
// console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53)-1);//true
// console.log(Number.MAX_SAFE_INTEGER === -Number.MIN_SAFE_INTEGER);//true
// JS能够精确的极限Number.MIN_SAFE_INTEGER - Number.MAX_SAFE_INTEGER

//Number.isSafeInteger()判断是否在这个范围之内
// console.log(Number.isSafeInteger('a'));//false
// console.log(Number.isSafeInteger(null));//false
// console.log(Number.isSafeInteger(NaN));//false
// console.log(Number.isSafeInteger(Infinity));//false
// console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER+1));//false
// console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));//true
// console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER-1));//false

//该函数实现原理
// Number.isSafeInteger = function (n) {
//     return (typeof n === 'number' &&
//     Math.round(n) === n &&
//     Number.MIN_SAFE_INTEGER <= n &&
//     n<= Number.MAX_SAFE_INTEGER);
// }

//在计算过程中，会验证参与计算的每个值
// console.log(Number.isSafeInteger(9007199254740993))
// console.log(Number.isSafeInteger(990))
// console.log(9007199254740993 - 990)//9007199254740002
//Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。

//不止验证结果
// function trusty (left, right, result) {
//     if (
//         Number.isSafeInteger(left) &&
//         Number.isSafeInteger(right) &&
//         Number.isSafeInteger(result)
//     ) {
//         return result;
//     }
//     throw new RangeError('Operation cannot be trusted!');
// }
// trusty(9007199254740993, 990, 9007199254740993 - 990)// RangeError: Operation cannot be trusted!
// trusty(1, 2, 3)


//7、Math对象的扩展
//Math.trunc()去除一个数的小数部分，返回整数部分
// console.log(Math.trunc(4.1));//4
// console.log(Math.trunc(4.9));//4
// console.log(Math.trunc(-4.1));//-4
// console.log(Math.trunc(-4.9));//-4
// console.log(Math.trunc(-0.1));//-0 比较蠢
// console.log(Math.trunc(0.1));//0
//console.log(Math.trunc(0.0.1));//报错
//console.log(Math.trunc( .1));//0
// console.log(Math.trunc(1 .0));//报错
//非数值
//Math.trunc()先将其转化为数值，然后再进行操作
// console.log(Math.trunc('123.456'));//123
// console.log(Math.trunc(true))//1
// console.log(Math.trunc(false))//0
// console.log(Math.trunc(null))//0

//对于空值和无法截取到整数的值，返回NaN
// console.log(Math.trunc(NaN))//NaN
// console.log(Math.trunc('foo'))
// console.log((Math.trunc('a1')))//NaN
// console.log(Math.trunc())//NaN
// console.log(Math.trunc(undefined));//NaN

//代码模拟
// console.log(Math.ceil(1.2));
// Math.trunc = Math.trunc || function (x) {
//     return x < 0 ? Math.ceil(x) : Math.floor(x);
//     //向上取整， 向下取整
// }

//Math.sign() 判断一个数字是正还是负，还是0
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为 0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。
// console.log(Math.sign(-5));//-1
// console.log(Math.sign(5));//+1
// console.log(Math.sign(0.1))//+1
// console.log(Math.sign(-0.9));//-1
// console.log(Math.sign(0));//0
// console.log(Math.sign(-0));//-0 想不出来这个存在有啥意义
// console.log(Math.sign(NaN));//NaN
// console.log(Math.sign(null));//0
// console.log(Math.sign('a'));//NaN
// console.log(Math.sign());//NaN

//如果是非数值，则会自动转为数值，对于无法转为数值的，则返回NaN
// console.log(Math.sign(''));//0
// console.log(Math.sign(true));//1
// console.log(Math.sign(false));//0
// console.log(Math.sign(null))//0
// console.log(Math.sign('9'));//9
// console.log(Math.sign('foo'));//NaN
// console.log(Math.sign(undefined));//NaN
// console.log(Math.sign('a9'));//NaN

//代码模拟
// var a = '3';
// console.log(+a);//3 字符转数字
// var b = 'a2';
// console.log(+b);//NaN

// Math.sign = Math.sign || function (x) {
//     x = +x;
//     if(x==0 || isNaN(x)){
//         return x;
//     }
//     return x>0 ? 1 : -1;
// }

//题外话，测试一下
// for(let i=0;i<5;i++){
//     if(!i){
//         console.log("测试成功");
//     }else {
//         continue;
//     }
// }//测试成功，0代表！

//Math.cbrt()计算一个数的立方根
// console.log(Math.cbrt(-1));//-1
// console.log(Math.cbrt(0));//0
// console.log(Math.cbrt(1));//1
// console.log(Math.cbrt(2));//1.2599210498948732

//对于非数值，内部先使用number先将其转为数值
//对于无法转为数值的，返回NaN
// console.log(Math.cbrt('8'));//2
// console.log(Math.cbrt(null))//0
// console.log(Math.cbrt('hello'));//NaN

//代码部署
// Math.cbrt = Math.cbrt || function () {
//     var y = Math.pow(Math.abs(x), 1/3);
//     return x < 0 ? -y : y;
// };
//题外话，测试pow是否不接收负数
// console.log(Math.pow(-8, 1/3));//NaN
// console.log(Math.pow(-8, -1));//-0.125
//结论，pow对于开方，只接受整数
// var count = 5;
// start : for(var i=0;i<count;i++){
//     if(i === 4){
//         break start
//     }
//     console.log(i)
// }

//var arr = [1, '2', 3, null, '4', undefined];
// var arr = {
//     0: 1,
//     1:'2',
//     2: 3,
//     3: null,
//     4: '4',
//     5: undefined
// }
// for(var i in arr){
//     console.log(i);
// }
// 0
// 1
// 2
// 3
// 4
// 5
// var dog = {
//     name : '大黄',
//     age : 5,
//     gender : '雄性',
// }
// dog.color = 'black';
// dog.age = 6;
// Object.prototype.objCustom = function () {
//     return 'aaa';
// }
// for(var i in dog){
//     console.log(i, `:`,dog[i]);
// }
// name : 大黄
// age : 6
// gender : 雄性
// color : black
// objCustom : function () {
//     return 'aaa';
// }
// name
// age
// gender
// var arr = undefined
// for(var i in arr){
//     console.log(i);
// }

// Array.prototype.myfunction = function () {
//     return 'aaa';
// }
// var dog = [
//     {name:'小黄', age : 3},
//     {name:'小黑', age : 4},
//     {name:'小白', age : 5}
// ]
// for(var i in dog){
//     if(!dog.hasOwnProperty(i)){
//         continue;
//     }
//     console.log(dog[i].name)
// }
// console.log('这是一行空值测试~')

// var arr = [1, '2', null, 3, undefined, '4'];
// for(var i of arr){
//     console.log(i);
// }
// 1
// 2
// null
// 3
// undefined
// 4
// var obj = {
//     name : '小黄',
//     age : 4,
//     gender : 'black'
// };
// for(var j of Object.keys(obj)){
//     console.log(j);
// }
// name
// age
// gender
// var 1set = new Set();
// set.add("a").add("b").add("d").add("c");
// var map = new Map();
// map.set("a",1).set("b",2).set(999,3);
// for (let v of set) {
//     console.log(v);
// }
// console.log("--------------------");
// for(let [k,v] of map) {
//     console.log(k,v);
// }

// var array = ['a', 123, {a:'1', b:'2'}];
// array.name = '小黄';
// for(var i of array){
//     console.log(i);
// }
// a
// 123
// { a: '1', b: '2' }

// Math.clz32()
// 将参数转为32位无符号整数形式，然后返回这个32位值里面有多少个前导0
// console.log(Math.clz32(0)) //32 0的二进制全为0，所以有32个前导
// console.log(Math.clz32(1));//31
// console.log(Math.clz32(1000))//22
// console.log(Math.clz32(0b01000000000000000000000000000000));//1

//<<左运算符号
// console.log(Math.clz32(0));
// console.log(Math.clz32(1));
// console.log(Math.clz32(1 << 1));//30
// console.log(Math.clz32(1<<2));//29
// console.log(Math.clz32(1<<29));//2
// console.log(Math.clz32(2));//30
// console.log(Math.clz32(2 >> 1))//31

//对于小数，只考虑整数部分
// console.log(Math.clz32(3.2));//30
// console.log(Math.clz32(3.9));//30

//负数表示为0，无论任何负数
// console.log(Math.clz32(-1));//0
// console.log(Math.clz32(-8));//0


//Math.imul()
//返回两个数以32位带符号整数形式想乘的结果，返回的也是一个32位的带符号整数
// console.log(Math.imul(2, 4));//8
// console.log(Math.imul(-1, 8));//-8
// console.log(Math.imul(-2, -2));//4
//但是超过32位的部分就会溢出，但是会返回正确的地位数值
// console.log(Math.imul(0x7fffffff,0x7fffffff));//1
// 由于这两个二进制数的最低位都是1，因此结果最低位也是1,

// Math.fround()
// 但会一个数的32位单精度浮点数形式
// -2^24 至 2^24之间，开区间
// console.log(Math.fround(0));//0
// console.log(Math.fround(1));
// console.log(Math.fround(2 ** 24));//16777216
// console.log(Math.fround(2 ** 24 + 1));//16777216 精度丢失
// console.log(2 ** 24 + 1);//16777217
//Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数
//如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变
// console.log(Math.fround(1.125));//1.125
// console.log(Math.fround(7.25));//7.25
//精度丢失
// console.log(Math.fround(0.3))//0.30000001192092896
// console.log(Math.fround(0.7));//0.699999988079071
// console.log(Math.fround(1.0000000123));//1

//非数值的处理
// console.log(Math.fround(NaN));//NaN
// console.log(Math.fround(Infinity))//Infinity
// console.log(Math.fround('5'));//5
// console.log(Math.fround(true));//1
// console.log(Math.fround('0.2'));//0.20000000298023224
// console.log(Math.fround([]));//0
// console.log(Math.fround({}));//NaN

//代码模拟
// Math.fround = function (x) {
//     return new Float32Array([x])[0];
// }
// var a = new Float32Array([0.1])[0]
// console.log(a);

//Math.hypot() 返回所有参数的平方和平方根 勾股定理
// console.log(Math.hypot(3, 4));//5
// console.log(Math.hypot(3, 4, 5));//7.0710678118654755 接受多个参数
// console.log(Math.hypot());//0
// console.log(Math.hypot(3, 4, 'foo'));//NaN
// console.log(Math.hypot(3, 4, '5'));//7.0710678118654755 可以将非数值转为数值
// console.log(Math.hypot(-3));//3 相当于abs
// console.log(Math.hypot(Infinity));//Infinity

//对数方法
//(1)Math.expm1()
//返回ex - 1
// console.log(Math.expm1(-1));//-0.6321205588285577
// console.log(Math.expm1(0));//0
// console.log(Math.expm1(1));//1.718281828459045
//模拟
// Math.expm1 = function (x) {
//     return Math.exp(x) -1;
// }

//(1)Math.log1p()
// Math.log(1+x) 相当于In(1+x)
//返回自然对数1 + x的自然对数，如果x小于-1，返回NaN
// console.log(Math.log1p(1));//0.6931471805599453
// console.log(Math.log1p(9));//2.302585092994046
// console.log(Math.log1p(-1));//-Infinity
// console.log(Math.log1p(-2));//-NaN
//代码模拟
// Math.log1p = function (x) {
//     return Math.log(1 + x);
// }

//Math.log10()
//返回以10为底x的对象
// console.log(Math.log10(10));
// console.log(Math.LN10); // Math.LN10 = loge10 2.302585092994046
//部署
// Math.log10 -= function (x) {
//     return Math.log(10) / Math.LN10;
// }

//(4)Math.log2()
//返回以2为底的x的对数
// console.log(Math.log2(3));
// console.log(Math.log2(0));//-Infinity
//代码模拟
// Math.log2 = function (x) {
//     return Math.log(x) / Math.LN2;
// }

//双曲线函数方法


//8.指数运算符
//console.log(2 ** 3);//8
//不同于以往的左结合，指数运算符是右连接
//console.log(2 ** 3 ** 2);//512 等于(2 ** (3**2))
//与等号结合
// var a = 2;
// a **= 3;
// console.log(a);//8


//9.BigInt数据类型
//JS存在数值限制
//精度为53个二进制
//整数范围是2^53
// console.log(Math.pow(2,53));//9007199254740992
// console.log(Math.pow(2, 53) + 1);//9007199254740992
// console.log(Math.pow(2, 53) === Math.pow(2, 53)+1);//true
//BigInt(大整数) 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
