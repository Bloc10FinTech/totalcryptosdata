/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
	index: function (request, response) {
		return response.view('home', {title: 'Total Cryptos',socketURL:process.env.SOCKETURL});
  },
  headerFooterData:function(request, response){
	  FrontendService.headerFooterData(function(data){
		  response.send(data);
	  });
  },
  tabData:function(request, response){
	  FrontendService.tabData(request.param('tab'),function(data){
		  response.send(data);
	  });
  },
  gainersLosers:function(request, response){
	  FrontendService.gainersLosers(function(data){
		  response.send(data);
	  });
  },
  volume_24_hour_currency:function(request, response) {
	  return response.view('volume_24_hour_currency', {title: 'Total Cryptos'});
  },
  
  volume_24_hour_currency_data:function(request, response){
	  FrontendService.volume_24_hour_currency_data(function(data){
		response.send(data);
	});
  },
  
  volume_24_hour_currency_symbol:function(request,response){
	  return response.view('volume_24_hour_currency_symbol',{title: 'Total Cryptos',currency: request.param('symbol')}); 
  },
  volume_24_hour_currency_symbol_data:function(request,response){
	  FrontendService.volume_24_hour_currency_symbol_data(request.param('symbol'),function(data){
		 return response.send(data); 
	  });
  },
  volume_24_hour_market:function(request,response){
	  return response.view('volume_24_hour_market',{title: 'Total Cryptos',market:request.param('market')}); 
  },
  
  volume_24_hour_market_data:function(request,response){
	  FrontendService.volume_24_hour_market_data(request.param('market'),function(data){
		 return response.send(data); 
	  });
  },
  volume_24_hour_exchange:function(request,response){
	  return response.view('volume_24_hour_exchange',{title: 'Total Cryptos'});
  },
  
  volume_24_hour_exchange_data:function(request,response){
	  FrontendService.volume_24_hour_exchange_data(function(data){
		  return response.send(data);
	  });
  },
  
  exchange:function(request,response){
	return response.view('exchange',{title: 'Total Cryptos',exchangeName:request.param('exchangeName')}); 
  },
  
  exchange_data:function(request,response){
	  FrontendService.exchange_data(request.param('exchangeName'),function(data){
		 return response.send(data); 
	  });
  },
  
  tc_history:function(request,response){ 
	  return response.view('tc_history',{title: 'Total Cryptos'});
  },
  tc_history_data:function(request,response){
	   FrontendService.tc_history_data(function(data){ 
		  return response.send(data);
	  });
  },
  gainers_and_losers:function(request,response){
		return response.view('gainers_and_losers',{title: 'Total Cryptos'}); 
  },
  
  gainers_and_losers_data:function(request,response){
	  FrontendService.gainers_and_losers_data().then(data => {
		  return response.send(data); 
	  });
  },

  documentation:function(request, response){
	return response.view('documentation',{title: 'Total Cryptos'}); 
  },	

  about:function(request,response){
	return response.view('about',{title: 'Total Cryptos'}); 
  },
  TC_index:function(request,response){
		return response.view('TCindex',{title: 'Total Cryptos'}); 
  }

};

