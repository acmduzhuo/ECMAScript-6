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


//RegExp.prototype.unicode
//表示是否设置了u修饰符
// const r1 = /hello/;
// const r2 = /hello/u;
// console.log(r1.unicode);//false
// console.log(r2.unicode);//true
//测试方法，遍历or其他
//const r = /heu/;
//console.log(r.unicode);//false 其他的判断方式


//5、y修饰符
//“黏连”修饰符
// var s = 'aaa_aa_a';
// var r1 = /a+/g;
// var r2 = /a+/y;
// console.log(r1.exec(s));//aaa
// console.log(r2.exec(s));//aaa
// console.log(r1.exec(s));//aa g只要剩余位置存在匹配就可以，所有输出aa
// console.log(r2.exec(s));//null 但是y是从剩余的第一个位置开始，严格规定

//改一下正则表达式，就能保证每次头部匹配
// var s = 'aaa_aa_a';
// var r = /a+_/y;
// console.log(r.exec(s));//aaa_
// console.log(r.exec(s));//aa_

//使用lastIndex属性，可以更好的说明y修饰符
//lastIndex指定每次搜索的位置，g修饰符从这个位置向后搜索，直到发现匹配为止
// const  REGEX = /a/g;
// REGEX.lastIndex = 2;
// const match = REGEX.exec('xaya');
// console.log(match)//a
// console.log(match.index);//3 在3号位置匹配成功
// console.log(REGEX.lastIndex);//4 下次匹配从4号位开始
// console.log(REGEX.exec('xaya'));//null

//y修饰符同样遵守，但是要求必须在lastIndex指定的位置发现匹配
// const REGEX = /a/y;
// REGEX.lastIndex = 2;
// console.log(REGEX.exec('xaya'));//null
// console.log(REGEX.lastIndex);//注意失败不会自动后移
// REGEX.lastIndex = 3
// const match = REGEX.exec('xaya');
// console.log(match.index);//3
// console.log(REGEX.lastIndex);//只有匹配成功才会后移

//由此可以推断，y修饰符隐含了^标志
//console.log(/b/y.exec('abc'));//null

//const REGEX = /a/gy;
//console.log('aaxa'.replace(REGEX, '-'));//--xa因为最后一个a不是在下一次匹配的头部

// console.log('a1a2a3'.match(/a\d/y));//a1只返回第一个匹配
// console.log('a1a2a3'.match(/a\d/gy));//a1 a2 a3
// console.log('a1ea2a3'.match(/a\d/gy));//[ 'a1' ]//与g修饰符联用，才能返回所有匹配。

// const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
// const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;
// function tokenize(TOKEN_REGEX, str) {
//     let result = [];
//     let match;
//     while (match = TOKEN_REGEX.exec(str)) {
//         result.push(match[1]);
//     }
//     return result;
// }
// console.log(tokenize(TOKEN_Y, '3x + 4'));// [ '3' ]
// console.log(tokenize(TOKEN_G, '3x + 4'));//[ '3', '+', '4' ]
//y修饰符确保了匹配之间不会有漏掉的字符。
//旦出现非法字符y就会终止


//6、RegExp.prototype.flags
//表示是否设置了y修饰符
// var r = /hello\d/y;
// console.log(r.sticky);//非字符串遍历
// var s = /xyz\d/;
// console.log(s.sticky);//false


//7、RegExp.prototype.flags
//console.log(/abc/ig.source);//abc//返回正则表达式的正文
//console.log(/abc/ig.flags);//gi//返回正则表达式的修饰符


//8、s修饰符：dotAll模式
//在正则表达式中，.是一个特殊字符，可以代表任何单个字符
//除四个字节的UTF-16字符，可以用u修饰符来解决
//一个是行终结符
// U+000A 换行符（\n）
// U+000D 回车符（\r）
// U+2028 行分隔符（line separator）
// U+2029 段分隔符（paragraph separator）
//console.log(/foo.bar/.test('foo\nbar'))//false .与换行符不匹配

//console.log(/foo[^]bar/.test('foo\nbar'));//true 匹配任意单个字符

//s修饰符
//console.log(/foo.bar/s.test('foo\nbar'))//true 可以任意匹配单个字符

//dotAll属性
// const re = /foo.bar/s;
// console.log(re.test('foo\nbar'));//true
// console.log(re.dotAll);//true 判断正则表达式是否处在dotAll模式
// console.log(re.flags);//s修饰符


//9、后行断言
//JS中只支持先行断言和先行否定断言
//ES2018引入后行断言和后行否定断言
// console.log(/\d+(?=%)/.exec('100% of US')[0]);//在%之前匹配
// console.log(/\d+(?!%)/.exec('that’s all 44 of them')[0])//44 不在%之前匹配

//后行断言
//console.log(/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')[0]);//100 在$之后匹配
//console.log(/(?<!\$)\d+/.exec('it’s is worth about €90')[0]);//90 只匹配不在$后

//利用后行断言进行字符串替换
//只有紧挨美元后面的foo才会被替换
// const Re = /(?<=\$)foo/g;
// console.log('$foo %foo foo'.replace(Re, 'bar'));//$bar %foo foo

//console.log(/(?<=(\d+)(\d+))$/.exec('1053'));//[ '', '1', '053']
//先匹配的是/$/，结果是啥都没有，注意是空字符串，并非null
//其次从右向左匹配，所以第一个括号是单个字符，第二个括号是贪婪匹配
// console.log(/$/.exec('1053'));//[ '', index: 4, input: '1053', groups: undefined ]
// console.log(/^(\d+)(\d+)$/.exec('1053'));//[ '1053', '105', '3']
//顺序匹配，先从/^$/开始，然后第一个括号贪婪匹配，第二个括号单个匹配

// console.log(/(?<=(o)d\1)r/.exec('hodor'));//null 上面代码中，如果后行断言的反斜杠引用（\1）放在括号的后面，就不会得到匹配结果.
// console.log(/(?<=\1d(o))r/.exec('hodor'));//[ 'r', 'o'] 必须放在前面才可以。因为后行断言是先从左到右扫描，发现匹配以后再回过头，从右到左完成反斜杠引用。
// console.log(/r/.exec('hodor'))//[ 'r' ]


//10、Unicode属性类
// const re = /\p{Script=Greek}/u;//指定希腊文字母
// console.log(re.test('π'));//true
// 指定\p{UnicodePropertyName=UnicodePropertyValue}

// const re = /^\p{Decimal_Number}+$/u;
// console.log(re.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼'));//所有十进制字符

//匹配罗马数字
// const re = /^\p{Number}+$/u;
// console.log(re.test('²³¹¼½¾'));
// console.log(re.test('㉛㉜㉝')); // true
// console.log(re.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ'));

//其他例子
// const re = /\p{White_Space}/u;
// console.log(re.test('  oo  '));
// const re = /[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]/u;//匹配各种文字的字母，相当于\w
// console.log(re.test('acz'));


//11、具名组匹配
