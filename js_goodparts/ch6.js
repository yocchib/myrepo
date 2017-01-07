/*============================================================================
 * 第６章：配列
 *
 *===========================================================================*/
(function() {
  // 6.1 配列リテラル
  var nums = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six',
               'seven', 'eight', 'nine' ];
  var nums_obj = { 0:'zero', 1:'one', 2:'two',   3:'three', 4:'four',
                   5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine' };

  console.log(nums.length);  // Array.prototype を継承

  // 6.1 配列の長さ
  nums.length = 3 ;  // ['zero', 'one', 'two']

})();


// 6.X :
// (function() { })();
