/*===================================================
 * 第４回：無名関数でコールバック関数を実現
 *  　　　 関数は組み合わせて利用できる  （関数合成）
 *===================================================*/
var square = { width : 100, height : 50 };
function areaCall(square, f) {
  var area = square.width * square.height
  f(area);
}
areaCall(square, function(area) {console.log("area=" + area)} );

/* 52頁：非同期処理の例 */
console.log("start\n");
setTimeout( function() { console.log("OK"); }, 1000 );
console.log("Here\n");

/* 53頁：コールバック関数を使った汎用化  */
(function() {
  var arr = [1,5,4,7];
  function _map (f, a) {
    var r = [];
    for(var i = 0 ; i < a.length ; i++) {
      r[i] = f(a[i]);
    }
    return r;
  }
  var res = _map( function(x) { return x + 3; },  arr );
  console.log( "res=" + res );
})();

/* 53頁：(上記例)をカリー化した
 *   カリー化された関数を使えば、直前にならないと決まらない値以外を直前に設定できる
 *   カリー化は、複数の引数をとる関数が前提となる。
 *   そうした関数に最初の引数を渡し、残りの引数を取る関数を戻り値で受け取る
 * 
 *   例えば function _add(x, y) { return x + y; } をカリー化すると
 *   function add(x) { return function(y) {return x +y ;} } となる
 *   つまり、 _add(x,y) と add(x)(y) は同じ結果を返す
 * 
 *   カリー化は引数を１つにするが、単に引数の数を減らすことを【部分適用】という
 */
(function() {
  var arr = [1,5,4,7];
  function _map (f) {
    return function(a) {
      var r = [];
      for(var i = 0 ; i < a.length ; i++) {
        r[i] = f(a[i]);
      }
      return r;
    }
  }
  function add(x) {  // カリー化記法の基本パターン
    return function(y) { return x + y ; };
  }
  var arr3 = _map( add(3) ); // 関数合成：関数を組み合わせて新たな関数を作ること
  var res = arr3(arr)
  console.log( "res=" + res );
})();

/*=============================================================================
 *  56頁： reduce 関数：配列の全要素を使って「何か処理をする」 関数のこと
 *=============================================================================
 */
// 【その１】 まず、reduceSum(), reduleMax() を定義する 例
(function() {
  // 全要素の和
  function reduceSum (a) {
      var r = a[0];
      for(var i = 0 ; i < a.length ; i++) {
        r =  r + a[i];
      }
      return r;
  }
  // 全要素から最大値を得る
  function reduceMax (a) {
      var r = a[0];
      for(var i = 0 ; i < a.length ; i++) {
        if (r < a[i])
          r = a[i];
      }
      return r;
  }
  var arr = [8, 23, 18, 7, 51, 19, 49];
  console.log("reduceMax : " + reduceMax(arr));
  console.log("reduceSum : " + reduceSum(arr));
})();

//【その２】 
// 次に reduceSum(), reduleMax() は　同じ構造なので
// 汎用化関数 _reduce() にする
(function() {
  // 汎用化した _reduce関数
  function _reduce (f, a) {
      var r = a[0];
      for(var i = 0 ; i < a.length ; i++) {
        r =  f(r,  a[i]);
      }
      return r;
  }
  // 全要素の和
  var sum = function(x, y) {
    return x + y;
  }
  // 全要素から最大値を得る
  var max = function (x, y) {
    if (x > y) {
       return x ;
    } else {
       return y ;
    }
  }

  function reduceSum (a) {
      return _reduce(sum, a);
  }
  function reduceMax (a) {
      return _reduce(max, a);
  }
  var arr = [8, 23, 18, 7, 51, 19, 49];
  console.log("reduceMax = " + reduceMax(arr));
  console.log("reduceSum = " + reduceSum(arr));

})();


//【その３】 更に  汎用化関数 _reduce() をカリー化する
(function() {
  // 汎用化 _reduce関数 をカリー化した reduce() 定義
  function reduce (f) {
     return function(a) {
        var r = a[0];
        for(var i = 0 ; i < a.length ; i++) {
          r =  f(r,  a[i]);
        }
        return r;
    };
  }
  // 全要素の和
  var sum = function(x, y) {
    return x + y;
  }
  // 全要素から最大値を得る
  var max = function (x, y) {
    return  (x > y) ? x : y ;
  }

  var arr = [8, 23, 18, 7, 51, 19, 49];
  var reduceSum = reduce(sum);
  var reduceMax = reduce(max);

  console.log("reduceMax => " + reduceMax(arr));
  console.log("reduceSum => " + reduceSum(arr));


})();
