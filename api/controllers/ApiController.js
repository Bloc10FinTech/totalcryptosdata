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
	  },request,false);
  },
  tcPricesInc:function(request, response){
	  MobileApisService.tcPrices(function(data){
		  return response.send(data);
	  },request,true);
  },
  symbolsUSDPrices:function(request, response) {
	  MobileApisService.symbolsUSDPrices(function(data){
		return response.send(data);
	},request,false);
  },
  symbolsUSDPricesInc:function(request, response) {
	  MobileApisService.symbolsUSDPrices(function(data){
		return response.send(data);
	},request,true);
  },
  symbolUSDPrice:function(request, response) {
	  MobileApisService.symbolUSDPrice(function(data){
		return response.send(data);
	},request,request.param('currency'),false);
  },
  symbolUSDPriceInc:function(request, response) {
	  MobileApisService.symbolUSDPrice(function(data){
		return response.send(data);
	},request,request.param('currency'),true);
  },
  productsPrices:function(request, response) {
	  MobileApisService.productsPrices(function(data){
		return response.send(data);
	},request,false);
  },
  productsPricesInc:function(request, response) {
	  MobileApisService.productsPrices(function(data){
		return response.send(data);
	},request,true);
  },
  productPrice:function(request, response) {
	  MobileApisService.productPrice(function(data){
		return response.send(data);
	},request,request.param('product'),false);
  },
  productPriceInc:function(request, response) {
	  MobileApisService.productPrice(function(data){
		return response.send(data);
	},request,request.param('product'),true);
  },
  topProductsPrices:function(request, response) {
	  MobileApisService.topProductsPrices(function(data){
		return response.send(data);
	},request,false);
  },
  topProductsPricesInc:function(request, response) {
	  MobileApisService.topProductsPrices(function(data){
		return response.send(data);
	},request,true);
  },
  tcHistory24H:function(request, response) {
	  MobileApisService.tcHistory24H(function(data){
		return response.send(data);
	},request,false);
  },
  tcHistory24HInc:function(request, response) {
	  MobileApisService.tcHistory24H(function(data){
		return response.send(data);
	},request,true);
  },
  tcHistory7D:function(request, response) {
	  MobileApisService.tcHistory7D(function(data){
		return response.send(data);
	},request,false);
  },
  tcHistory7DInc:function(request, response) {
	  MobileApisService.tcHistory7D(function(data){
		return response.send(data);
	},request,true);
  },
  topGainersLosers:function(request, response) {
	  MobileApisService.topGainersLosers(function(data){
		return response.send(data);
	},request,request.param('time'),false);
  },
  topGainersLosersInc:function(request, response) {
	  MobileApisService.topGainersLosers(function(data){
		return response.send(data);
	},request,request.param('time'),true);
  },
  fixPrice:function(request, response){
	  MobileApisService.fixPrice(function(data){
		return response.send(data);
	},request,request.param('symbol'),false);
  },
  fixPriceInc:function(request, response){
	  MobileApisService.fixPrice(function(data){
		return response.send(data);
	},request,request.param('symbol'),true);
  },
  fixPrices:function(request, response){
	  MobileApisService.fixPrices(function(data){
		return response.send(data);
	},request,false);
  },
  fixPricesInc:function(request, response){
	  MobileApisService.fixPrices(function(data){
		return response.send(data);
	},request,true);
  },
  fixMaster:function(request,response){
	  MobileApisService.fixMaster(function(data){
		return response.redirect(data);
		//return response.send(data);
	},request);
  },
  sliderData:function(request,response) {
	  MobileApisService.sliderData(function(data){
		return response.send(data);
	},request,false);
  },
  sliderDataInc:function(request,response) {
	  MobileApisService.sliderData(function(data){
		return response.send(data);
	},request,true);
  },
  biggestGainers:function(request, response) {
	  MobileApisService.biggestGainers(function(data){
		return response.send(data);
	},request,false);
  },
  biggestGainersInc:function(request, response) {
	  MobileApisService.biggestGainers(function(data){
		return response.send(data);
	},request,true);
  },
  productPriceHistoryChart:function(request, response){
	 MobileApisService.productPriceHistoryChart(function(data){
		return response.send(data);
	},request.param('product'),request,false); 
  },
  productPriceHistoryChartInc:function(request, response){
	 MobileApisService.productPriceHistoryChart(function(data){
		return response.send(data);
	},request.param('product'),request,true); 
  },
  userRegistration:function(request, response) {
	  MobileApisService.userRegistration(function(data){
		return response.send(data);
	},request);
  }
};

