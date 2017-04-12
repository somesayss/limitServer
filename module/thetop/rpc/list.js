"use strict";

// 依赖
const limit = require('limit');

class List {
	constructor(request, SQL){
		let me = this;
		me.baseInfo = request.baseInfo;
		me.SQL = SQL;
		return me.main();
	}
	main(){
		let me = this;
		let context = me.context = {};
		let filter = me.getFilter();
		let SQL = me.SQL;
		return Promise.all([
					SQL.query( SQL.getCountByYear(filter) ), 
					SQL.query( SQL.getList(filter, me.getPage() ) )
				]).then((val) => {
					context.count = val[0][0]['COUNT(*)'];
					context.list = val[1];
					return me;
				});
	}
	getPage(){
		let me = this;
		let {param} = me.baseInfo;
		return [param.start, param.number].join(', ');
	}
	getFilter(){
		let me = this;
		let filterYear = me.getFilterYear();
		let filterName = me.getFilterName();
		let filterArr = [filterYear, filterName].filter((k) => k);
		if( filterArr.length ){
			return `WHERE ${filterArr.join(' AND ')}`;
		}else{
			return '';
		};
	}
	getFilterYear(){
		let me = this;
		let {SQL, baseInfo} = me;
		let {param} = baseInfo;
		return SQL.parseFilterMap(param.filterMap);
	}
	getFilterName(){
		let me = this;
		let {param} = me.baseInfo;
		let name = param.filterName;
		if( name ){
			return `name like "%${name}%"`;
		}else{
			return '';
		};
	}
};


module.exports = List;