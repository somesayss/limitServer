"use strict";

// 依赖
const limit = require('limit');

// 链接
let MySql = limit.createMySql({
	database:'thetop'
});

let arr = [];

arr.push( MySql.insertData([{ name: '摔跤吧！爸爸',
    score: 9.1,
    director: '涅提·蒂瓦里',
    actor: '阿米尔·汗,沙克希·坦沃,Fatima Sana Shaikh',
    area: '印度',
    type: '传记,运动',
    year: '2016',
    src: 'https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2401676338.jpg' }]) );


Promise.all(arr).then(() => {
	MySql.end();
});

// 插入数据
// query('insert into movie (name, score, director, actor, area, type) values ("毕业会考", 7.9, "克里斯蒂安·蒙吉", "阿德里安·蒂蒂耶尼,玛丽亚·维多利亚·德拉格斯,拉雷什·安德瑞斯", "英国", "爱情")').catch((e) => {
// 	console.log(e);
// });

// query('select * from movie').then((data) => {
// 	console.log(data)
// });
// 














