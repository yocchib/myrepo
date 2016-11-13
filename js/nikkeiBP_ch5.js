/*===================================================
 * 第５回：自分でオブジェクトを定義して
 *  　　　 JavaScriptのオブジェクト指向を理解する
 *===================================================*/
(function() {
  var text = "Hello";
  var m = text.toUpperCase ; // List 6 : オートボクシングでメソッド関数を mに代入
  console.log(m);

  //  bind は 呼び出し前の状態を保つ非破壊的なメソッドなので m に再度代入
  m = m.bind("Good Bye"); // m に オブジェクト"Good Bye" を紐づけて また m に代入
  console.log(m);        
  console.log(m());
})();

// List 8,9 : 自分でメソッドを定義してみる
(function() {
  var m = function() {
    return "***" + this + "***" ;
  };
  m = m.bind("Hello"); // bindメソッドでオブジェクトと紐づけ
  console.log("self: " + m());
})();

// List 10 : 関数をオブジェクトに紐づけ
// List 11 : 逆にオブジェクトに関数を紐づけ
(function() {
  var m = function() {
    return "length = "+ this.length ;
  };
  m = m.bind("Hello"); // bindメソッドでオブジェクトと紐づけ
  console.log(m());

  // List 10 : 関数をオブジェクトに紐づけ
  var m = function() {
    return "["+ this.toUpperCase() + "]" ;
  };
  var mb = m.bind("Hello"); // bindメソッドでオブジェクトと紐づけ
  console.log("List10 " + mb());

  // List 11 : 逆にオブジェクトに関数を紐づけ
  var text = new String("Hello"); // 基本型をオブジェクトに変換が必須
  text.m = m ;
  console.log("List11 : " + text.m());

})();

// List12 : 自分でメソッドを定義
(function() {
  var person = {
    name : "Tarou",
    age  : 24,
    say : function() {
      return "My name is " + this.name + ". I am " + this.age + " years old.";
    },
  }
  console.log("List12 : " + person.say());

})();

// List13 : 空の連想配列を使い、自分でメソッドを定義
// List14 : 隠しプロパティを備えないオブジェクトを作成し、自分でメソッドを定義
(function() {
  // var person = {}; // List13 : 空の連想配列 {} には 隠しプロパティが備わってしまう
  var person = Object.create(null); // List14 : 隠しプロパティを備えないオブジェクトを作成
  person.name = "Tarou";
  person.age  = 24;
  person.say  = function() {
      return "My name is " + this.name + ". I am " + this.age + " years old.";
  };
  console.log("List13 : " + person.say());

})();

/*============================================================
 * ■ JavaScriptのオブジェクト指向 ■
 *  (1) カプセル化  …   private の代わりに クロージャを使う
 *  (2) 継承        …  プロトタイプを使う
 *  (3) ポリモーフィズム   …  ダックタイピング
 * =========================================================== */
// イテレータオブジェクトを作成し、オブジェクト指向を解説
