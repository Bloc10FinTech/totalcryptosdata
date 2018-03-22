/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'total_crypto_price',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes  : {
	id: {type: 'integer', primaryKey: true},	
	tc100: {type : 'float', required: true},
	total_usd_market_cap: {type : 'float', required: true},
	tcw100: {type : 'float', required: true},
	date_created: {type: 'datetime', required: true}
  }
};

