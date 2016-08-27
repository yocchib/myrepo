/*==============================================================
 * 書籍 第６版 第８章 関数
 *==============================================================
 * 使い方 
 * var obj = require('./ch8_module.js') ;
 * obj.add() ;
 * obj.set1(3).set2(4).add()  // 7 // メソッドチェーン利用例
 * obj.result
 *
 *=============================================================
*/

// オブジェクトリテラル
var calculator = {
  operand1 : 1, 
  operand2 : 1, 
 
  add: function() {
    this.result = this.operand1 + this.operand2 ;
  },

  set1: function(x) { this.operand1 = x; return this },  // メソッドチェーン利用例
  set2: function(y) { this.operand2 = y; return this }
};
var obj = {};
var n = 17;
obj.bin = n.toString(2);

module.exports = calculator ;
