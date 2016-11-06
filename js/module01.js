/*
 * 使い方 
 * var Adder = require('./module01') ;
 * obj = new Adder(2,3);
 * obj.add()
*/
var Adder = function(a, b) {
 this.a = a;
 this.b = b;

 var obj = {};
 var n = 17;
 obj.bin = n.toString(2);

 n = 123456.789;
 obj.toFixed = n.toFixed(0);

 this.obj = obj ;

 this.argsum3 = arguments[0] +  arguments[1] +  arguments[2];
 this.argsum4 = arguments[0] +  arguments[1] +  arguments[2] +  arguments[3];
 console.log("arguments.length : " + arguments.length) ;
 
 this.recursive = function(i) {
	if ( i == 0 ) {
		return ;
	}
	console.log( i + "\n");
	arguments.callee(i-1) ;
 }
};

Adder.prototype.coalesce = function() {
  if (! this.a ) { this.a = 0; }
  if (!( this).b ) { this.b = 0; }
};

Adder.prototype.add = function() {
  this.coalesce();
  if (typeof this.a !== 'number' || typeof this.b !== 'number') {
	return 'pass in numbers' ;
  }
  return this.a + this.b;
};

Adder.prototype.test = function() {
  for (var key in this.obj) {
	if (this.obj.hasOwnProperty(key)) {
		console.log("key:" + key);
	} else {
		console.log(key);
	}
  }
};

module.exports = Adder;
