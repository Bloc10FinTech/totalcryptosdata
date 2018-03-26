/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
  symbolsUSDPrices:function(request, response) {
	  MobileApisService.symbolsUSDPrices(function(data){
		return response.send(data);
	});
  },
  productsPrices:function(request, response) {
	  MobileApisService.productsPrices(function(data){
		return response.send(data);
	});
  }
};

