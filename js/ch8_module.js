/*==============================================================
 * 書籍 第６版 第８章 関数
 *==============================================================
 * 使い方 
 * var obj = require('./ch8_module.js') ;
 * obj.add() ;
 * obj.set1(3).set2(4).add()  // 7 // メソッドチェーン利用例
 * obj.result
 *
 * obj.o.m();
 * obj.max(1,3,5,7,9,2,4,6);  // 9
 *
 *=============================================================
*/

// オブジェクトリテラル 頁180
var obj = {
  operand1 : 1, 
  operand2 : 1, 
 
  add: function() {  // 呼出コンテキスト(this) の例
    this.result = this.operand1 + this.operand2 ;
  },

  set1: function(x) { this.operand1 = x; return this },  // メソッドチェーン利用例
  set2: function(y) { this.operand2 = y; return this }
};
var obj = {};
var n = 17;
obj.bin = n.toString(2);

/* 頁 181
 *  o.m();
 */
var o = {
  m: function() {
	var self = this;
	console.log(this === o);  // true 
	f();

	function f() {  // 入れ子型関数 f は 呼び出し元の thisを参照しない
		console.log(this === o);  // false (thisは グローバル or undef
		console.log(self === o);  // true
		
	}
  }
};
obj.o = o;

/* 頁 184 : 可変長の引数リスト( arguments )
 */
var func = function f (x, y, z) {
  if (arguments.length != 3) {
	throw new Error("function f called with " + arguments.length + 
		"arguments, but it expects 3 arguments.");
  }
}
/*  頁 185 : 可変長引数関数
 */
var funcMax = function max ( /* 任意の引数 */ ) {
  var max = Number.NEGATIVE_INFINITY ;

  // 全ての引数を調べて最大値を見つける 
  for(var i= 0; i < arguments.length ; i++) {
     if ( arguments[i] > max ) max = arguments[i] ;
  }
  return max ;
}

obj.f   = func ;
obj.max = funcMax ;

function square(x) { return x*x; }
obj.s = square ;
obj.s_ans = obj.s(4);

/*  頁 191 : 自分専用の関数プロパティを定義
 * 階乗を計算し、結果を関数自身のプロパティにキャッシュする
 */
function factorial(n) {

  if ( isFinite(n) && n>0 && n==Math.round(n)) { // 有限な正の整数のみ
	if (n in factorial)
		factorial[n] ;
	else
		factorial[n] = n * factorial(n-1);

  } else {
	return NaN ;
  }
}
factorial[1] = 1;
obj.fact = factorial ;

module.exports = obj ;
