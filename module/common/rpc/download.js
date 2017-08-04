"use strict";

const fs = require('fs');

class Download {
	constructor(handle){
		let {response} = handle;
		
		// 下载
		response.writeHead(200, {
			'Content-Disposition': `attachment; filename=${encodeURIComponent("哈哈.gif")}`
		});
		fs.createReadStream('./html/xixi.gif').pipe(response);

	}
};

module.exports = Download;