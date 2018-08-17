/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
	predators_data:function(request, response){
		PredatorTradeService.predators_data(request.param('currencies'),function(data){
		  return response.send(data);
		});
	}
};

