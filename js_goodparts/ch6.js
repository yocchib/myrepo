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

  // 6.2 配列の長さ
  nums.length = 3 ;             // ['zero', 'one', 'two']
  nums[nums.length] = 'shi';    // ['zero', 'one', 'two', 'shi']
  nums.push('go');              // ['zero', 'one', 'two', 'shi', 'go']

  // 6.3 要素の削除
  delete nums[2];           // ['zero', 'one', undefined, 'shi', 'go']
  nums.splice(2,1);         // ['zero', 'one', 'shi', 'go']
  console.log("nums : " + nums);

  // 6.4 要素の列挙 : JavaScriptの配列は 実際は オブジェクト
  var i;
  for (i = 0; i < nums.length ; i++) {
    console.log("nums[" + i + "]" + " : " + nums[i] );
  }
  // 6.5 配列かどうかの判定
  var is_array = function(value) {
      return value &&
        typeof value === 'object' &&
        typeof value.length === 'number' &&
        typeof value.splice === 'function' &&
        !(value.propertyIsEnumerable('length'))
  };
  console.log('is_array : ' + is_array( nums )) ;
  console.log('is_array : ' + is_array( nums_obj )) ;

  // 6.6 配列のメソッドを拡張する
  Array.prototype.reduce = function(f, value) {
      var i;
      for(i=0; i<this.length; i++) {
          value = f(this[i], value);
      }
      return value ;
  };
  var data = [4, 8, 15, 16, 23, 42];
  var add = function(a, b) {
    return a + b ;
  };
  var multi = function(a, b) {
    return a * b ;
  };
  var sum = data.reduce(add, 0);  // 108
  console.log('sum : ' + sum);
  var prod = data.reduce(multi, 1); // 7418880
  console.log('prod : ' + prod);

  // 6.6 次元
  Array.dim = function(dimension, initial) {
      var a =[], i;
      for(i=0; i< dimension; i++) {
          a[i] = initial ;
      }
      return a;
  };
  var myArray = Array.dim(10, 0);
  console.log(myArray[9]);

})();


// 6.X :
// (function() { })();
