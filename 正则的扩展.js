//RegExp构造函数
//1、参数是字符串，第二个参数表示正则表达式的修饰符
//var regex = new RegExp('xyz', 'i');
// var regex = /xyz/i;//等价于
// console.log(regex);

//2、参数是一个正则表达式，返回原有正则表达式的拷贝
//var regex = new RegExp(/xyz/i);///xyz/i
// var regex = /xyz/i;///xyz/i
// console.log(regex);
//ES5此时不允许第二个参数添加修饰符
//但是webstorm不会报错
// var regex = new RegExp(/xyz/, 'i');
// console.log(regex);///xyz/i
//ES6
// var regex = new RegExp(/abc/ig, 'i').flags;
// console.log(regex);//i
//返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。


//2、字符串的正则方法
// var str="6 life is cool 562";
// var s = str.match(/\d+/g);
// console.log(s);
// console.log(str.replace('6', '2'));
// console.log(str.search('2'));//17
// console.log(str.split(" "));


//3、u修饰符
//ES6会将其识别为一个字符
// console.log(/^\uD83D/u.test(`\uD83D\uDC2A`));//false 识别为一个字符
// console.log(/^\uD83D/.test(`\uD83D\uDC2A`));//true 识别为两个字符
//1、点字符
//代表除换行符以外的任意单个字符
//对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u
// var s = '𠮷';
// console.log(/^.$/.test(s));//false 无法识别.
// console.log(/^.$/u.test(s));//true 可以识别.
//// 如果不添加u修饰符，正则表达式就会认为字符串为两个字符

//2、Unicode字符表示法

