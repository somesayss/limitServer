"use strict";

// 依赖
const theTop = {};

theTop.getCountByYear = function(filterYear){
	return `SELECT COUNT(*) FROM movie ${filterYear}`;
};

theTop.getList = function(filterYear, page){
	return `SELECT * FROM movie ${filterYear} ORDER BY score DESC, id ASC limit ${page}`;
};

module.exports = theTop;
