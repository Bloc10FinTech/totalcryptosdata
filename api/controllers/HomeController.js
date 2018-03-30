/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
	index: function (request, response) {
		var a;
		var b;
		var c;

	FrontendService.gainers_and_loosers(function(data){
		 a=data;

		 if (a.gainer_loosers.gainer_24_h.length>=5){
		 	b=5;
		 } else{
		 	b=a.gainer_loosers.gainer_24_h.length;
		 }
		 if (a.gainer_loosers.looser_24_h.length>=5){
		 	c=5;
		 } else{
		 	c=a.gainer_loosers.looser_24_h.length;
		 }

	  });

	FrontendService.marketData(function(data){ 
		return response.view('home', {contgain: b, contlooser: c,data: a.gainer_loosers, cryptoData: a.cryptoData, topproducts:a.topproducts, gdax: data.gdax, bittrex: data.bittrex, coinmarket: data.coinmarket,bitfinex:data.bitfinex,hitbtc:data.hitbtc,gate:data.gate,kuna:data.kuna, okex: data.okex, binance:data.binance,huobi:data.huobi, gemini:data.gemini, kraken:data.kraken, bitflyer:data.bitflyer, bithumb:data.bithumb,bitstamp:data.bitstamp, bitz:data.bitz, lbank:data.lbank, coinone:data.coinone,wex:data.wex,exmo:data.exmo,liqui:data.liqui,korbit:data.korbit,totalcryptospriceusd:data.totalcryptospriceusd,totalcryptospricepairs:data.totalcryptospricepairs,cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos',socketURL:process.env.SOCKETURL});
	});
  },
  volume_24_hour_currency:function(request, response) {
	  FrontendService.volume_24_hour_currency(function(data){
		return response.view('volume_24_hour_currency', {data: data.currency, cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos'});
	});
  },
  volume_24_hour_currency_symbol:function(request,response){
	  FrontendService.volume_24_hour_currency_symbol(request.param('symbol'),function(data){
		 return response.view('volume_24_hour_currency_symbol',{data: data.symbol, cryptoData: data.cryptoData,topproducts:data.topproducts, title: 'Total Cryptos'}); 
	  });
  },
  volume_24_hour_market:function(request,response){
	  FrontendService.volume_24_hour_market(request.param('market'),function(data){
		 return response.view('volume_24_hour_market',{data: data.market, cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos'}); 
	  });
  },
  volume_24_hour_exhange:function(request,response){
	  FrontendService.volume_24_hour_exchange(function(data){
		  return response.view('volume_24_hour_exchange',{data: data.exchange, cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos'});
	  });
  },
  exchange:function(request,response){
	  FrontendService.exchange(request.param('exchangeName'),function(data){
		 return response.view('exchange',{data: data, cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos'}); 
	  });
  },
  tc_history:function(request,response){
	  FrontendService.tc_history(function(data){ 
		  return response.view('tc_history',{history1_day: data.history1_day,history7_day: data.history7_day, cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos'});
	  });
  },
  gainers_and_loosers:function(request,response){
	  FrontendService.gainers_and_loosers(function(data){
		 return response.view('gainers_and_loosers',{data: data.gainer_loosers, cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos'}); 
	  });
  },

  documentation:function(request, response){
	  FrontendService.documentation(function(data){
		 return response.view('documentation',{cryptoData: data.cryptoData, topproducts:data.topproducts, title: 'Total Cryptos'}); 
	  });
  }	
};

