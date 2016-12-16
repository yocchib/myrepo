/*============================================================================
 * 第４章：関数
 *
 *===========================================================================*/
(function() {
  // 関数リテラル
  var add = function(a, b) {
    return a + b;
  };
 /*--------------------------------------------------------------
  * 4.3 : 関数呼び出しパターンによって this値 は異なる
  *		①メソッド呼び出し ②関数呼び出し ③コンストラクタ呼び出し ④apply
  *--------------------------------------------------------------*/
  // ① メソッド呼び出し
  // 関数がオブジェクトのプロパティとして格納されている場合メソッド
  var myObject = {
    value: 0,
    increment: function(inc) {  // thisで自身にアクセスしているメソッドはパブリックメソッドと称する
      this.value += typeof inc === 'number' ? inc : 1;
    }
  };
  myObject.increment();
  console.log( myObject.value);
  myObject.increment(2);
  console.log( myObject.value);

  // ②関数呼び出し
  var sum = add(3,4);
  console.log( sum );

  // myObject に doubleメソッドを追加する
  // 処理の一部を内部関数に担当させるが thisがグローバル値になるのを回避するthat変数を用意
  myObject.double = function() {
    var that = this; // 値の退避
    var helper = function(){
      that.value = add(that.value, that.value);
    };
    helper();      
  };
  myObject.double();
  console.log( myObject.value);

  // ③コンストラクタ呼び出し
  // Quoという名のコンストラクタ関数を生成する
  //  (コンストラクタ関数は大文字のへんすうに格納されるのが慣例)
  // これは status プロパティをもつオブジェクトを生成する
  var Quo = function(string) {
    this.status = string;
  };

  // get_status というパブリックメソッドを Quoの全インスタンスで利用可能にする
  Quo.prototype.get_status = function() {
    return this.status ;
  };
  var myQuo = new Quo("confused");  // new演算子によるコンストラクタ呼び出し
  console.log( myQuo.get_status());

  // ④apply 呼び出し
  //  第１引数に thisにセットしたい値、第２引数がパラメータ配列
  var array = [4,5];
  var sum = add.apply(null, array);
  console.log( "sum: " + sum );

  // statusObject は Quo 同様に status プロパティをもつ
  var statusObject = {
    status: 'A-OK'
  };
  var st = Quo.prototype.get_status.apply(statusObject);
  console.log( "status: " + st );

})();

// 4.4 : 引数
(function() {
  var sum = function(){

    var i, sum = 0;
    for(i = 0; i < arguments.length ; i++) {
      sum += arguments[i];
    }
    return sum;
  };

  console.log("sum() :" + sum(2,3,6,7));

})();

// 4.6 : 例外
(function() {
  var add = function(a,b) {
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
           name: 'TypeError',
           message: 'add needs numbers'
        };
      }
      return a + b ;
  }
  var try_it = function() {
      try {
        add("seven");
      } catch (e) {
        console.log(e.name + ": " + e.message);
      }
  };

  try_it();

})();

//  (function() {})();
//
