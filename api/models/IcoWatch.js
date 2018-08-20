/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'ico_watch',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes  : {
	id: {type: 'integer', primaryKey: true},	
	name: {type : 'string', required: true},
	url: {type : 'string', required: true},
	api_key: {type : 'string'},
	data: {type: 'json'},
	date_created: {type: 'datetime', required: true}
  }
};

