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

// 4.7 : 変数型の拡張
(function() {
  // Functionプロトタイプにmethodを追加することで
  // prototypeプロパティを直接指定せずにメソッドを追加できるため
  // 可読性がよい
  Function.prototype.method = function(name, func) {
     if (!this.prototype[name] ) {
       this.prototype[name] = func;
       return this;
     }
  };
  // Math.ceil(数字)  数字を切り上げして整数にします
  // Math.floor(数字)小数以下を切り捨てして整数にします
  Number.method('integer', function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this);
  });
  console.log((-10/3));
  console.log((-10/3).integer());

  String.method('trim', function(){
    return this.replace(/^\s+|\s+$/g, '');
  });
  console.log('"' + "  Neat  ".trim() + '"');

})();

// 4.8 : 再帰
(function() {
  // ハノイの塔
  var hanoi = function(disc, src, aux, dst) {
    if (disc > 0) {
      hanoi(disc-1, src, dst, aux);
      console.log('Move disc ' + disc + ' from '+ src + ' to ' + dst );
      hanoi(disc-1, aux, src, dst);
    }
  };
  hanoi(3, 'Src' , 'Aux', 'Dst');

  // 末尾再帰を行う　階乗関数例 
  // (javascript は現在末尾再帰最適化を提供していないためリターンスタックを使い切る可能性あり)
  var factorial = function factorial(i, a) {
    a = a || 1;
    if ( i< 2) {
      return a;
    }
    return factorial(i-1, a*i);
  };
  console.log("fact():" + factorial(4));
})();

// 4.9 : スコープ
// JavaScript は ブロックスコープを持たない
// JavaScript は 関数スコープは持っている
//
// (function() { })();

// 4.10 : クロージャ
// ある関数内で別の関数が定義されている場合、
// 内部の関数は外部の関数で定義された変数やパラメータにアクセスできる
// (但し this, arguments を除く)
(function() { 

  // valueプロパティを外部から保護したい場合の 例
  // オブジェクトリテラルを使って初期化する代わりに、
  // オブジェクトリテラルを戻り値とする関数で初期化する
  var myObject = (function() {
    var value= 0;

    return {
      increment: function (inc) {
          value += typeof inc === 'number'? inc : 1;
      },
      getValue: function () {
        return value;
      }
    };
  })();
  myObject.increment('a');
  myObject.increment(3);
  console.log('クロージャテスト :' + myObject.getValue());


  // quo関数はコンストラクタではない
  var quo = function( status) {
    return {
      get_status : function() {
        return status ;
      },
      set_status : function(str) {
        status = str  ;
      }
    };

  };
  var myQuo = quo("original");
  myQuo.set_status("change orig");
  console.log(myQuo.get_status());


})();

// 4.X :
// (function() { })();