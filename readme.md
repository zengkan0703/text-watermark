## JavaScript 字符串中水印的编码和解码

看到 [[翻译]小心你复制的内容：使用零宽字符将用户名不可见的插入文本中](https://www.codesky.me/archives/be-careful-what-you-copy-invisibly-inserting-usernames-into-text-with-zero-width-characters.wind) 这篇文章觉得很奇妙，就按照这个思路实现了一下一样的功能。
### 测试
> npm run test

### 功能

#### removeZeroWidthChar(string)
    去除字符串中的零宽字符

#### encodeMark(string, mark)
    给字符串添加特定文字水印
    编码过程：水印字符串 ==> UTF-16 编码单元 ==> 二进制 ==> 零宽字符字符串

#### decodeMark(string)
    解码 encodeMark 中添加的水印

### 其他

    零宽字符是一种不可打印的 Unicode 字符，通常不会被显示出来