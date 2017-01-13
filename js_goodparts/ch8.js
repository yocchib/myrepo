/*============================================================================
 * 第８章：メソッド
 *
 *===========================================================================*/
(function() {
  // Array.sort()
  n = [4,8,15,16,23,42];
   n.sort();  // 数字の配列を正しく処理できない (文字列として解釈するため)
  console.log(n);
  // 回避するためには 自分で比較関数を用意する
  n.sort( function(a, b) {
    return a - b;
  });
  console.log(n);

  // メンバ名を引数にして比較関数を返す by関数
  var by = function(name) {
    return function(o, p) {
      var a, b;
      if (typeof o === 'object' && typeof p === 'object' && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1:1;
      } else {
          throw {
              name: 'Error',
              message: name + 'を含むオブジェクトが必要!'
          };
      }
    };
  };
  var s = [
    {first: 'Joe', last: 'Besser'},
    {first: 'Moe', last: 'Howard'},
  ];
  s.sort(by('first'));
  

})();


// 6.X :
// (function() { })();
