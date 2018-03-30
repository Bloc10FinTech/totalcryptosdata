/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'users',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes  : {
	id: {type: 'integer', primaryKey: true, autoIncrement: true},	
    name: {type: 'string', required: true},
	email: {type: 'string', required: true, unique: true},
	img_path: {type: 'string'},
	password: {type: 'string', required: true},
	date_created: {type: 'datetime', required: true}
  }
};

