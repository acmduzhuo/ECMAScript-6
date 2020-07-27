//字符串Unicode的表示法
// console.log("\u0061");//a
// console.log("\uD842\uDFB7");//𠮷
// //双字节表示
// console.log("\u20BB7");//₻7
// //将码点放入大括号，就可以正确解读该字符
// console.log("\u{20BB7}");//𠮷
// console.log("\u{41}\u{42}\u{43}");//ABC
// let hello = 123;
// console.log(hell\u{6F});//123
// console.log('\u{1F680}');
// console.log('\uD83D\uDE80');//🚀
// console.log('\u{1F680}' === '\uD83D\uDE80');//true

//字符串的遍历接口
// for(let codePoint of 'foo'){
//     console.log(codePoint);//打印f o o
// }
// let text = String.fromCodePoint(0x20BB7);
//
// for(let i=0;i<text.length;i++){
//     console.log(text[i]);
// }
// for(let i of text){
//     console.log(i);//𠮷
// }//这个遍历器最大的优点是可以识别大于0xFFFF的码点

//U+2028 U+2029
// console.log('中' === '\u4e2d');//true
// console.log("U+005C");
// const json = '"\u2028"';//行分隔符
// console.log(JSON.parse(json));
// const PS = eval("'\u2029'");
// console.log(PS);//段分隔符

//JSON.stringify()的改造
// console.log(JSON.stringify('\u{D834}'));//JSON.stringify()的问题在于，它可能返回0xD800到0xDFFF之间的单个码点
// console.log(JSON.stringify('\uDF06\uD834'));

//模板字符串
// $('#result').append(
//     'There are <b>' + basket.count + '</b> ' +
//     'items in your basket, ' +
//     '<em>' + basket.onSale +
//     '</em> are on sale!'
// );
// console.log(`In JavaScript '\n' is a line-feed.`);//普通字符串
// console.log(`In JavaScript this is
//  not legal.`);//多行字符串
// console.log(`string text line 1
// string text line 2`);
// let name = "Bob", time = "today";
// console.log(`Hello ${name}, how are you ${time}`);
//在模板字符串中需要使用反引号，则前面要用反斜杠转义。
// let greeting = `\`Yo\` World!`;
// console.log(greeting);//`Yo` World!
// $('#list').html(`
// <ul>
//   <li>first</li>
//   <li>second</li>
// </ul>
// `);//如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
// $('#list').html(`
// <ul>
//   <li>first</li>
//   <li>second</li>
// </ul>
// `.trim());//比如<ul>标签前面会有一个换行。如果你不想要这个换行，可以使用trim方法消除它。
// function authorize(user, action) {
//     if (!user.hasPrivilege(action)) {
//         throw new Error(
//             // 传统写法为
//             // 'User '
//             // + user.name
//             // + ' is not authorized to do '
//             // + action
//             // + '.'
//             `User ${user.name} is not authorized to do ${action}.`);
//     }
// }//模板字符串中嵌入变量，需要将变量名写在${}之中。
// let x = 1;
// let y = 2;
// console.log(`${x} + ${y} = ${x+y}`);//1 + 2 = 3
// console.log(`${x} + ${y * 2} = ${x+y*2}`);//1 + 4 = 5
// let obj = {x:1, y:2};
// console.log(`${obj.x + obj.y}`);//3
//实现变量、对象的计算
//调用函数
// function fn() {
//     return "Hello World!";
// }
// console.log(`foo ${fn()} bar`);//foo Hello World! bar
// //调用函数
//let msg = `Hello, ${place}`;//没有声明变量，报错
//console.log(`Hello ${'World'}`);//Hello World，其中World为字符串
//嵌套模板字符串
// const tmpl = addrs => `
//   <table>
//   ${addrs.map(addr => `
//     <tr><td>${addr.first}</td></tr>
//     <tr><td>${addr.last}</td></tr>
//   `).join('')}
//   </table>
// `;
// const data = [
//     { first: '<Jane>', last: 'Bond' },
//     { first: 'Lars', last: '<Croft>' },
// ];
// console.log(tmpl(data));
//在需要时执行，可以写成函数
// let func = (name) => `Hello, ${name}!`;
// console.log(func(`Tom`));

//模板编译
// let template = `
// <ul>
//   <% for(let i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `;
// echo('<ul>');
// for(let i=0; i < data.supplies.length; i++) {
//     echo('<li>');
//     echo(data.supplies[i]);
//     echo('</li>');
// };
// echo('</ul>');

//标签模板
//alert(`hello`);
//===
//alert('[hello]');
//它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能
// let a = 5;
// let b = 10;
//
// function tag(s, v1, v2) {
//     console.log(s[0]);
//     console.log(s[1]);
//     console.log(s[2]);
//     console.log(v1);
//     console.log(v2);
//
//     return "OK";
// }
// console.log(tag`Hello ${ a + b } world ${ a * b}`);
//实际调用tag(['Hello ', ' world ', ''], 15, 50)
//Hello
//  world
//
// 15
// 50
// OK
// let total = 30;
// let msg = passthru`The total is ${total} (${total*1.05} with tax)`;
// function passthru(literals) {
//     let result = '';
//     let i = 0;
//     while (i < literals.length) {
//         console.log('li = '+literals[i]);
//         result += literals[i++];
//         if (i < arguments.length) {
//             result += arguments[i];
//             console.log('argu = '+arguments[i]);
//         }
//     }
//     return result;
// }
// console.log(msg); // "The total is 30 (31.5 with tax)"
//li = The total is
// argu = 30
// li =  (
// argu = 31.5
// li =  with tax)
// The total is 30 (31.5 with tax)

// let sender = '<script>alert("abc")</script>'; // 恶意代码
// let message =
//     SaferHTML`<p>${sender} has sent you a message.</p>`;
//
// function SaferHTML(templateData) {
//     let s = templateData[0];
//     for (let i = 1; i < arguments.length; i++) {
//         let arg = String(arguments[i]);
//
//         // Escape special characters in the substitution.
//         s += arg.replace(/&/g, "&amp;")
//             .replace(/</g, "&lt;")
//             .replace(/>/g, "&gt;");
//
//         // Don't escape special characters in the template.
//         s += templateData[i];
//     }
//     return s;
// }
// console.log(message);//转义恶意代码
//<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
// siteName = `字节跳动`
// visitorNumber = `川建国`
// i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// //多语言转换

tag`First line\nSecond line`

function tag(strings) {
    console.log(strings.raw[0]);
    // strings.raw[0] 为 "First line\\nSecond line"
    // 打印输出 "First line\nSecond line"
}