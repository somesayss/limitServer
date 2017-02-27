"use strict";

// 依赖
const server = require('limitServer');
const socket = require('./socket');

// 启动服务
server.http();

// 启动服务
socket.start();

