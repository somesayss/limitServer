"use strict";

// 依赖
const limit = require('limit');

const {SQL} = limit;

class List {
	constructor(request, response){
		let me = this;
		me.baseInfo = request.baseInfo;
		return me.main();
	}
	main(){
		let me = this;
		let context = me.context = {};
		let filterYear = me.getFilter();
		return Promise.all([
				SQL.querySuper('getCountByYear', filterYear), 
				SQL.querySuper('getList', filterYear, me.getPage())]).then((val) => {
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