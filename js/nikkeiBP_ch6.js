/*===================================================
 * 第6回：プロトタイプを利用した共有化と警鐘を学ぶ
 *===================================================*/
// List 1 : メソッド(callMe) が別々に生成されてしまう例
//          (コンピュータリソースを無駄に消費するので好ましくない例)
(function() {
  function createDog(name) {
	var object = Object.create(null);
	object.name = name ;
	object.callMe = function() {
  		console.log(this.name + ": Bow wow");
	};
	return object ;
  }

  console.log( "List 1 " );
  var taro = createDog("Taro") ;
  var jiro = createDog("Jiro") ;
  taro.callMe();
  jiro.callMe();
  // falseと出力：別々のメソッドとして扱われる
  console.log( taro.callMe == jiro.callMe );
  // メソッドにプロパティを付与する例：
  taro.callMe.memo = "Memo";
  console.log( taro.callMe.memo );
  console.log( jiro.callMe.memo ); // undefiend と表示される
})();

// List 2 : List1 を改良
//         
(function() {
  var Dog_prototype = Object.create(null); // プロトタイプを持たないオプジェクト生成
  Dog_prototype.callMe = function() {
  		console.log(this.name + ": Bow wow");
	};
  function createDog(name) {
	  var object = Object.create(Dog_prototype);
	  object.name = name ;
	  return object ;
  }

  console.log( "List 2 " );
  var taro = createDog("Taro") ;
  var jiro = createDog("Jiro") ;
  taro.callMe();
  jiro.callMe();

  console.log( taro.callMe == jiro.callMe ); // true と出力：別々のメソッドとして扱われる
  // メソッドにプロパティを付与する例：
  taro.callMe.memo = "Memo";
  console.log( taro.callMe.memo );
  console.log( jiro.callMe.memo ); // Memo と表示される
})();

// List 3 : List2 にプロトタイプオブジェクトに プロパティを定義
//         
(function() {
  var Dog_prototype = Object.create(null); // プロトタイプを持たないオプジェクト生成
  Dog_prototype.callMe = function() {
  		console.log(this.name + ": Bow wow");
	};
  Dog_prototype.age  = 5; // プロトタイプオブジェクトに age プロパティを定義

  function createDog(name) {
	  var object = Object.create(Dog_prototype);
	  object.name = name ;
	  return object ;
  }

  console.log( "List 3 " );
  var taro = createDog("Taro") ;
  var jiro = createDog("Jiro") ;
  console.log(taro.age);  // 5 と表示
  console.log(jiro.age);  // 5 と表示
  
  taro.age = 7 ;  // taroオプジェクトに ageプロパティを追加
  console.log(taro.age);  // 7 と表示
  console.log(jiro.age);  // 5 と表示
})();



// List 4 : プロトタイプを使えば 後から処理内容を変更できる
//         
(function() {
  var Dog_prototype = Object.create(null); // プロトタイプを持たないオプジェクト生成
  Dog_prototype.callMe = function() {
  		console.log(this.name + ": Bow wow");
	};
  function createDog(name) {
	  var object = Object.create(Dog_prototype);
	  object.name = name ;
	  return object ;
  }
  console.log( "List 4 " );
  var taro = createDog("Taro") ;
  var jiro = createDog("Jiro") ;
  taro.callMe()  // 'Taro : Bow wow'' と表示
  jiro.callMe()  // 'Jiro : Bow wow'' と表示
  
  Dog_prototype.callMe = function() {
  		console.log(this.name + ": Woof");
	};
  taro.callMe()  // 'Taro : Woof ' と表示
  jiro.callMe()  // 'Jiro : Woof ' と表示
})();


/*=======================================
 * List 5 : プロトタイプのチェーン例
 *=======================================*/         
(function() {
  var Computer = {
    calc : function() {
  		console.log("clark - clark");
	  }
  };
  console.log( "List 5 " );
  Computer.calc();

  var PersonalComputer = Object.create( Computer) ;
  PersonalComputer.calc = function() {
  	console.log("Pipo-papo");
	};
  PersonalComputer.calc();

  var NotePC = Object.create( PersonalComputer) ;
  NotePC.calc = function() {
  	console.log("Pa pa pa");
	};
  NotePC.calc();
})();

/*=============================================================
 * List 6 : コンストラクタで List1 を 記述
 *          (しかしまだ callMeメソッドがメソッド共有できていない)
 *============================================================*/         
(function() {

  function Dog(name) {
  	this.name = name ;
	  this.callMe = function() {
  		console.log(this.name + ": Bow wow");
	  };
  }

  console.log( "List 6 " );
  // new でオブジェクトを生成した場合 
  // JavaScriptが 予め用意しているオブジェクトがプロトタイプになる
  var taro = new Dog("Taro") ; 
  var jiro = new Dog("Jiro") ;
  taro.callMe();
  jiro.callMe();
  // falseと出力：別々のメソッドとして扱われる
  console.log( taro.callMe == jiro.callMe );  // false
  console.log( taro.toString());          // [object Object]
  console.log( taro.constructor  );       // [Function: Dog]
  console.log( taro instanceof Dog );     // true
  
})();

/*=================================================================
 * List 7 : コンストラクタで List1 を 記述
 * メソッド共有を コンストラクタ関数の prototype プロパティで実現
 *=================================================================*/         
(function() {

  function Dog(name) {
  	this.name = name ;
  }
  Dog.prototype.callMe = function() {
  		console.log(this.name + ": Bow wow");
	};

  console.log( "List 7 " );
  // new でオブジェクトを生成した場合 
  // JavaScriptが 予め用意しているオブジェクトがプロトタイプになる
  var taro = new Dog("Taro") ; 
  var jiro = new Dog("Jiro") ;
  taro.callMe();
  jiro.callMe();
  console.log( taro.toString());          // [object Object]
  console.log( taro.constructor  );       // [Function: Dog]
  console.log( taro instanceof Dog );     // true

  console.log( taro.callMe == jiro.callMe );  // true : メソッド共有を実現した
  
})();

/*=================================================================
 * List 13 : クラスベースの古典的継承を実現する
 *=================================================================*/         
(function() {
  var __extends = function(childClass, parentClass) {
    function F() {
       this.constructor = childClass ;
    }
    F.prototype = parentClass.prototype ;
    childClass.prototype = new F();   // F の constructor を置き換えたので余分なオブジェクトは作らない
  };

  function Animal(name) {
    this.name = name ;
  }
  Animal.prototype.say = function() {
    return "My name is " + this.name + ".";
  };
  Animal.prototype.food = function() {
    return "I don't know";
  };
  __extends(Dog, Animal);
  function Dog(name) {
    var _Animal = Animal.bind(this); // Animalコンストラクタに紐づけられているオブジェクトをthisに変更
    _Animal(name);
  }
  Dog.prototype.food = function() {
    return "I link meat";
  };
  console.log( "List 13 " );

  var dog = new Dog("Pochi");
  console.log(dog.say());
  console.log(dog.food());
  console.log(dog.constructor);
  console.log(dog instanceof Dog);
  console.log(dog instanceof Animal);

})();
