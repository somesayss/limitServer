"use strict";

// 依赖
const limit = require('limit');
const WebSocketServer = require('limitWS');
// const WebSocketServer = require('ws').Server;

// 变量
const server = {};
const wsList = [];
const nameSpace = ['in'];

const tellMap = {
	// 告诉别人
	tellthem(me, message, type){
		limit(wsList).difference(me).forEach((ws) => {
			ws.send( JSON.stringify({val: message, to: 'me', from: 'Them', fromName: getNameByWs(me), type: type}) );
		});
	},
	// 告诉所有人
	tellall(message){
		limit(wsList).forEach((ws) => {
			ws.send(message);
		});
	},
	// 回复我
	tellme(ws, message, type){
		ws.send( JSON.stringify({val: message, to: 'me', from: 'Sys', fromName: '系统', type: type}) );
	}
};

function inName(ws){
	let pos = null;
	limit.some(nameSpace, (val, key) => {
		if( val === 'out' ){
			pos = key;
			return true;
		};
	});
	if( pos === null ){
		pos = nameSpace.push('in') - 1;
	}else{
		nameSpace[pos] = 'in';
	};
	ws.POS = pos;
	return pos;
};

function outName(ws){
	nameSpace[ws.POS] = 'out';
	// 回收
	nameSpace.length = nameSpace.lastIndexOf('in') + 1;
};

function getNameByWs(ws){
	return `游客${limit.padStart(ws.POS, 2, '0')}`;
};

server.start = () => {
	let wss = new WebSocketServer({ port: 8181 });
	wss.on('connection', (ws) => {
		wsList.push(ws);
		limit.inf(`链接数量:${wsList.length}`);
		// 回复名称
		inName(ws);
		tellMap.tellme(ws, getNameByWs(ws), 'setName');
	    ws.on('message', function (message) {
	    	limit.log(`获取信息:${message}`);
	    	try{
	    		let msg = JSON.parse(message);
	    		tellMap[`tell${msg.to}`](ws, msg.val);
	    	}catch(e){
	    		limit.ERR(e);
	    	};
	    });
		ws.on('close', () => {
			limit(wsList).remove(ws);
			outName(ws);
		});
		
	});
	wss.on('listening', () => {
		limit.log(`开始监听:${wss.state.ip}:${wss.state.port}`);
	});
	wss.on('error', (err) => {
		limit.ERR('WS服务错误', err);
	});
};

module.exports = server;

















