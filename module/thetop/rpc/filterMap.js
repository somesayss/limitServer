"use strict";

// 依赖
const limit = require('limit');

class filterMap {
	constructor(request, SQL){
		let me = this;
		me.baseInfo = request.baseInfo;
		me.SQL = SQL;
		me.context = {};
		return me.main();
	}
	main(){
		let me = this;
		let {context, SQL} = me;
		// 获取一级类目
		return SQL.query( SQL.getAllByLevelOneOrTwo() ).then((val) => {
			return me.serializationLevel2(val);
		}).then((val) => {
			let {obj} = val;
			let arr = [];
			limit(obj).each((val) => {
				limit(val).each((val, key) => {
					arr.push( SQL.query( SQL.getNameByLevelThree( val ) ) );
				});
			});
			return Promise.all(arr).then((list) => {
				return {list, obj};
			}, (e) => {throw e});
		}).then((val) => {
			let {list, obj} = val;
			limit(obj).each((secObj) => {
				limit(secObj).each((val, key) => {
					secObj[key] = list.shift().filter((val) => {
						return val.name !== '';
					}).map((val) => {
						return val.name;
					});
				});
			});
			context.filterMap = obj;
		}).then(() => {
			return me;
		});
	}
	// 序列化1,2级类目
	serializationLevel2(list){
		let obj = {};
		let map = {};
		let revMap = {};
		list.filter((val) => {
			map[val.id] = val.name;
			revMap[val.name] = val.id;
			if(val.pid === 0){
				obj[val.name] = {};
			}else{
				return true;
			};
		}).forEach((val) => {
			let tem = obj[ map[val.pid] ];
			if( tem ){
				tem[val.name] = val.id;
			}else{
				limit.war(val.pid, '异常');
			};
		});
		return {obj};
	}
};

module.exports = filterMap;

/*

{
	'电影':{
		''
	}
}

 */