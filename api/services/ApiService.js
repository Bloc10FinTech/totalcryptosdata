module.exports = {
	gdaxCurrencies:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.gdax.com/currencies',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	gdaxProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.gdax.com/products',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	gdaxMarketTicker:function(id){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.gdax.com/products/'+id+'/ticker',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	gdaxMarketStat:function(id){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.gdax.com/products/'+id+'/stats',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	gdaxMarketTrade:function(id){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.gdax.com/products/'+id+'/trades',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bittrexCurrencies:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://bittrex.com/api/v1.1/public/getcurrencies',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bittrexProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://bittrex.com/api/v1.1/public/getmarkets',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bittrexMarketSummaries:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			request('https://bittrex.com/api/v1.1/public/getmarketsummaries', function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	coinMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.coinmarketcap.com/v1/ticker/?limit=0',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitfinexProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.bitfinex.com/v1/symbols',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitFinexMarketTicker:function(id){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.bitfinex.com/v1/pubticker/'+id,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	hitbtcCurrencies:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.hitbtc.com/api/2/public/currency',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	hitbtcProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.hitbtc.com/api/2/public/symbol',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},

	hitbtcMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject) {
			var options = {
			  url: 'https://api.hitbtc.com/api/2/public/ticker',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	gateProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options= {
				url: 'http://data.gate.io/api2/1/pairs',
				headers: {
					'User-Agent': 'request'
				}
			};
			
			request(options, function(err, res, body){
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	gateMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'http://data.gate.io/api2/1/tickers',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	kunaMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://kuna.io/api/v2/tickers',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	okexMarketTicker:function(product){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://www.okex.com/api/v1/ticker.do?symbol='+product,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	binanceProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.binance.com/api/v1/exchangeInfo',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	binanceMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.binance.com/api/v1/ticker/24hr',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	huobiCurrencies:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'http://api.huobi.pro/v1/common/currencys',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	huobiProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'http://api.huobi.pro/v1/common/symbols',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	huobiMarketTicker:function(product){ 
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'http://api.huobi.pro/market/detail/merged?symbol='+product,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	geminiProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.gemini.com/v1/symbols',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	geminiMarketTicker:function(product){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.gemini.com/v1/pubticker/'+product,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	krakenCurrencies:function(){
		var request  = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.kraken.com/0/public/Assets',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	krakenProducts:function(){
		var request  = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.kraken.com/0/public/AssetPairs',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	krakenMarketTicker:function(product){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.kraken.com/0/public/Ticker?pair='+product,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitflyerProducts:function(){
		var request  = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.bitflyer.jp/v1/markets',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitflyerMarketTicker:function(product){
		var request  = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.bitflyer.com/v1/getticker?product_code='+product,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bithumbMarketTicker:function(){
		var request  = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.bithumb.com/public/ticker/all',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitstampProducts:function(){
		var request  = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://www.bitstamp.net/api/v2/trading-pairs-info/',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitstampMarketTicker:function(product){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://www.bitstamp.net/api/v2/ticker/'+product,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitzMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.bit-z.com/api_v1/tickerall',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	lbankProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'http://api.lbank.info/v1/currencyPairs.do',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	lbankMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.lbank.info/v1/ticker.do?symbol=all',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	coinoneMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.coinone.co.kr/ticker?currency=all',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	wexProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://wex.nz/api/3/info',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	wexMarketTicker:function(products){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://wex.nz/api/3/ticker/'+products,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	exmoCurrencies:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.exmo.com/v1/currency',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	exmoProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.exmo.com/v1/pair_settings',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	exmoMarketTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.exmo.com/v1/ticker',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	liquiProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.liqui.io/api/3/info',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	liquiMarketTicker:function(products){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.liqui.io/api/3/ticker/'+products,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	korbitMarketTicker:function(product){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.korbit.co.kr/v1/ticker/detailed?currency_pair='+product,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	bitmexTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://www.bitmex.com/api/v1/instrument?count=500',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	livecoinTicker:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.livecoin.net/exchange/ticker',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	cexProducts:function(){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://cex.io/api/currency_limits',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	cexMarketTicker:function(base_currency,quote_currency){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://cex.io/api/ticker/'+base_currency+'/'+quote_currency,
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	icoWatchList:function(){
		var request=require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://api.icowatchlist.com/public/v1/',
			  headers: {
				'User-Agent': 'request'
			  }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	dataPredictionAPI:function(csvUrl,fileName){
		var request = require('request');
		return new Promise(function(resolve, reject){
			var options = {
			  url: 'https://backend-dot-predict-stress.appspot.com'	,
			  headers: {
				'User-Agent': 'request'
			  },
			  method: "POST",
			  json: true,
			  body: {Train_Data:csvUrl,Weights: fileName }
			};
			request(options, function(err, res, body) {
				if (err) { return reject(err); }
				return resolve(body);
			});
		});
	},
	
	exchangeErrors:function(name,error_type,error,custom_message,date_time){ 
		ExchangeErrors.create({name: name, error_type: error_type, error: error, custom_message: custom_message,date_created:date_time},function(err,data){
			if(err){
				console.log('Exchange log failed for:'+name+' .Error:'+err);
			}
		});
	}
};
