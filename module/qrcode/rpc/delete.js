"use strict";

// 依赖
const limit = require('limit');

class Delete {
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
		if( data.ids.length ){
			return me.deleteItems();
		}else{
			return me;
		};
	}
	deleteItems(){
		let me = this;
		let {SQL, data} = me;
		let {ids} = data;
		let idsStr = ids.join(',');
		return SQL.begin().then(() => {
				return SQL.query(`update qrcode set is_delete = "y" where id in (${idsStr});`)
			}).then((val) => {
				if( val.affectedRows !== ids.length ){
					return SQL.rollback();
				}else{
					return SQL.commit();
				};
			}).then((val) => {
				if( val){
					me.context = {isSuccess: true, msg: '删除成功', val: {id: ids}};
				}else{
					me.context = {isSuccess: false, msg: '删除失败，无效的数据', val: {id: ids}};
				};
				return me;
			});
	}
};

module.exports = Delete;














