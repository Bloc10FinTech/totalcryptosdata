/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
	gainers_data:function(request, response){
		WidgetService.gainers_data(function(data){
		  return response.send(data);
		});
	},			
	losers_data:function(request, response) {
		WidgetService.losers_data(function(data){
			return response.send(data);
		});
	},
	gainers_losers_data:function(request, response) {
		WidgetService.gainers_losers_data(function(data){
			return response.send(data);
		});
	}
};

