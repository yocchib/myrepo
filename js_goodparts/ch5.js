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

// 5.3 : プロトタイプ型
// プロトタイプ型の継承は、新しいオブジェクトが古いオブジェクトを継承する
// 弱点としては、プライバシーが全くない点
(function() {

  // まずオブジェクトリテラルを使って基本オブジェクトを生成
  var myMammal = {
    name : 'Herb the Mammal',
    get_name : function () { return this.name ; },
    says     : function () { return this.saying || ''; },
  };
  // 差分継承の例
  // インスタンス生成
  var myCat = Object.create(myMammal);
  myCat.name   = 'Henrietta' ;
  myCat.saying = 'meow' ;
  myCat.purr = function(n) {
    var i, s='';
    for(i = 0; i<n; i++) {
      if (s) {
        s += '-';
      }
      s +='r';
    }
    return s ;
  };
  myCat.get_name = function() {
    return this.says() + ' ' + this.name + ' ' + this.says();
  };
  console.log(myCat);

})();

// 5.4 : 関数型
(function() {
  // 関数コンストラクタのテンプレートコード
  //   spec : インスタンス生成に必要な情報,
  //   my   : 継承チェーンでコンストラクタによって共有されるデータを格納するコンテナ
  var constructor = function(spec, my) {
    var that ;
    // var そのほかのプライベート変数

    my = my || {};

    // 共通の変数や関数を my に追加する
    // my.member = value ;

    // that = 新しいオブジェクト
    // 新しいオプジェクトを準備する例として
    //   (1) オブジェクトリテラル (2) newで疑似クラスコンストラクタ呼び出し
    //   (3) Object.create  

    // thatを拡張して, 特権機能を持つメソッドを定義する

    return that ;
  };

  // 上記テンプレートを mammal オブジェクト例に当てはめる
  //   利用例 myMammal = mammal( {name: 'Herb'} );
  var mammal = function(spec) {
    var that = {};
    // name と saying の２つのプロパティは完全にプライベートになっている
    that.get_name = function () { return spec.name ; } ;
    that.says     = function () { return spec.saying || ''; } ;
    return that ;
  };
  var myMammal = mammal( {name: 'Herb'} );

  // 
  //  利用例 myCat = cat( {name: 'Henrietta'} );
  var cat  = function(spec) {
    spec.saying = spec.saying || 'meow' ;
    var that = mammal(spec);

    // 差分のみ記述
    that.purr = function(n) {
      var i, s='';
      for(i = 0; i<n; i++) {
        if (s) {
          s += '-';
        }
        s +='r';
      }
      return s ;
    };
    that.get_name = function() {
      return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that ;
  };
  var myCat = cat( {name: 'Henrietta'} );
  console.log(myCat);

  // superior : 継承元オブジェクトのメソッドを呼び出す 
  Object.prototype.superior = function(name) {
    var that = this ;
    var method = that[name];
    return function() {
      return method.apply(that, arguments);
    };
  };
  var coolcat = function(spec) {
    var that = cat(spec);
    var super_get_name = that.superior('get_name');
    that.get_name = function(n) {
      return 'like ' + super_get_name() + ' baby' ;
    };
    return that ;
  };
  var myCoolCat = coolcat({name: 'Bix'});
  var name = myCoolCat.get_name();    // 'like meow Bix meow baby'
  console.log('myCoolCat :' + name);

   
})();

// 5.X :
// (function() { })();
