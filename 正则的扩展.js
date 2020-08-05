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
//（1）点字符
//代表除换行符以外的任意单个字符
//对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u
// var s = '𠮷';
// console.log(/^.$/.test(s));//false 无法识别.
// console.log(/^.$/u.test(s));//true 可以识别.
//// 如果不添加u修饰符，正则表达式就会认为字符串为两个字符

//（2）Unicode字符表示法
// console.log(/\u{61}/.test('a'));//false
// console.log(/\u{61}/u.test('a'));//true 如果不加u修饰符，无法识别\u{61}，只会认为这是匹配的连续61个u
// console.log(/\u{20BB7}/u.test('𠮷'));//true

//（3）量词
//使用u修饰符之后，所有量词都会正确识别码大于0xFFFF的Unicode字符
// console.log(/a{2}/.test('aa'));//true
// console.log(/a{2}/u.test('aa'));//true
// console.log(/𠮷{2}/.test('𠮷𠮷'));//false
// console.log(/𠮷{2}/u.test('𠮷𠮷'));//true

//（4）预定义模式
//console.log(/^\S$/.test('𠮷'));//false
//console.log(/^\S$/u.test('𠮷'));//true
//上面代码的\S是预定义模式，匹配所有非空白字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符
// function codePointLength(text) {
//     var result = text.match(/[\s\S]/gu);//这样一正一反下来，就表示所有的字符，完全的，一字不漏的
//     return result ? result.length : 0;
// }
// var s = '𠮷𠮷';
// console.log(s.length);
// console.log(codePointLength(s));//2 ['𠮷','𠮷']

//（5）i修饰符
// /i忽略大小写
// console.log('\u212A');//K
// console.log(`\u004B`);//K 非规范修饰符
// console.log(/[a-z]/i.test('\u212A'));//false 不加u修饰符，就无法识别非正规的K
// console.log(/[a-z]/iu.test('\u212A'));//true

//（6）转义
// console.log(/\,/);// /\,/ 不加转义无意义
// console.log(/\,/u);//加上报错，那个加他干啥？？