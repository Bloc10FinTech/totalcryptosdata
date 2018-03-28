/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
  tcPrices:function(request, response){
	  MobileApisService.tcPrices(function(data){
		  return response.send(data);
	  },request);
  },			
  symbolsUSDPrices:function(request, response) {
	  MobileApisService.symbolsUSDPrices(function(data){
		return response.send(data);
	},request);
  },
  symbolUSDPrice:function(request, response) {
	  MobileApisService.symbolUSDPrice(function(data){
		return response.send(data);
	},request,request.param('currency'));
  },
  productsPrices:function(request, response) {
	  MobileApisService.productsPrices(function(data){
		return response.send(data);
	},request);
  },
  productPrice:function(request, response) {
	  MobileApisService.productPrice(function(data){
		return response.send(data);
	},request,request.param('product'));
  },
  topProductsPrices:function(request, response) {
	  MobileApisService.topProductsPrices(function(data){
		return response.send(data);
	},request);
  }
};

