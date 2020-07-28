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
// console.log(String.raw`Hi\u000A!`);// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
// console.log(String.raw`Hi\\n`);//实际返回 "Hi\\\\n"，显示Hi\\n，即每个斜杠都会进行一次转义

//String.raw()函数实现
String.raw = function (strings, ...values) {
    let output = '';
    let index;
    for (index = 0; index < values.length; index++) {
        output += strings.raw[index] + values[index];
    }

    output += strings.raw[index]
    return output;
};
console.log(String.raw({ raw: ['foo', 'bar'] }, 1 + 2) );