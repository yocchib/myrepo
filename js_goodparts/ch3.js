/*===================================================
 * 第３章：オプジェクト
 *===================================================*/
// 3.5 プロトタイプ
(function() {

  var stooge = {
    "first-name" : "Jerome",
    "last-name"  : "Howard"
  };

  // 3.5 プロトタイプ
  if (typeof Object.create !== 'function') {
	  Object.create = function(o) {
      var F = function() {};
      F.prototype = o;
      return new F();
	  };
  }
  var another_stooge = Object.create(stooge);
  another_stooge['first-name'] = 'Harry';
  another_stooge['last-name'] = 'Moses';
  another_stooge.nickname = "Moe";

})();

// 
//  (function() {})();
//
