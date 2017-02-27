"use strict";

// node 版本 v7.5.0

// 测试let
	function testLet(){
		let a = 'a1';
		if(1){
			let a = 'a2';
			console.log(a);
		};
		console.log(a);
	};
	// testLet();

// 测试const
	function testConst(){
		const a = 'a1';
		// a = 'a2';
		console.log(a);
	};
	// testConst();

// 测试箭头函数
	const testFn = () => console.log('a1');
	// testFn();

// 测试定义对象
	function testObj(){
		let aaa = 'aaa1';
		let obj = {
			aaa,
			bbb: () => { },
			ccc(){ },
			ddd: 'ddd1'
		};
		console.log(obj);
	};
	// testObj();

// 测试字符串模板
	function testString(){
		let a = 'a1';
		console.log(`${a}a2`);
	};
	// testString();

// 测试解构(不支持)
	function testJG(){
		let [a, b, c] = ['a1', 'b1', 'c1'];
		let {d, e, f} = {d: 'd1', e: 'e1', f: 'f1'};
		console.log(a, b, c);
		console.log(d, e, f);
	};
	// testJG();

// 测试参数(不支持)
	// function testArg(a = 'a1', b = 'b1'){
	// 	console.log(a, b);
	// };
	// testArg();

// 测试数组...操作符
	function testArrOmitted(){
		let a = ['a1', 'a2', 'a3'];
		console.log([...a, 'a4']);
	};
	// testArrOmitted();

	// 不支持
	function testArrOmitted2(...args){
		console.log(args);
	};
	// testArrOmitted2(1,2,3);

// 测试对象...操作符(不支持)
	// function testObjOmitted(){
	// 	let a = {a: 'a1'};
	// 	let b = {b: 'b1'};
	// 	// let o3 = {...a, ...b};
	// 	console.log({...a, ...b, {c: 'c1'}});
	// };
	// testObjOmitted();

// 测试8进制
	function testEight(){
		console.log( 0o767 === 503 );
	};
	// testEight();

// 测试类
	function testClass(){
		class A {
			constructor(name){
				this.name = name;
			}
			show(){
				console.log(this.name);
			}
			static xixi(){
				return 'xixi';
			}
		};

		class B extends A {
			constructor(name, age){
				super(...arguments);
				this.age = age;
			}
			show(){
				super.show();
				console.log(this.age);
			}
			static xixi(){
				return 'haha'
			}
		};


		new B( B.xixi(), 19).show();
	};
	// testClass();




















