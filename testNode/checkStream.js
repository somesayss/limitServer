"use strict";

// 参考 http://www.tuicool.com/articles/meuuqy

const fs = require('fs');
const limit = require('limit');

function copyStream(){
	let readStream = fs.createReadStream('./aa.gif');
	let writeStream = fs.createWriteStream('./bb.gif');

	// readStream.on('data', function(chunk) {
	// 	if( writeStream.write(chunk) === false ){
	// 		// readStream.pause();
	// 	};
	// });

	// readStream.on('end', function() {
	// 	console.log('onEnd');
	// 	writeStream.end();
	// });

	// writeStream.on('drain', () => {
	// 	console.log('onDrain');
	// 	readStream.resume();
	// });

	readStream.pipe(writeStream);
};
copyStream();

function writeStream(){
	let writeStream = fs.createWriteStream('./bb.txt');
	let bufferList = [new Buffer('嘻嘻'), new Buffer('哈哈')];
	console.log(writeStream.write(bufferList[0]));
	writeStream.on('drain', () => {
		console.log('onDrain');
	});

};
// writeStream();

function writeBigSream(){
	let readStream = fs.createReadStream('./aa.gif');
	let writeStream = fs.createWriteStream('./bb.gif');
	let bufferList = [];
	let isWrite = false;

	function writeFile(){
		let target = bufferList.pop();
		target && writeStream.write(target);
		isWrite = false;
	};

	readStream.on('data', function(chunk) {
		bufferList.push(chunk);
		if( !isWrite ){
			isWrite = true;
			writeFile();
		};
	});

	writeStream.on('drain', () => {
		console.log( 'drain' );
		writeFile();
	});
};
// writeBigSream();

function creatDir(){
	let path = './aa/'; 
	fs.exists(path, (isExists) => {
		console.log(isExists);
		if( !isExists ){
			fs.mkdirSync(path);
		};
	});
};
creatDir();





