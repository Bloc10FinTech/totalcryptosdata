/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
	index: function (request, response) {
		FrontendService.marketData(function(data){  
		return response.view('home', {gdax: data.gdax,cryptoData: data.cryptoData, topproducts:data.topproducts, feedrss:data.rss, title: 'Total Cryptos',socketURL:process.env.SOCKETURL});
	});
  },
  gainersLoosers:function(request, response){
	  FrontendService.gainersLoosers(function(data){
		  response.send(data);
	  });
  },
  tabData:function(request, response){
	  FrontendService.tabData(request.param('tab'),function(data){
		  response.send(data);
	  });
  },
  volume_24_hour_currency:function(request, response) {
	  FrontendService.volume_24_hour_currency(function(data){
		return response.view('volume_24_hour_currency', {data: data.currency, cryptoData: data.cryptoData, topproducts:data.topproducts,gdax: data.gdax, title: 'Total Cryptos'});
	});
  },
  volume_24_hour_currency_symbol:function(request,response){
	  FrontendService.volume_24_hour_currency_symbol(request.param('symbol'),function(data){
		 return response.view('volume_24_hour_currency_symbol',{markets: data.symbol, cryptoData: data.cryptoData,topproducts:data.topproducts, history:data.cryptoHistory, currency: request.param('symbol'),gdax: data.gdax, title: 'Total Cryptos'}); 
	  });
  },
  volume_24_hour_market:function(request,response){
	  FrontendService.volume_24_hour_market(request.param('market'),function(data){
		 return response.view('volume_24_hour_market',{data: data.market, cryptoData: data.cryptoData, topproducts:data.topproducts,gdax: data.gdax, title: 'Total Cryptos'}); 
	  });
  },
  volume_24_hour_exhange:function(request,response){
	  FrontendService.volume_24_hour_exchange(function(data){
		  return response.view('volume_24_hour_exchange',{data: data.exchange, cryptoData: data.cryptoData, topproducts:data.topproducts,gdax: data.gdax, title: 'Total Cryptos'});
	  });
  },
  exchange:function(request,response){
	  FrontendService.exchange(request.param('exchangeName'),function(data){
		 return response.view('exchange',{data: data, cryptoData: data.cryptoData, topproducts:data.topproducts,gdax: data.gdax, title: 'Total Cryptos'}); 
	  });
  },
  tc_history:function(request,response){ 
	  FrontendService.tc_history(function(data){ 
		  return response.view('tc_history',{history1_day: data.history1_day,history7_day: data.history7_day, cryptoData: data.cryptoData, topproducts:data.topproducts,gdax: data.gdax, title: 'Total Cryptos'});
	  });
  },
  gainers_and_losers:function(request,response){
	  FrontendService.gainers_and_losers().then(data => {
		  return response.view('gainers_and_losers',{data: data.gainers_losers, cryptoData: data.cryptoData, topproducts:data.topproducts,gdax: data.gdax, title: 'Total Cryptos'}); 
	  });
  },

  documentation:function(request, response){
	  FrontendService.documentation(function(data){
		 return response.view('documentation',{cryptoData: data.cryptoData, topproducts:data.topproducts, gdax: data.gdax, title: 'Total Cryptos'}); 
	  });
  },	

  about:function(request,response){
  	 FrontendService.documentation(function(data){
		 return response.view('about',{cryptoData: data.cryptoData, topproducts:data.topproducts, gdax: data.gdax, title: 'Total Cryptos'}); 
	  });
  },
  TC_index:function(request,response){
  	 FrontendService.documentation(function(data){
		 return response.view('TCindex',{cryptoData: data.cryptoData, topproducts:data.topproducts, gdax: data.gdax, title: 'Total Cryptos'}); 
	  });
  }

};

