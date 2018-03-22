module.exports = {
	marketData:function(callBack,isSocket=null){
		var _ = require('lodash');
		var Promise = require("bluebird");
		
		return Promise.all([
			ApiService.gdaxMarketData(),
			ApiService.bittrexMarketData(),
			ApiService.coinmarketcapMarketData(),
			ApiService.bitfinexMarketData(),
			ApiService.hitbtcMarketData()
		]
		).then(response => {
			if(_.isEmpty(isSocket)){
				callBack({gdax:response[0], bittrex:response[1], coinmarket:response[2],bitfinex:response[3],hitbtc:response[4]});
			}else{
				sails.sockets.blast('exchangeData',{gdax:response[0], bittrex:response[1], coinmarket:response[2],bitfinex:response[3],hitbtc:response[4]});
			}
		}).
		catch(err => {console.log(err);});
	},
	
	gdaxMarketData:function(){
		var _ = require('lodash');
		
		return new Promise(function(resolve, reject) {
			ExchangeList.findOne({name:'gdax'},function(err, gdaxExchange){
				if(!_.isEmpty(gdaxExchange)){
					var gdaxProducts=JSON.parse(gdaxExchange.products);
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:gdaxExchange.id});
					tickers.sort('id DESC');
					tickers.exec(function(err,tickers){
						if(!_.isEmpty(tickers)){
							var stats=ExchangeStats.findOne();
							stats.where({exchange_id:gdaxExchange.id});
							stats.sort('id DESC');
							stats.exec(function(err, stats){
								if(!_.isEmpty(stats))
								{
									var gdaxTickers=JSON.parse(tickers.tickers);
									var gdaxStats=JSON.parse(stats.stats);
									_.forEach(gdaxTickers,function(ticker){
										_.forEach(gdaxStats,function(stat){
											if(ticker.product_id==stat.product_id){
												ticker.variation=(parseFloat(ticker.price)-parseFloat(stat.open))*100/parseFloat(stat.open);
												ticker.chart=[stat.open,stat.low,stat.last,ticker.price];
											}
										})
									});
										
									var temp=[];
									_.forEach(gdaxProducts,function(product){
										_.forEach(gdaxTickers,function(ticker){
											if(ticker.product_id==product.id){
												product.ticker=ticker;
												temp.push(product);
											}
										})
									});
									gdaxProducts=temp;
									return resolve(gdaxProducts);
								}
								else{
									return resolve([]);
								}
							});
						}
						else{
							return resolve([]);
						}
					});
				}
				else{
					return resolve([]);
				}
			});
		});	
	},
	
	bittrexMarketData:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bittrex'},function(err, bittrexExchange){
				if(!_.isEmpty(bittrexExchange)){
					var bittrexTickers=ExchangeTickers.findOne();
					bittrexTickers.where({exchange_id:bittrexExchange.id});
					bittrexTickers.sort('id DESC');
					bittrexTickers.exec(function(err,bittrexTickers){
						if(!_.isEmpty(bittrexTickers)){
							bittrexTickers=JSON.parse(bittrexTickers.tickers).result;
							bittrexTickers.sort(function(a,b){ if(parseFloat(a.Volume)>parseFloat(b.Volume)){return -1;}else {return 1;}});
							return resolve(bittrexTickers);
						}
						else{
							return resolve([]);
						}
					});
				}
				else{
					return resolve([]);
				}
			});	
		});
	},
	
	coinmarketcapMarketData:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'coinmarketcap'},function(err, coinmarketcapExchange){
				if(!_.isEmpty(coinmarketcapExchange)){
					var coinMarketTickers=ExchangeTickers.findOne();
					coinMarketTickers.where({exchange_id:coinmarketcapExchange.id});
					coinMarketTickers.sort('id DESC');
					coinMarketTickers.exec(function(err,coinMarketTickers){
						if(!_.isEmpty(coinMarketTickers)){
							coinMarketTickers=JSON.parse(coinMarketTickers.tickers);
							coinMarketTickers.sort(function(a,b){ if(parseFloat(a.market_cap_usd)>parseFloat(b.market_cap_usd)){return -1;}else {return 1;}});
							return resolve(coinMarketTickers);
						}
						else{
							return resolve([]);
						}
					});
				}
				else{
					return resolve([]);
				}
			});
		});	
	},
	
	bitfinexMarketData:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bitfinex'},function(err, bitfinexExchange){
				if(!_.isEmpty(bitfinexExchange)){
					var bitfinexTickers=ExchangeTickers.findOne();
					bitfinexTickers.where({exchange_id:bitfinexExchange.id});
					bitfinexTickers.sort('id DESC');
					bitfinexTickers.exec(function(err,bitfinexTickers){
						if(!_.isEmpty(bitfinexTickers)){
							bitfinexTickers=JSON.parse(bitfinexTickers.tickers);
							bitfinexTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							return resolve(bitfinexTickers);
						}
						else{
							return resolve([]);
						}
					});
				}
				else{
					return resolve([]);
				}
			});
		});
	},
	
	hitbtcMarketData:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'hitbtc'},function(err, hitbtcExchange){
				if(!_.isEmpty(hitbtcExchange)){
					var hitbtcTickers=ExchangeTickers.findOne();
					hitbtcTickers.where({exchange_id:hitbtcExchange.id});
					hitbtcTickers.sort('id DESC');							
					hitbtcTickers.exec(function(err,hitbtcTickers){
						if(!_.isEmpty(hitbtcTickers)){
							hitbtcTickers=JSON.parse(hitbtcTickers.tickers);
							hitbtcTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							return resolve(hitbtcTickers);
						}
						else{
							return resolve([]);
						}
					});	
				}
				else{
					return resolve([]);
				}
			});
		});	
	},
	
	volume_24_hour_currency:function(callBack){
		var _ = require('lodash');
		ExchangeList.find({name:{'!':'hitbtc'},currencies:{'!':null}},function(err, currencies){
			if(!_.isEmpty(currencies)){
				var exchange_array=[];
				var currencies_array=[];
				var return_data=[];
				_.forEach(currencies,function(currency){
					exchange_array.push({id:currency.id,name:currency.name});
					if(currency.name=='gdax'){
						_.forEach(JSON.parse(currency.currencies),function(exchangeCurrency){
							if(_.indexOf(currencies_array,exchangeCurrency.id)=='-1'){
								currencies_array.push(exchangeCurrency.id);
							}
						});
					}
					else if(currency.name=='bittrex'){
						_.forEach(JSON.parse(currency.currencies).result,function(exchangeCurrency){
							if(_.indexOf(currencies_array,exchangeCurrency.Currency)=='-1'){
								currencies_array.push(exchangeCurrency.Currency);
							}
						});
					}
				});
				
				return Promise.all(exchange_array.map((exchange)=> {
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:exchange.id});
					tickers.sort('id DESC');
					return tickers.then(function(tickers){
						if(exchange.name=='gdax'){
							var volume_24_hour_currency=[];
							_.forEach(JSON.parse(tickers.tickers) ,function(ticker){
								_.forEach(currencies_array,function(currency){
									if(_.startsWith(ticker.product_id,currency+'-')){
										var updated=false;
										_.forEach(volume_24_hour_currency,function(record){
											if(record.currency==currency){
												var already_exists=false;
												_.forEach(record.data,function(data){
													if(data.currency==_.replace(ticker.product_id,currency+'-','') && data.src=='GDAX'){
														already_exists=true;
													}
												});
												if(!already_exists){
													record.data.push({price:ticker.price,volume:ticker.price*ticker.volume,currency:_.replace(ticker.product_id,currency+'-',''),src:'GDAX'});
												}
												updated=true;
											}
										});
										if(!updated){
											var data=[];
											data.push({price:ticker.price,volume:ticker.price*ticker.volume,currency:_.replace(ticker.product_id,currency+'-',''),src:'GDAX'});
											volume_24_hour_currency.push({currency:currency,data:data});	
										}
									}
									else if(_.endsWith(ticker.product_id,'-'+currency)){
										var exists=false;
										_.forEach(volume_24_hour_currency,function(record){
												if(record.currency==_.replace(ticker.product_id,'-'+currency,'')){
													exists=true;
											}
										});
										if(!exists){
											var data=[];
											data.push({price:ticker.price,volume:ticker.price*ticker.volume,currency:currency,src:'GDAX'});
											volume_24_hour_currency.push({currency:_.replace(ticker.product_id,'-'+currency,''),data:data});
										}
									}
								});
							});
						}
						else if(exchange.name=='bittrex'){
							var volume_24_hour_currency=[];
							_.forEach(JSON.parse(tickers.tickers).result ,function(ticker){
								_.forEach(currencies_array,function(currency){
									if(_.startsWith(ticker.MarketName,currency+'-')){
										var updated=false;
										_.forEach(volume_24_hour_currency,function(record){
											if(record.currency==currency){
												var already_exists=false;
												_.forEach(record.data,function(data){
													if(data.currency==_.replace(ticker.MarketName,currency+'-','') && data.src=='BITTREX'){
														already_exists=true;
													}
												});
												if(!already_exists){
													record.data.push({price:ticker.Bid,volume:ticker.Volume,currency:_.replace(ticker.MarketName,currency+'-',''),src:'BITTREX'});
												}
												updated=true;
											}
										});
										if(!updated){
											var data=[];
											data.push({price:ticker.Bid,volume:ticker.Volume,currency:_.replace(ticker.MarketName,currency+'-',''),src:'BITTREX'});
											volume_24_hour_currency.push({currency:currency,data:data});
										}
									}
									else if(_.endsWith(ticker.MarketName,'-'+currency)){
										var exists=false;
										_.forEach(volume_24_hour_currency,function(record){
											if(record.currency==_.replace(ticker.MarketName,'-'+currency,'')){
												exists=true;
											}
										});
										if(!exists){
											var data=[];
											data.push({price:ticker.Bid,volume:ticker.Volume,currency:currency,src:'BITTREX'});
											volume_24_hour_currency.push({currency:_.replace(ticker.MarketName,'-'+currency,''),data:data});
										}
									}
								});
							});
						}
						return volume_24_hour_currency;
					}).catch(err => {console.log(err);});
				})).
				then(response => {
					_.forEach(currencies_array,function(currency){
						_.forEach(response,function(response_data){
							_.forEach(response_data,function(coin){
								var is_updated=false;
								_.forEach(return_data,function(data_object){
									if(data_object.currency==coin.currency){
										data_object.data=_.union(data_object.data,coin.data);
										is_updated=true;
									}
								});
								if(!is_updated){
									return_data.push(coin);
								}
							});
						});
					});
					callBack(return_data);
				}).
				catch(err => {console.log(err);});
			}
		});	
	},
	
	volume_24_hour_exchange:function(callBack){
		var _=require('lodash');
		ExchangeList.find({products:{'!':null},name:{'!':'hitbtc'}},function(err, exchanges){
			return Promise.all(exchanges.map((exchange) =>{
				var tickers=ExchangeTickers.findOne();
				tickers.where({exchange_id:exchange.id});
				tickers.sort('id DESC');
				return tickers.then(function(tickers){
					if(!_.isEmpty(tickers)){
						if(exchange.name=='gdax'){
							var tickers=JSON.parse(tickers.tickers);
							tickers.map(ticker => {
								ticker.volume_24_hour=ticker.price*ticker.volume;
								ticker.currency=_.join(_.split(ticker.product_id,'-',1));
								ticker.pair=_.replace(ticker.product_id,'-','/');
							});
						}
						else if(exchange.name=='bittrex'){
							tickers=JSON.parse(tickers.tickers).result;
							tickers.map(ticker => {
								ticker.volume_24_hour=ticker.Volume;
								ticker.price=ticker.Bid;
								ticker.currency=_.join(_.split(ticker.MarketName,'-',1));
								ticker.pair=_.replace(ticker.MarketName,'-','/');
							});
						}
						else if(exchange.name=='bitfinex'){
							tickers=JSON.parse(tickers.tickers);
							tickers.map(ticker => {
								ticker.volume_24_hour=ticker.volume;
								ticker.price=ticker.bid;
								ticker.currency=ticker.product_id.substr(0,3);
								ticker.pair=ticker.product_id;
							});
						}
						exchange.tickers=tickers;
						delete exchange.id,
						delete exchange.currencies;
						delete exchange.products;
						exchange.name=_.toUpper(exchange.name);
					}
					return exchange;
				});
			})).
			then( response => {
				var data=[];
				_.forEach(response,function(exchange){
					if(!_.isEmpty(exchange.tickers)){
						data.push(exchange);
					}
				});
				callBack(data);
			}).
			catch(err => {console.log(err);});
		});
	},
	
	gainers_and_loosers:function(callBack){
		var _=require('lodash');
		ExchangeList.findOne({name:'coinmarketcap'},function(err, coin_market_exchange){
			var gainer_loosers=[];
			gainer_loosers['gainer_1_h']=[];
			gainer_loosers['looser_1_h']=[];
			gainer_loosers['gainer_24_h']=[];
			gainer_loosers['looser_24_h']=[];
			gainer_loosers['gainer_7_d']=[];
			gainer_loosers['looser_7_d']=[];
			
			if(!_.isEmpty(coin_market_exchange)){
				var tickers=ExchangeTickers.findOne();
				tickers.where({exchange_id:coin_market_exchange.id});
				tickers.sort('id DESC');
				tickers.then(function(tickers){
					var tickers=JSON.parse(tickers.tickers);
					//PROCESS TO GET LAST 1 HOUR GAINERS AND LOOSERS
					tickers.sort(function(a,b){ if(parseFloat(a.percent_change_1h)>parseFloat(b.percent_change_1h)){return -1;}else {return 1;}});
					var temp=[];
					_.forEach(tickers,function(ticker){
						if(parseFloat(ticker.percent_change_1h)>0){
							temp.push(ticker);
						}
					});
					gainer_loosers['gainer_1_h']=temp;
					tickers.reverse();
					temp=[];
					_.forEach(tickers,function(ticker){
						if(parseFloat(ticker.percent_change_1h)<0){
							temp.push(ticker);
						}
					});
					gainer_loosers['looser_1_h']=temp;
					

					//PROCESS TO GET LAST 24 HOURS GAINERS AND LOOSERS
					tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
					
					temp=[];
					_.forEach(tickers,function(ticker){
						if(parseFloat(ticker.percent_change_24h)>0){
							temp.push(ticker);
						}
					});
					gainer_loosers['gainer_24_h']=temp;
					tickers.reverse();
					
					temp=[];
					_.forEach(tickers,function(ticker){
						if(parseFloat(ticker.percent_change_24h)<0){
							temp.push(ticker);
						}
					});
					gainer_loosers['looser_24_h']=temp;
					
					//PROCESS TO GET LAST 7 DAYS GAINERS AND LOOSERS
					tickers.sort(function(a,b){if(parseFloat(a.percent_change_7d)>parseFloat(b.percent_change_7d)){return -1;}else {return 1;}});
					
					temp=[];
					_.forEach(tickers,function(ticker){
						if(parseFloat(ticker.percent_change_7d)>0){
							temp.push(ticker);
						}
					});
					gainer_loosers['gainer_7_d']=temp;
					tickers.reverse();
					
					temp=[];
					_.forEach(tickers,function(ticker){
						if(parseFloat(ticker.percent_change_7d)<0){
							temp.push(ticker);
						}
					});
					gainer_loosers['looser_7_d']=temp;
					
					callBack(gainer_loosers);
				});
			}
			else{
				callBack(gainer_loosers);
			}
		});
	},
	
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
	gdaxTicker:function(id){
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
	gdaxStats:function(id){
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
			  url: 'https://api.coinmarketcap.com/v1/ticker/',
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
	bitFinexTicker:function(id){
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

	updateExchange:function(){
		console.log('crone job running');
		var moment = require('moment');
		var _ = require('lodash');
		//PROCESS TO INSERT GDAX STATIC DATA
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		ExchangeList.count({name: 'gdax'},function(err,count){
			if(count==0){
				Promise.all([
					ApiService.gdaxCurrencies(),
					ApiService.gdaxProducts()
				]).
				then(response => { 
					ExchangeList.create({name:'gdax',currencies:response[0],products:response[1],date_created: curDateTime},function(err,data){});
				}).
				catch(err => {});
			}
		});
		
		//PROCESS TO INSERT GDAX PRODUCTS TICKERS
		ExchangeList.findOne({name:'gdax'},function(err,data){
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=JSON.parse(data.products);
				return Promise.all(products.map((product) => {
						return ApiService.gdaxTicker(product.id).
						then(ticker => {
							ticker=JSON.parse(ticker);
							ticker.product_id=product.id;
							return ticker;
						}).
						catch(err =>{});
					})).
				then(tickers => {
					var tickers_data=[];	
					_.forEach(tickers,function(ticker){
						if(!_.isEmpty(ticker) && _.isEmpty(ticker.message)){
							tickers_data.push(ticker);
						}
					});
					if(!_.isEmpty(tickers_data)){
						ExchangeTickers.create({exchange_id:exchange_id,tickers:JSON.stringify(tickers_data),date_created:curDateTime},function(err,data){});
					}
				}).
				catch(err=> {});
			}	
		});
		
		//PROCESS TO INSERT GDAX PRODUCTS STATS
		ExchangeList.findOne({name:'gdax'},function(err,data){
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=JSON.parse(data.products);
				return Promise.all(products.map((product) => {
						return ApiService.gdaxStats(product.id).
						then(stat => {
							stat=JSON.parse(stat);
							stat.product_id=product.id;
							return stat;
						}).
						catch(err =>{});
					})).
				then(stats => {
					var stats_data=[];
					_.forEach(stats,function(stat){
						if(!_.isEmpty(stat) && _.isEmpty(stat.message)){
							stats_data.push(stat);
						}
					});
					if(!_.isEmpty(stats_data)){
						ExchangeStats.create({exchange_id:exchange_id,stats:JSON.stringify(stats_data),date_created:curDateTime},function(err,data){});	
					}
				}).
				catch(err=> {});
			}	
		});
		
		//PROCESS TO INSERT BITTREX STATIC DATA
		ExchangeList.count({name: 'bittrex'},function(err,count){
			if(count==0){
				Promise.all([
					ApiService.bittrexCurrencies(),
					ApiService.bittrexProducts()
				]).
				then(response => { 
					ExchangeList.create({name:'bittrex',currencies:response[0],products:response[1],date_created: curDateTime},function(err,data){});
				}).
				catch(err => {});
			}
		});
		
		//PROCESS TO INSERT BITTEX PRODUCTS/MARKETS TICKERS
		var tickers=[];
		ExchangeList.findOne({name:'bittrex'},function(err,data){
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ApiService.bittrexMarketSummaries().then(tickers=>{
					if(_.isEmpty(JSON.parse(tickers).message)){
						ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){});
					}
				}).
				catch(err=>{});
			}	
		});
		
		//PROCESS TO INSERT COINMARKETCAP STATIC DATA
		ExchangeList.count({name: 'coinmarketcap'},function(err,count){
			if(count==0){
				ExchangeList.create({name:'coinmarketcap',currencies:null,products:null,date_created: curDateTime},function(err,data){});
			}
		});
		
		//PROCESS TO INSERT COINMARKETCAP PRODUCTS/MARKETS TICKERS
		var tickers=[];
		ExchangeList.findOne({name:'coinmarketcap'},function(err,data){
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ApiService.coinMarketTicker().then(tickers=>{
					ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){});
				}).
				catch(err=>{});
			}	
		});
		
		//PROCESS TO INSERT BITFINEX STATIC DATA
		ExchangeList.count({name: 'bitfinex'},function(err,count){
			if(count==0){
				Promise.all([
					ApiService.bitfinexProducts()
				]).
				then(response => { 
					ExchangeList.create({name:'bitfinex',currencies:null,products:response,date_created: curDateTime},function(err,data){});
				}).
				catch(err => {});
			}
		});
		
		//PROCESS TO INSERT BITFINEX PRODUCTS/MARKETS TICKERS
		ExchangeList.findOne({name:'bitfinex'},function(err,data){
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				products=JSON.parse(data.products);
				return Promise.all(products.map((product)=>{
					return ApiService.bitFinexTicker(product).then((ticker)=>{
						ticker=JSON.parse(ticker);
						ticker.product_id=product;
						return ticker;
					}).
					catch(err=>{console.log(err);});
				})).
				then(tickers => {
					var tickers_data=[];
					_.forEach(tickers,function(ticker){
						if(!_.isEmpty(ticker) && _.isEmpty(ticker.error)){
							tickers_data.push(ticker);
						}
					});
					if(!_.isEmpty(tickers_data)){
						ExchangeTickers.create({exchange_id:exchange_id,tickers:JSON.stringify(tickers_data),date_created:curDateTime},function(err,data){});
					}
				}).
				catch(err =>{console.log(err);});
			}
		});
		
		//PROCESS TO INSERT HITBTC STATIC DATA
		ExchangeList.count({name: 'hitbtc'},function(err,count){
			if(count==0){
				Promise.all([
					ApiService.hitbtcCurrencies(),
					ApiService.hitbtcProducts()
				]).
				then(response => { 
					ExchangeList.create({name:'hitbtc',currencies:response[0],products:response[1],date_created: curDateTime},function(err,data){});
				}).
				catch(err => {});
			}
		});
		//PROCESS TO INSERT HITBTC PRODUCTS/MARKETS TICKERS
		var tickers=[];
		ExchangeList.findOne({name:'hitbtc'},function(err,data){
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ApiService.hitbtcMarketTicker().then(tickers=>{
					try{
						JSON.parse(tickers);
						ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){});
					}
					catch(e){
						//ERROR IF RESPONSE IS NOT A VALID JSON
					}
				}).
				catch(err=>{});
			}	
		});		
		ApiService.marketData(function(){},'socket');
	}
};
