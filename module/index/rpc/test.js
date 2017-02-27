"use strict";

class Test {
	constructor(info, response){
		let me = this;
		me.context = {a: 'a1'};
		// return me.main();
	}
	main(){
		let me = this;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(me);
			}, 0);
		});
	}
};

module.exports = Test;