class Animal {
  constructor(name, sex) {
	this.name = name ;
	this.sex  = sex ;
  }
  toString() {
	return this.name + 'は' + this.sex + 'です';
  }
}

var ani = new Animal('きら', 'メス');
console.log(ani.toString());
