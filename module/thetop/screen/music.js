"use strict";

class Thetop {
	constructor(request){
		let me = this;
		me.request = request;
		me.context = {title: '我的播放器'};
		me.getHost();
	}
	getHost(){
		let me = this;
		let headerInfo = me.request.headerInfo;
		let host = headerInfo.host;
		me.context.host = `http://${host.split(':')[0]}:3000`;
	}
};

module.exports = Thetop;