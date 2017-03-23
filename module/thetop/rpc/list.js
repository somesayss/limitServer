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
		let filterYear = me.getFilter();
		let SQL = me.SQL;
		return Promise.all([
					SQL.query( SQL.getCountByYear(filterYear) ), 
					SQL.query( SQL.getList(filterYear, me.getPage() ) )
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
		let {param} = me.baseInfo;
		let filter = JSON.parse(param.filterMap);
		let filterYear = filter['年份'].map((val) => {
			return `year=${val}`;
		});
		if( filterYear.length ){
			return `WHERE ${filterYear.join(' OR ')}`;
		}else{
			return '';
		};
	}
};


module.exports = List;