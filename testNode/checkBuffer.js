"use strict";

// node 版本 v5.8.0

// ASCII, UTF-8, UTF-16LE/UCS-2, Base64, Binary, Hex

const fs = require('fs');

// 创建buffer
	function creatBuffer(){
		let B1 = new Buffer('hello', 'UTF-8'); //方式1 (string[, encoding])
		let B2 = new Buffer(B1.length); //方式2 (number)
		B1.copy(B2);
		let A1 = [0x68, 0x65, 0x6c, 0x6c, 0x6f]; // 方式3 (array)
		let B3 = new Buffer(A1);
		console.log(B1);
		console.log(B2);
		console.log(B3);
	};
	// creatBuffer();

// 
	function fromBuffer(){
		let B1 = new Buffer([0x00, 0x00, 0xff, 0xff]);
		console.log(B1);
	};
	// fromBuffer();

// 操作buffer
	function editorBuffer(){
		let B1 = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
		let B2 = B1.slice(0);
		let B3 = copyBuffer(B1);
		let B4 = new Buffer(B1);
		B1[1] = 0x64;
		console.log(B1.toString());
		console.log(B2.toString());
		console.log(B3.toString());
		console.log(B4.toString());
	};
	// editorBuffer();

// 复制buffer
	function copyBuffer(buffer, start, end){
		let buf = buffer.slice(start, end);
		let newBuf = new Buffer(buf.length);
		buf.copy(newBuf);
		return newBuf;
	};

// 写入buffer
	function writerBuffer(){
		let B1 = new Buffer(9);
		B1.fill(0);
		B1.write('123');
		console.log(B1);
		console.log(B1.toString());
		console.log(B1.length);
	};
	// writerBuffer();

// 文件写入buffer
	function fileWrite(){
		let B1 = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x71]);
		fs.writeFile('a.txt', B1);
	};
	// fileWrite();

// 文件读取buffer
	function fileReade(){
		fs.readFile('./a.png', (err, file) => {
			console.log(file);
			// fs.writeFile('b.png', file);
			file = file.toString();
			let B1 = new Buffer(file);
			console.log(B1);
		});
	};
	// fileReade();

// 拼接buffer
// http://cnodejs.org/topic/5189ff4f63e9f8a54207f60c
	function concatBuffer(){
		let B1 = new Buffer('hello');
		let B2 = new Buffer('world');
		let A1 = [B1, B2];
		let B3 =  Buffer.concat(A1);
		console.log(B3.toString());
	};
	// concatBuffer();

// 比较buffer
	function equalsBuffer(){
		let B1 = new Buffer('abcd');
		let B2 = new Buffer('abcd');
		console.log(B1.equals(B2));
		console.log( JSON.stringify(new Buffer('\r\n').toString()));
	};
	// equalsBuffer();

// 测试buffer
	function showBuffer(){
		console.log( new Buffer('\r\n-') );
		let arr = [13, 10, 45, 67, 111, 110];
		let buf = new Buffer(arr);
		console.log( arr, buf );
	};
	// showBuffer();

	function bijiaoBuffer(){
		let buf1 = [0xc1, 0x87, 0x7e, 0xc7, 0x89, 0xd6, 0xd4, 0x0f, 0x25, 0xd6, 0x3d, 0xc7, 0x89];
		let str1 = 'xixi';
		// console.log( new Buffer(buf1).slice(6) );
		console.log( new Buffer([0x03, 0xe9]).toString() );
	};
	bijiaoBuffer();



