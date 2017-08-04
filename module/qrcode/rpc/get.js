"use strict";

// 依赖
const limit = require('limit');

class Get {
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
		let {ids} = data;
		// 单个查询
		if( ids && ids.length ){
			return me.getItems();
		}else{ // 全量查询
			return me.getAllItems();
		};
	}
	getItems(){
		let me = this;
		let {SQL, data} = me;
		let {ids} = data;
		let idsStr = ids.join(',');
		return SQL.query(`SELECT id,name,url,info FROM qrcode where is_delete="n" AND id in (${idsStr});`).then((val) => {
				if( ids.length === val.length ){
					me.context = {isSuccess: true, msg: '查询成功', val: val};
				}else{
					me.context = {isSuccess: false, msg: '查询失败，无效的数据', val: val};
				};
				return me;
			});
	}
	getPageStr(){
		let me = this;
		let {data} = me;
		let {page} = data;
		return [limit.getProp(page, 'start', 0), limit.getProp(page, 'number', 10)].join(',');
	}
	getAllItems(){
		let me = this;
		let {SQL} = me;
		return Promise.all([
				SQL.query(`SELECT COUNT(*) FROM qrcode where is_delete="n"`),
				SQL.query(`SELECT id,name,url,info FROM qrcode where is_delete="n" ORDER BY id DESC limit ${me.getPageStr()}`)
			]).then((val) => {
				let count = val[0][0]['COUNT(*)'];
				let list = val[1];
				me.context = {isSuccess: true, msg: '查询成功', val: {count, list}};
				return me;
			});
	}
};

module.exports = Get;














