"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeZeroWidthChar = removeZeroWidthChar;
exports.encodeMark = encodeMark;
exports.decodeMark = decodeMark;
var zeroWidthChar = ["\u200B", //零宽空格
"\u200C", //零宽非连接符
"\u200D", //零宽连接符
"\uFEFF" //零宽度非换行空格
];
var zeroWidthCharReg = new RegExp("[".concat(zeroWidthChar.join(''), "]"), 'g'); //清空字符串中的零宽字符

function removeZeroWidthChar(string) {
  return string.replace(zeroWidthCharReg, '');
} //添加水印


function encodeMark(string, watermark) {
  string = removeZeroWidthChar(string);

  if (!string.length) {
    return {
      string: string,
      success: false,
      error: '原字符串不能为空'
    };
  }

  watermark = removeZeroWidthChar(watermark);
  var result = '';

  for (var i = 0, length = watermark.length; i < length; i++) {
    var utf16 = watermark.charCodeAt(i);
    var binaryString = utf16.toString(2);
    var joinChar = i === length - 1 ? '' : zeroWidthChar[2];
    result += binaryString.split('').map(function (d) {
      return zeroWidthChar[Number(d)];
    }).join('') + joinChar;
  }

  return {
    string: string.slice(0, 1) + result + string.slice(1),
    success: true
  };
} //解码水印


function decodeMark(string) {
  if (!string.length) {
    return {
      success: false,
      error: '原字符串不能为空'
    };
  }

  var charArr = string.match(zeroWidthCharReg);

  if (!charArr) {
    return {
      mark: '',
      success: true
    };
  }

  var binaryArr = charArr.join('').split(zeroWidthChar[2]);
  var mark = binaryArr.map(function (binary) {
    var binaryString = binary.split('').map(function (b) {
      return zeroWidthChar.indexOf(b);
    }).join('');
    var utf16 = parseInt(binaryString, 2);
    return String.fromCharCode(utf16);
  }).join('');
  return {
    mark: mark,
    success: true
  };
}