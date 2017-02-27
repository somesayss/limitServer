"use strict";

const fs = require('fs');
const serverConfig = require(`${process.cwd()}/config`);

class Upload {
	constructor(info){
		let me = this;
		let baseInfo = info.baseInfo;
		me.context = {isSuccess: true, msg: '上传成功。'};
		let files = me.context.files = [];
		baseInfo.files.forEach((val) => {
			let obj = {};
			obj[val.name] = `/${serverConfig.filePath}${val.val}`;
			files.push(obj);
		});		

	}
};

module.exports = Upload;