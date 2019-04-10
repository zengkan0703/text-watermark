const TextWartermark = require('./index');
const { encodeMark, decodeMark, removeZeroWidthChar } = TextWartermark;

describe('字符串水印', () => {
  test('移除零宽字符', () => {
    const string = 'a\u200bb\u200c';
    expect(string).not.toBe('ab');
    expect(removeZeroWidthChar(string)).toBe('ab');
  })
  test('编码和解码水印', () => {
    const withMarkString = encodeMark('机密文本', 'zengkan').string;
    const { mark } = decodeMark(withMarkString);
    expect(mark).toBe('zengkan')
  })
})
