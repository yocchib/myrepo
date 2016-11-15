/*===================================================
 * 第５回：自分でオブジェクトを定義して
 *  　　　 JavaScriptのオブジェクト指向を理解する
 *===================================================*/
// Autoboxing : 基本型からオブジェクトに暗黙に変換する機能
// 基本型から生成されるオブジェクトをラッパーオブジェクトと称する
(function() {
  var hello = "Hello!" ;
  console.log(hello.length);

  console.log(hello.toUpperCase());
  console.log((new String(hello)).toUpperCase()); // これは上記と同じ

  // List 3
  var x = 1000;
  console.log(x.toExponential());


})();


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
(function() {
  // List 15 : 値に対するイテレータオブジェクト
  function create_range_iterator (start, end) {
    var object = Object.create(null);
    object.start = start ;
    object.end   = end   ;
    object.current   = null ;
    object.next = function() {
      if (this.current == null) {
          this.current = start ;
      } else if ( this.current == this.end ) {
          this.current = null ;
      } else {
          this.current += 1 ;
      }
      return this.current ;
    };
    object.hasNext = function() {
      if (this.current == this.end ) {
        return false ;
      }
      return true ;
    };
    return object;
  }
  // List 16 : イテレータオブジェクトを使って値を表示するプログラム
  var it = create_range_iterator(10, 14) ;
  console.log("List 16 :");
  while( it.hasNext() ) {
    var value = it.next();
    console.log("value : " + value);
  }
})();

// クロージャでイテレータオブジェクト(List 15 例) をカプセル化
(function() {
  // List 17 : クロージャで start, end, currentをスコープ内に束縛
  function create_range_iterator (start, end) {
    var object = Object.create(null);
    var _start     = start ;
    var _end       = end   ;
    var _current   = null ;
    object.next = function() {
      if (_current == null) {
          _current = start ;
      } else if ( this.current == this.end ) {
          this.current = null ;
      } else {
          this.current += 1 ;
      }
      return this.current ;
    };
    object.hasNext = function() {
      if (this.current == this.end ) {
        return false ;
      }
      return true ;
    };
    return object;
  }
  // List 16 : イテレータオブジェクトを使って値を表示するプログラム
  var it = create_range_iterator(10, 14) ;
  console.log("List 16 :");
  while( it.hasNext() ) {
    var value = it.next();
    console.log("value : " + value);
  }
})();

// List 18 : 配列に対するイテレータオブジェクト
//  ダックタイピングの例
//   create_array_iterator も create_range_iterator も
//   同じ next , hasNextというメソッドをもち
//   同じ使い方ができる
(function() {
  function create_array_iterator (list) {
    var object = Object.create(null);
    object.list     = list ;
    object.current  = 0  ;
    object.next = function() {
      var value = null ;
      if ( this.current < this.list.length ) {
          value = this.list[this.current];
          this.current += 1 ;
      }
      return value ;
    };
    object.hasNext = function() {
      if ( this.current < this.list.length ) {
        return true ;
      }
      return false ;
    };
    return object;
  }
  // List 19 : イテレータオブジェクトを使って配列を表示するプログラム
  var list = ["Apple", "Pen", "PineApple", "Banana", "Cherry"];
  var it = create_array_iterator(list) ;
  console.log("List 19 :");
  while( it.hasNext() ) {
    var value = it.next();
    console.log("value = " + value);
  }
})();