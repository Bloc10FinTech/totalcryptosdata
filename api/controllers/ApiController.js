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
  },
  tcHistory24H:function(request, response) {
	  MobileApisService.tcHistory24H(function(data){
		return response.send(data);
	},request);
  },
  tcHistory7D:function(request, response) {
	  MobileApisService.tcHistory7D(function(data){
		return response.send(data);
	},request);
  },
  topGainersLosers:function(request, response) {
	  MobileApisService.topGainersLosers(function(data){
		return response.send(data);
	},request,request.param('time'));
  },
  fixPrice:function(request, response){
	  MobileApisService.fixPrice(function(data){
		return response.send(data);
	},request,request.param('symbol'));
  },
  fixPrices:function(request, response){
	  MobileApisService.fixPrices(function(data){
		return response.send(data);
	},request);
  },
  sliderData:function(request,response) {
	  MobileApisService.sliderData(function(data){
		return response.send(data);
	},request);
  },
  biggestGainers:function(request, response) {
	  MobileApisService.biggestGainers(function(data){
		return response.send(data);
	},request);
  },
  userRegistration:function(request, response) {
	  MobileApisService.userRegistration(function(data){
		return response.send(data);
	},request);
  }
};

