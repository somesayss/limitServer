"use strict";

// 依赖
const theTop = {};

theTop.getCountByYear = function(filter){
	return `SELECT COUNT(*) FROM movie ${filter}`;
};

theTop.getList = function(filter, page){
	return `SELECT * FROM movie ${filter} ORDER BY score DESC, id ASC limit ${page}`;
};

theTop.parseFilterMap = function(map){
	map = JSON.parse(map);
	return getWhereSql([map['年份'], map['类型'], map['国家']]);
};

function getSqlStr(arr){
	let str = '';
	if( arr && arr.length ){
		arr = arr.map((val) => {return `name="${val}"`});
		str = `SELECT mid from sort where ${arr.join(' or ')}`;
	};
	return str;
};

function getWhereSql(arr){
	arr = arr.map((val) => getSqlStr(val)).filter(v => v);
	let str = '';
	arr.forEach((val) => {
		if( !str ){
			str = val;
		}else{
			str = `${val} AND mid in ( ${str} )`;
		};
	});
	if( str ){
		return `id in ( ${str} )`;
	}else{
		return str;
	};
};

module.exports = theTop;
