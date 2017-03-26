"use strict";

// 依赖
const theTop = {};

theTop.getCountByYear = function(filter){
	return `SELECT COUNT(*) FROM movie ${filter}`;
};

theTop.getList = function(filter, page){
	return `SELECT * FROM movie ${filter} ORDER BY score DESC, id ASC limit ${page}`;
};

module.exports = theTop;
