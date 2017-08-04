"use strict";

// 依赖
const limit = require('limit');

class Save {
	constructor(request, SQL){
		let me = this;
		me.baseInfo = request.baseInfo;
		me.SQL = SQL;
		me.context = {};
		return me.main();
	}
	main(){
		let me = this;
		let {baseInfo} = me;
		let {param} = baseInfo;
		let data = me.data = JSON.parse(param.data);
		if( data.id ){
			return me.update();
		}else{
			return me.add();
		};
	}
	add(){
		let me = this;
		let {SQL} = me;
		return SQL.insertData('qrcode', [
			me.filterData()
		]).then((val) => {
			me.context = {isSuccess: true, msg: '保存成功', val: {id: val.insertId}};
			return me;
		});
	}
	update(){
		let me = this;
		let {SQL} = me;
		let {data} = me;
		let {id} = data;
		let arr = [];
		limit.forEach(me.filterData(), (val, key) => {
			arr.push(`${key}=${JSON.stringify(val)}`);
		});
		return SQL.query(`update qrcode set ${arr.join(',')} where id=${id}`).then((val) => {
			// 修改失败
			if( val.affectedRows === 0 ){
				me.context = {isSuccess: false, msg: '修改失败，无效数据', val: {id: id}};
			}else{
				me.context = {isSuccess: true, msg: '修改成功', val: {id: id}};
			};
			return me;
		}); 
	}
	filterData(){
		let me = this;
		let keyList = ['name', 'url', 'info'];
		return limit.filter(me.data, (val, key) => {
			return limit.contains(keyList, key);
		});
	}
};

module.exports = Save;














