"use strict";

const zlib = require('zlib');

const inflate = zlib.createInflateRaw();

// inflate.on('data', (data) => {
// 	console.log(data);
// });

let buf1 = new Buffer([0x4a, 0x4c, 0x4c, 0x04, 0x00]);
let buf2 = new Buffer([0x02, 0x22, 0x00, 0x0]);

let buf3 = new Buffer([0x00, 0x00, 0xff, 0xff]);

// console.log(buf1);

function cleanup(){
	console.log(123);
	inflate.removeAllListeners();
};

setTimeout(() => {
	inflate.on('data', (data) => {
		console.log(data);
	});
	inflate.write(buf1);
	inflate.write(buf3);
	inflate.flush(cleanup);
},1000);

setTimeout(() => {
	inflate.on('data', (data) => {
		console.log(data);
	});
	inflate.write(buf2);
	inflate.write(buf3);
	inflate.flush(cleanup);
},3000);