/*============================================================================
 * 第５章：継承
 *
 *===========================================================================*/
// 5.1 疑似クラス型
(function() {

  var f = function(){};
  var obj = {};
  var type = typeof f ;

  // 関数オブジェクトが生成される際に以下コードを実行
  // this.prototype = { constructor: this};
  f.prototype.constructor ;

  //===========================================================
  // もし new演算子が演算子でなくメソッドとして実装されていたら
  // 以下のようなものになっていただろう
  //===========================================================
  // Function.method('new', function(){
  Function.prototype.new =  function() {
    // コンストラクタの prototype を継承した新しいオブジェクトを生成
    var that = Object.create(this.prototype);

    // this に新しいオブジェクトをセットしたうえでコンストラクタを呼び出す
    var other = this.apply(that, arguments);

    // もし戻り値がオブジェクトでない場合、新しいオブジェクトに置き換える
    return (typeof other === 'object' && other) || that ;
  };
  var f2 = function(){};
  var newObj = f2.new();

  /*===============================================
   * コンストラクタを定義してから prototypeを拡張できる
   * ==============================================*/
  var Mamal = function(name) {
    this.name = name ;
  }; 
  Mamal.prototype.get_name = function() {
    return this.name ;
  };
  Mamal.prototype.says = function() {
    return this.saying || '' ;
  };
  var myMamal = new Mamal('Herb the Mammal');
  var name = myMamal.get_name() // 'Herb the Mammal'

  // Mammal を継承した疑似クラスを作る場合は、constructor関数を定義し
  // その prototype プロパティを Mammal インスタンスで書き換える
  var Cat = function(name) {
    this.name = name;
    this.saying = "meow";
  };
   
  Cat.prototype = new Mamal();
  // 新しいプロトタイプを purr メソッドと　get_nameメソッドで書き換える
  Cat.prototype.purr = function(n) {
    var i, s='';
    for(i = 0; i<n; i++) {
      if (s) {
        s += '-';
      }
      s +='r';
    }
    return s ;
  };
  Cat.prototype.get_name = function() {
    return this.says() + ' ' + this.name + ' ' + this.says();
  };
  var myCat = new Cat('Henrietta');
  var says  = myCat.says();     // 'meow'
  var purr  = myCat.purr(5);    // 'r-r-r-r-r-r'
  var name  = myCat.get_name(); // ''meow Henrietta meow'
  console.log(name);

})();

// 5.X :
// (function() { })();
