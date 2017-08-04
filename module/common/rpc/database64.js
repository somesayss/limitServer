"use strict";

const fs = require('fs');

class Database64 {
	constructor(info){
		let me = this;
		me.context = {};
		let {baseInfo, headerInfo} = info;
		let {param} = baseInfo;
		let {database} = param;
		database = database.split(/base64,/)[1];
		let buf = new Buffer(database, 'Base64');
		return new Promise((r, j) => {
			fs.writeFile('./file/a.png', buf, (err) => {
				if( err ){
					j(err);
				}else{
					me.context = '保存成功';
					r(me);
				};
			});
		});
	}
};

module.exports = Database64;