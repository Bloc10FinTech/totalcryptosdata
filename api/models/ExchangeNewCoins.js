/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'exchange_new_coins',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes  : {
	id: {type: 'integer', primaryKey: true},	
	exchange_id: {type : 'integer', required: true},
	name: {type : 'string', required: true},
	currencies: {type: 'json'},
	products: {type: 'json'},
	products_new: {type: 'json'},
	date_created: {type: 'datetime', required: true}
  }
};

