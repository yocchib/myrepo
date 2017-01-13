/*============================================================================
 * 第７章：正規表現
 *
 *===========================================================================*/
(function() {
  /* JavaScript で正規表現が利用できるメソッドは
   *  regexp.exec,  regexp.test
   *  string.match, string.replace, string.search,  string.split
   */

  // 正規表現のメモ  参考URL: http://jsfiddle.net/walfo/bj8xwm8j/
  // -------------
  // 

  // ### URLを解析
  // @reference [JavaScript The Good Parts (P90)]
  var parse_url = /^(?:([A-za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  var url = 'http://www.ora.com:80/goodparts?q#fragment';
  var res = parse_url.exec(url);
  console.log(res);

  // ### 数値を解析
  var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
  var test = function(num) {
      console.log( 'test(' + num + ') :' + parse_number.test(num) );
  };
  test('1');
  test('number');
  test('98.6');
  test('132.21.86.100');
  test('132.45E-67');
  test('132.45D-67');

// ### アスキー文字全てにマッチする
// @reference [JavaScript The Good Parts (P)]
var ascii = /[!-\/:-@\[-`{-~}]/g;
console.log( ascii.exec('!@') );


// ### 正規表現因子でのエスケープ文字
// @reference [JavaScript The Good Parts (P)]
// \ / [ ] ( ) { } ? + * | . ^ $
// これらの特殊文字は\を前に付けることで、単なる文字とみなされ
// それぞれの文字そのものとマッチさせることができるようになる


// ### 文字クラスでのエスケープ文字
// @reference [JavaScript The Good Parts (P)]
// 文字クラスにおけるエスケープのルールは正規表現因子のルールとは
// 少しことなる。[\b]はバックスペース文字を表す。
// 以下の特殊文字は、クラスの中ではエスケープしなければならない。
// - / [ \ ] ^



})();


// 6.X :
// (function() { })();
