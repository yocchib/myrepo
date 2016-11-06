/*=================================*
 * ２点間の距離を求める
 * 使用例
 * var p = new Point(1,1);
 * var dist = p.r();
 * console.log( dist );
 *=================================*/

/*  Pointオブジェクトを生成して初期化するための
 *  コンストラクタ関数を定義する
 */
function Point(x,y) {   // コンストラクタは大文字から始めるのが慣習
  this.x = x;           // thisで初期化中の新しいオブジェクトを参照可能
  this.y = y;           // 関数の引数をオブジェクトのプロパティとして保存
}                       // return は不要

Point.prototype.r = function() {
  var a = this.x * this.x ;
  var b = this.y * this.y ;
  return Math.sqrt(a + b);
}

