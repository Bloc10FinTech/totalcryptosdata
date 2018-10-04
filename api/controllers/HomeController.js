/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
	index: function (request, response) {
		var search_currency=request.param('search_currency') || '';
		return response.view('home', {title: 'Total Cryptos',search_currency:search_currency,socketURL:process.env.SOCKETURL,path:request.path});
  },
  headerFooterData:function(request, response){
	  FrontendService.headerFooterData(function(data){
		  response.send(data);
	  });
  },
  tabData:function(request, response){
	  FrontendService.tabData(request.param('tab'),function(data){
		  response.send(data);
	  },50);
  },
  tabDataSearch:function(request, response){
	  FrontendService.tabData(request.param('tab'),function(data){
		  response.send(data);
	  },0,request.param('currency'));
  },
  tabDataAll:function(request, response){
	  FrontendService.tabData(request.param('tab'),function(data){
		  response.send(data);
	  });
  },
  new_listing:function(request, response){
	  return response.view('new_listing', {title: 'Total Cryptos - New List',path:request.path});
  },
  gainersLosers:function(request, response){
	  FrontendService.gainersLosers(function(data){
		  response.send(data);
	  },10);
  },
  gainers:function(request,response){
	  return response.view('gainers', {title: 'Total Cryptos - Gainers',path:request.path});
  },
  gainers_data:function(request, response){
	  FrontendService.gainers_data(function(data){
		  response.send(data);
	  });
  },
  losers:function(request,response){
	  return response.view('losers', {title: 'Total Cryptos - Losers',path:request.path});
  },
  losers_data:function(request, response){
	  FrontendService.losers_data(function(data){
		  response.send(data);
	  });
  },
  exchange_prices:function(request,response){
	  var lower=request.param('tab');
	  var title='Total Cryptos - '+lower.charAt(0).toUpperCase() + lower.substr(1);
	  return response.view('exchange_prices', {title: title,tab:request.param('tab'),path:request.path});
  },
  exchange_prices_details:function(request,response){
	  var lower=request.param('tab');
	  var title='Total Cryptos - '+lower.charAt(0).toUpperCase() + lower.substr(1);
	  return response.view('exchange_prices_details', {title: title,tab:request.param('tab'),path:request.path});
  },
  volume_24_hour_currency:function(request, response) {
	  return response.view('volume_24_hour_currency', {title: 'Total Cryptos - Currency',path:request.path});
  },
  
  volume_24_hour_currency_data:function(request, response){
	  FrontendService.volume_24_hour_currency_data(function(data){
		response.send(data);
	});
  },
  
  volume_24_hour_currency_symbol:function(request,response){
	  var lower=request.param('symbol');
	  var title='Total Cryptos - '+lower.charAt(0).toUpperCase() + lower.substr(1);
	  return response.view('volume_24_hour_currency_symbol',{title: title,currency: request.param('symbol'),path:request.path}); 
  },
  
  volume_24_hour_currency_symbol_data:function(request,response){
	  FrontendService.volume_24_hour_currency_symbol_data(request.param('symbol'),request.param('data'),function(data){
		 return response.send(data); 
	  });
  },
  
  volume_24_hour_market:function(request,response){
	  var lower=request.param('market');
	  var title='Total Cryptos - '+lower.charAt(0).toUpperCase() + lower.substr(1);
	  return response.view('volume_24_hour_market',{title: title,market:request.param('market'),path:request.path}); 
  },
  
  volume_24_hour_market_data:function(request,response){
	  FrontendService.volume_24_hour_market_data(request.param('market'),function(data){
		 return response.send(data); 
	  });
  },
  product_history_chart:function(request,response){
	  FrontendService.product_history_chart(request.param('market'),function(data){
		 return response.send(data); 
	  });
  },
  volume_24_hour_exchange:function(request,response){
	  return response.view('volume_24_hour_exchange',{title: 'Total Cryptos - Exchange',path:request.path});
  },
  
  volume_24_hour_exchange_data:function(request,response){
	  FrontendService.volume_24_hour_exchange_data(function(data){
		  return response.send(data);
	  });
  },
  
  exchange:function(request,response){
	  var lower=request.param('exchangeName');
	  var title='Total Cryptos - '+lower.charAt(0).toUpperCase() + lower.substr(1)+' Exchange';
	return response.view('exchange',{title: title,exchangeName:request.param('exchangeName'),path:request.path}); 
  },
  
  exchange_data:function(request,response){
	  FrontendService.exchange_data(request.param('exchangeName'),function(data){
		 return response.send(data); 
	  });
  },
  
  tc_history:function(request,response){ 
	  return response.view('tc_history',{title: 'Total Cryptos - TC History',path:request.path});
  },
  tc_history_data:function(request,response){
	   FrontendService.tc_history_data(function(data){ 
		  return response.send(data);
	  });
  },
  gainers_and_losers:function(request,response){
		return response.view('gainers_and_losers',{title: 'Total Cryptos - Gainers Losers',path:request.path}); 
  },
  
  gainers_and_losers_data:function(request,response){
	  FrontendService.gainers_and_losers_data(function(data){
		  return response.send(data);
	  });
  },

  documentation:function(request, response){
	return response.view('documentation',{title: 'Total Cryptos - Documentation',path:request.path}); 
  },	

  about:function(request,response){
	return response.view('about',{title: 'Total Cryptos - About',path:request.path}); 
  },
  
  ninja_trader:function(request,response){
	return response.view('ninja_trader',{title: 'Total Cryptos - Ninja Trader',path:request.path}); 
  },
  TC_index:function(request,response){
		return response.view('TCindex',{title: 'Total Cryptos - TC Index',path:request.path}); 
  },
  
  fix:function(request,response){
	return response.view('fix',{title: 'BIT FIX - The Official FIX for Crypto Currencies',og_img:'https:totalcryptos.com/images/bitfix.jpg',meta_description:'BIT FIX is the Official FIX for Crypto Currencies, hosted at http://totalcryptos.com/fix posted every day at 4:00 EST (NYC Time) Daily 7 days a week. BIT FIX includes the FIX in major currencies, on major Cryptos. For additional currencies or to list your own token as part of the FIX, contact Bloc10 or signup for zDATA.',path:request.path}); 
  },
  
  fix_data_by_symbol:function(request,response){
	  FrontendService.fixData('databysymbol',request.param('symbol'),function(data){
		  response.send(data);
	  });
  },
  
  fix_price_sources:function(request,response){
	  FrontendService.fixPriceSources(request.param('base_currency'), request.param('quote_currency'), function(data){
		  response.send(data);
	  });
  },
  
  fx:function(request,response){
	return response.view('fx',{title: 'Total Cryptos - FX',path:request.path}); 
  },
  
  fx_data_by_symbol:function(request,response){
	  FrontendService.fxData('databysymbol',request.param('symbol'),20,function(data){
		  response.send(data);
	  });
  },
  
  crypto_arbitrage:function(request,response){
	  return response.view('crypto_arbitrage',{title: 'Total Cryptos - Crypto Arbitrage',path:request.path});
  },
  
  exchanges_currencies:function(request,response){
	  FrontendService.exchanges_currencies(function(data){
		  response.send(data);
	  });
  },
  
  predator:function(request,response){
	  FrontendService.predator(request.param('exchange_array'),request.param('currency_array'),function(data){
		 response.send(data); 
	  });
  },
  
  ico:function(request,response){
	return response.view('ico',{title: 'Total Cryptos - ICO',path:request.path}); 
  },
  
  ico_data:function(request,response){
	  FrontendService.ico_data(function(data){
		 response.send(data); 
	  });
  },
  
   pro:function(request,response){
		return response.redirect('https://portal.totalcryptos.com/pro-data-service');
  }
  
};

