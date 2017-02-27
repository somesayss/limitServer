"use strict";

class A {
	set a(val){
		let me = this;
		me.aa = val;
	}
	get a(){
		return this.aa;
	}
};


let aExp = new A();

aExp.aa = 'a1';
console.log(aExp.aa);

