/*===================================================
 * 第３章：オプジェクト
 *===================================================*/
// 3.5 プロトタイプ
(function() {

  var stooge = {
    "first-name" : "Jerome",
    "last-name"  : "Howard"
  };
  var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
      IATA: "SYD",
      time: "2004-09-22 14:55",
      city: "Sydney"
    },
    arrival: {
      IATA: "LAX",
      time: "2004-09-23 10:42",
      city: "Los Angeles"
    }
  };
  flight.status = 'overdue';

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
  // プロトタイプの結びつきは動的なものである
  stooge.profession = 'actor';
  // console.log(another_stooge.profession);

  // 
  var name ;
  for (name in another_stooge) {
    if (another_stooge[name] !== 'function') {
      if ( another_stooge.hasOwnProperty(name) ) {
        console.log(name + ": "+ another_stooge[name] );
      } else  {
        console.log(name + "(継承): "+ another_stooge[name] );
      }
      
    }
  }
})();

// 
//  (function() {})();
//
