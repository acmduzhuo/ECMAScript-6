//1、String.fromCodePoint
// console.log(String.fromCharCode(0x20BB7));//ஷ
// console.log(String.fromCharCode(0x0BB7));//ஷ
//大于0xFFFF的码点，码点溢出，最高位2被舍弃

// console.log(String.fromCodePoint(0x20BB7));//𠮷
// console.log(String.fromCodePoint(0x78, 0x1f680, 0x79));//x🚀y
// console.log('x\uD83D\uDE80y');//x🚀y
//可以识别大于0xFFF的字符，返回字符串


//2、String.raw()
//转义斜杠，在斜杠前再加一个斜杠
// console.log(String.raw`Hi\n${2+3}!`);//实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
// console.log(`Hi\n${2+3}!`);
// //Hi
// //5!
// console.log(String.raw`Hi\u000A!`);// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
// console.log(String.raw`Hi\\n`);//实际返回 "Hi\\\\n"，显示Hi\\n，即每个斜杠都会进行一次转义

//String.raw()函数实现
//// `foo${1 + 2}bar`
// String.raw = function (strings, ...values) {
//     let output = '';
//     let index;
//     //console.log(values);//3
//     console.log("len = "+values.length);
//     for (index = 0; index < values.length; index++) {
//         //onsole.log(strings.raw[index]);//foo
//         output += strings.raw[index] + values[index];
//     }
//
//     output += strings.raw[index];//bar
//     return output;
// };
// console.log(String.raw({ raw: ['foo', 'bar'] }, 1 + 2) );//foo3bar


//3、codePointAt()
//JS内部，字符以UTF-16的格式储存，每个字符串为2个字节，对于需要4个字符串储存的字符，JS会认为是两个字符
// var s = "𠮷";//码点0x20BB7 UTF-16编码0xD842 0xDFB7，十进制55362 57271
// console.log(s.length);//2
// console.log(s.charAt());//�
// console.log(s.charAt(0));//�
// console.log(s.charAt(1));//�
// console.log(s.charCodeAt(0));//55362
// console.log(s.charCodeAt(1));//57271

//codePointAt()方法处理4个字节储存的字符
// let s = '𠮷a';
// console.log(s.charCodeAt(0));//55362
// console.log(s.codePointAt(0));//134071识别到了𠮷
// console.log(s.charCodeAt(1));//57271
// console.log(s.codePointAt(1));//57271识别到了𠮷中后两个字节，与charCodeAt相似
// console.log(s.charCodeAt(2));//97
// console.log(s.codePointAt(2));//97识别到了字符a，与charCodeAt相似
// console.log(s.codePointAt(0).toString(16));//对于 𠮷 16进制码点20bb7

//由于以上对于字符串 𠮷a 识别中，字符a的序号不正确，可以采用以下方法
// let s = '𠮷a';
// for(let ch of s){
//     console.log(ch.codePointAt(0).toString(16));
//     //20bb7
//     // 61
// }

// function is32Bit(c) {
//     return c.codePointAt(0) > 0xFFFF;
// }//测试一个字符是由两个字节还是四个字节组成
// console.log(is32Bit("𠮷"));//true
// console.log(is32Bit("a"));//false


//实例方法：normalize()
//JS中原字符串码点与组成子字符串之和并不相等
// console.log('\u01D1'==='\u004F\u030C' );//false
// console.log('\u01D1');//Ǒ
// console.log('\u004F\u030C');//Ǒ
// console.log('\u01D1'.length);//1
// console.log('\u004F\u030C'.length );//2
// console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize());//true
// console.log(`\u004F\u030C`.normalize('NFC').length);//1 标准化合成，返回多个字符串的合成字符
// console.log(`\u004F\u030C`.normalize('NFC'));//Ǒ \u01D1
// console.log('\u01D1'.normalize('NFD').length);//2 标准化分解，返回合成字符分解的多个简单字符
// console.log('\u01D1'.normalize('NFD'));//Ǒ
//NFKC 语义上的合成
//NFKD 语义上的分解
//缺点：无法识别三个及三个以上字符的合成


//实例方法：includes(), startsWith(), endsWith()
// let s = 'Hello, world!';
// console.log(s.startsWith('Hello'));//true 字符串是否在原字符串头部
// console.log(s.startsWith('He'));
// console.log(s.startsWith('e'));//false
// console.log(s.startsWith('Hello', 0));//支持查找开始的序号
// console.log(s.startsWith('Hello', 1));//false
// console.log(s.endsWith('!'));//true 参数字符串是否在原字符串尾部
// console.log(s.endsWith('Hello', 5));//true 注意是从字符串后的序号开始
// console.log(s.includes('o'));//参数字符串时候在原字符串中
// console.log(s.includes('Hello', 0));//与startsWith相似


//实例方法repeat()
// console.log('s'.repeat(3));//sss 重复三次
// console.log('o'.repeat(0));//""
// console.log('na'.repeat(2.9));//nanana
// console.log('na'.repeat(2.1));//四舍五入nana
// console.log('na'.repeat(Infinity));//无穷报错
//  console.log('na'.repeat(-1));//负数报错
// console.log('na'.repeat(-0.9));//取整为0
// console.log('na'.repeat(NaN));//视为0
// console.log('na'.repeat("2"));//进行字符串处理


//实例方法：padStart()，padEnd()
// console.log('x'.padStart(5, "ad"));//adadx 头部进行补全，ad作为补全字符，x作为原字符
// console.log('abcdefg'.padStart(5, "a"));//abcdefg
// console.log('x'.padStart(4, 'ab'));//abax
// console.log('x'.padStart(3,"abcdef"));//abx
// console.log('x'.padEnd(5,'ab'));//xabab尾部补全
// console.log('xxx'.padStart(2, 'ab'));//xxx 返回原字符串
// console.log('abc'.padStart(10));//       abc，空格补全

//常见用途
//补全指定位数
//console.log('1'.padStart(10,'0'));//0000000001
//提示字符串
//console.log('12'.padStart(10,'YYYY-MM-DD'));//YYYY-MM-12


//实例方法：trimStart()，trimEnd()
const s = '  a bc  ';
console.log(s.trim());//abc 去除空格
console.log(s.trimStart());//"abc  "去除头部空格
console.log(s.trimLeft());//"abc  "去除头部空格
console.log(s.trimEnd());//"  abc"去除尾部空格
console.log(s.trimRight());//"  abc"去除尾部空格
console.log(s.trim('a'));//abc 只能用于去除空格，传参无用但不报错
const x = '  a bc  ';
console.log(s.trim());//a bc


//实例方法：matchAll()正则表达式