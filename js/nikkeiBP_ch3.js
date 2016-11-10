/*============================================
   第３回：連想配列はオブジェクト
   　　　　無名関数とクロージャも併せて学ぶ
 *============================================*/
var man = { name : "Yamada", age : 18, sex : 'Male', foo: "bar" }
var keys = Object.keys(man)
for (var i = 0; i < keys.length ; i++) {
 // console.log(keys[i]);
}
console.log("\n");

for (var key in man) {
 // console.log(man[key]);
}

/* 45頁 : 即時関数 
 *  定義 a, b と別の a, b を引数として使える
 */
var a = 10, b= 20;
var result = (function(a, b){ return a+b;} )(1,2);

console.log(result );

/* 45頁 : 関数を引数にとる関数のことを 高階関数と呼ぶ
 */
var toDouble = function(x) {return x * 2; };
 
function sumAppliedBValues(f, x, y) {
  return f(x) + f(y);
}

result = sumAppliedBValues(toDouble, 1,2)
// console.log(result );
// console.log("");

/* 46頁 : クロージャの例
 * クロージャのメリットは２つ
 *   (1) グローバル変数を使わなくて済む
 *   (2) 関数を動的に生成できる … 外側の関数は「関数を作り出す関数」
 *        外側の関数に与える引数に応じて様々な関数を生成できる
 */
function outer() {
  var a = 2;
  var inner = function() {
    return a;
  }
  var inner_inc = function() {
    a ++ ;
    return a;
  }
  return inner_inc ;
}
var func = outer();
result = func();
console.log(result );
result = func();
console.log(result );

/* 48頁 : クロージャのスコープに注意
 */
var names = ['Yamada', 'Takahashi', 'Sato'];
var callNames = [];
for (var i=0; i < 3; i++)  {
  // callNames[i] = function(){ return names[i]};
  callNames[i] = (function(j) { return function () { return names[j]; } } )(i);
}
console.log( callNames[0]());
console.log( callNames[1]());
console.log( callNames[2]());

/* 49頁 : ディスパッチの例
 */
// クロージャを使ったディスパッチ
function createCounter() {
  var count = 0;
  var counter = function (message) {
    if (message == "reset") {
      return function() { count = 0;}
    } else if (message == "increment") {
      return function() { count += 1;}
    } else if (message == "value") {
      return function() { return count; }
    }
  }
  return counter ;
}

var counter = createCounter();
// counter("reset")(); // 内部で counter が 0になる
counter("increment")(); // 
counter("reset")(); // 内部で counter が 0になる
counter("increment")(); // 
console.log("count = " + counter("value")() ); // 
