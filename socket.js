"use strict";

// 依赖
const limit = require('limit');
const WebSocketServer = require('limitWS');
// const WebSocketServer = require('ws').Server;

// 变量
const server = {};
const wsList = [];
const nameSpace = ['in'];

/**
 * 规则
 * 客户端 => {to: 'others|thesys', value: 'something', type: 'type'}
 * 服务端 => {from: 'others|thesys', value: 'something', type: 'type', id: 'o|1|2', displayName: '用户名'} //0代表系统，1代表用户
 * 		
 */

const tellMap = {
	// 别人的信息通知我
	tellMeFromOthers(from, message, type){
		limit(wsList).difference(from).forEach((ws) => {
			let sendObj = {
				from: 'others',
				value: message,
				type: type,
				id: from._soId,
				displayName: from._soDisplayName
			};
			ws.send(JSON.stringify(sendObj));
		});
	},
	// 通知我
	tellMe(message){
		limit(wsList).forEach((ws) => {
			ws.send(message);
		});
	},
	// 系统通知我
	tellMeFromThesys(ws, message, type){
		let sendObj = {
			from: 'thesys',
			value: message,
			type: type,
			id: 0
		};
		ws.send(JSON.stringify(sendObj));
	}
};

const handles = {
	thesys: {},
	others: {}	
};

function setId(ws){
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
	ws._soId = pos;
};

function outName(ws){
	nameSpace[ws._soId] = 'out';
	// 回收
	nameSpace.length = nameSpace.lastIndexOf('in') + 1;
};

function upperName(name){
	return name.replace(/^\w/, (a) => a.toUpperCase());
};

server.start = () => {
	let wss = new WebSocketServer({ port: 8181 });
	wss.on('connection', (ws) => {
		wsList.push(ws);
		limit.inf(`链接数量:${wsList.length}`);
		// 回复名称
		setId(ws);
		tellMap.tellMeFromThesys(ws, ws._soId, 'tellId');
	    ws.on('message', function (message) {
	    	limit.log(`获取信息:${message}`);
	    	try{
	    		let msg = JSON.parse(message);
	    		msg = limit.cb( handles[msg.to][msg.type] )(msg);
	    		if( msg ){
	    			tellMap[`tellMeFrom${upperName(msg.to)}`](ws, msg.val, msg.type);
	    		};
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

















