"use strict";

// 依赖
const theTop = {};

// 获取一级二级的类目
theTop.getAllByLevelOneOrTwo = function(level){
	return `SELECT * from sort where mid=0`;
};

// 获取三级类目 
theTop.getNameByLevelThree = function(pid){
	return `SELECT DISTINCT name from sort where pid=${pid} ORDER BY name DESC`;
};

module.exports = theTop;
