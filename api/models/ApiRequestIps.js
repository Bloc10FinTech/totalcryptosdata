/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'api_request_ips',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes  : {
	id: {type: 'integer', primaryKey: true},	
	ip_address: {type: 'string', required: true},
	api_name: {type: 'string', required: true},
	date_created: {type: 'datetime', required: true}
  }
};

