"use strict";

// 依赖
const limit = require('limit');
const server = require('limitServer');
const socket = require('./socket');

// 是否线上本地库
const isOnline = false;

// 启动服务
server.http();

// 启动服务
socket.start();

// 链接数据库(本地)
if( isOnline ){
	limit.createMySql({
		database: 'thetop',
		host: '198.98.102.230',
	    user: 'joe',
	    password: '123456'
	});
}else{
	limit.createMySql({database: 'thetop'});
};
