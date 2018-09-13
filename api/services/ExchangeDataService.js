module.exports = {
	
	gdaxMarketData:function(){
		var _ = require('lodash');
		return new Promise(function(resolve, reject) {
			ExchangeList.findOne({name:'gdax'},function(err, gdaxExchange){
				if(!_.isEmpty(gdaxExchange)){
					var gdaxProducts=gdaxExchange.products;
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
									var gdaxTickers=tickers.tickers;
									_.forEach(gdaxTickers,function(ticker){
										var stat=_.filter(stats.stats,{product_id:ticker.product_id});
										if(!_.isEmpty(stat)){
											stat=_.head(stat);
											ticker.variation=(parseFloat(ticker.price)-parseFloat(stat.open))*100/parseFloat(stat.open);
										}
									});
									
									var trades=ExchangeTrades.findOne();
									trades.where({exchange_id:gdaxExchange.id});
									trades.sort('id DESC');
									trades.exec(function(err, trades){
										if(!_.isEmpty(trades)){
											var gdaxTrades=trades.trades;
											
											_.forEach(gdaxTickers,function(ticker){
												var trade=_.filter(trades.trades,{product_id:ticker.product_id});
												if(!_.isEmpty(trade)){
													trade=_.head(trade);
													trade.data.sort(function(a,b){
														if(parseInt(a.trade_id)>parseInt(b.trade_id)){
															return 1;
														}
														else{
															return -1;
														}
													});
													ticker.chart=_.map(trade.data,function(trading){
														return parseFloat(trading.price);
													});
												}
											});
											
											var temp=[];
											_.forEach(gdaxProducts,function(product){
												var ticker=_.filter(gdaxTickers,{product_id:product.id});
												if(!_.isEmpty(ticker)){
													product.ticker=_.head(ticker);
													temp.push(product);
												}
											});
											gdaxProducts=temp;
											return resolve({name:gdaxExchange.name,url:gdaxExchange.url,is_exchange:gdaxExchange.is_exchange,data:gdaxProducts});
										}
										else{
											return resolve({name:'',url:'',is_exchange:'',data:[]});
										}
									});
								}
								else{
									return resolve({name:'',url:'',is_exchange:'',data:[]});
								}
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});	
	},
	
	bittrexMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bittrex'},function(err, bittrexExchange){
				if(!_.isEmpty(bittrexExchange)){
					var bittrexTickers=ExchangeTickers.findOne();
					bittrexTickers.where({exchange_id:bittrexExchange.id});
					bittrexTickers.sort('id DESC');
					bittrexTickers.exec(function(err,bittrexTickers){
						if(!_.isEmpty(bittrexTickers)){
							bittrexTickers=bittrexTickers.tickers.result;
							bittrexTickers.sort(function(a,b){ if(parseFloat(a.Volume)>parseFloat(b.Volume)){return -1;}else {return 1;}});
							if(count>0){
								bittrexTickers=_.slice(bittrexTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(bittrexTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.BaseCurrency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.BaseCurrency;
									}
								});
								
								return resolve({name:bittrexExchange.name,url:bittrexExchange.url,is_exchange:bittrexExchange.is_exchange,data:bittrexTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});	
		});
	},
	
	coinmarketcapMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'coinmarketcap'},function(err, coinmarketcapExchange){
				if(!_.isEmpty(coinmarketcapExchange)){
					var coinMarketTickers=ExchangeTickers.findOne();
					coinMarketTickers.where({exchange_id:coinmarketcapExchange.id});
					coinMarketTickers.sort('id DESC');
					coinMarketTickers.exec(function(err,coinMarketTickers){
						if(!_.isEmpty(coinMarketTickers)){
							coinMarketTickers=coinMarketTickers.tickers;
							coinMarketTickers.sort(function(a,b){ if(parseFloat(a.market_cap_usd)>parseFloat(b.market_cap_usd)){return -1;}else {return 1;}});
							if(count>0){
								coinMarketTickers=_.slice(coinMarketTickers,0,count);
							}
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(coinMarketTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.symbol)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.symbol;
									}
								});
								return resolve({name:coinmarketcapExchange.name,url:coinmarketcapExchange.url,is_exchange:coinmarketcapExchange.is_exchange,data:coinMarketTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});	
	},
	
	bitfinexMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bitfinex'},function(err, bitfinexExchange){
				if(!_.isEmpty(bitfinexExchange)){
					var bitfinexTickers=ExchangeTickers.findOne();
					bitfinexTickers.where({exchange_id:bitfinexExchange.id});
					bitfinexTickers.sort('id DESC');
					bitfinexTickers.exec(function(err,bitfinexTickers){
						if(!_.isEmpty(bitfinexTickers)){
							bitfinexTickers=bitfinexTickers.tickers;
							bitfinexTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								bitfinexTickers=_.slice(bitfinexTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(bitfinexTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.product_id.substr(0,3))});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.product_id.substr(0,3);
									}
								});
								
								return resolve({name:bitfinexExchange.name,url:bitfinexExchange.url,is_exchange:bitfinexExchange.is_exchange,data:bitfinexTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	hitbtcMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'hitbtc'},function(err, hitbtcExchange){
				if(!_.isEmpty(hitbtcExchange)){
					var hitbtcTickers=ExchangeTickers.findOne();
					hitbtcTickers.where({exchange_id:hitbtcExchange.id});
					hitbtcTickers.sort('id DESC');							
					hitbtcTickers.exec(function(err,hitbtcTickers){
						if(!_.isEmpty(hitbtcTickers)){
							hitbtcTickers=hitbtcTickers.tickers;
							hitbtcTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								hitbtcTickers=_.slice(hitbtcTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(hitbtcTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.baseCurrency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.baseCurrency;
									}
								});
								
								return resolve({name:hitbtcExchange.name,url:hitbtcExchange.url,is_exchange:hitbtcExchange.is_exchange,data:hitbtcTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});	
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});	
	},
	
	gateMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve, reject){
			ExchangeList.findOne({name:'gate'},function(err, gateExchange){
				if(!_.isEmpty(gateExchange)){
					var gateTickers=ExchangeTickers.findOne();
					gateTickers.where({exchange_id:gateExchange.id});
					gateTickers.sort('id DESC');							
					gateTickers.exec(function(err,gateTickers){
						if(!_.isEmpty(gateTickers)){
							gateTickers=gateTickers.tickers;
							gateTickers.sort(function(a,b){ if(parseFloat(a.baseVolume)>parseFloat(b.baseVolume)){return -1;}else {return 1;}});
							if(count>0){
								gateTickers=_.slice(gateTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(gateTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(_.join(_.split(ticker.product,'_',1)))});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=_.join(_.split(ticker.product,'_',1));
									}
								});
								
								return resolve({name:gateExchange.name,url:gateExchange.url,is_exchange:gateExchange.is_exchange,data:gateTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});	
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	kunaMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'kuna'},function(err, kunaExchange){
				if(!_.isEmpty(kunaExchange)){
					var kunaTickers=ExchangeTickers.findOne();
					kunaTickers.where({exchange_id:kunaExchange.id});
					kunaTickers.sort('id DESC');
					kunaTickers.exec(function(err,kunaTickers){
						if(!_.isEmpty(kunaTickers)){
							kunaTickers=kunaTickers.tickers;
							kunaTickers.sort(function(a,b){if(parseFloat(a.vol)>parseFloat(b.vol)){return -1;}else {return 1;}});
							if(count>0){
								kunaTickers=_.slice(kunaTickers,0,count);
							}
							
							return resolve({name:kunaExchange.name,url:kunaExchange.url,is_exchange:kunaExchange.is_exchange,data:kunaTickers});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});	
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	okexMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve, reject) {
			ExchangeList.findOne({name:'okex'},function(err, okexExchange){
				if(!_.isEmpty(okexExchange)){
					var okexProducts=okexExchange.products;
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:okexExchange.id});
					tickers.sort('id DESC');
					tickers.exec(function(err,okexTickers){
						if(!_.isEmpty(okexTickers)){
							var okexTickers=okexTickers.tickers;
							okexTickers.sort(function(a,b){ if(parseFloat(a.ticker.vol)>parseFloat(b.ticker.vol)){return -1;}else{ return 1;}});
							if(count>0){
								okexTickers=_.slice(okexTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(okexTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(_.join(_.split(ticker.product,'_',1)))});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=_.join(_.split(ticker.product,'_',1));
									}
								});
								
								return resolve({name:okexExchange.name,url:okexExchange.url,is_exchange:okexExchange.is_exchange,data:okexTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});	
	},
	
	binanceMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve, reject) {
			ExchangeList.findOne({name:'binance'},function(err, binanceExchange){
				if(!_.isEmpty(binanceExchange)){
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:binanceExchange.id});
					tickers.sort('id DESC');
					tickers.exec(function(err, binanceTickers){
						if(!_.isEmpty(binanceTickers)){
							binanceTickers=binanceTickers.tickers;
							binanceTickers.sort(function(a,b){if(parseFloat(a.volume)>parseFloat(b.volume)){ return -1;}else{ return 1;}});
							if(count>0){
								binanceTickers=_.slice(binanceTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(binanceTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.baseAsset)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.baseAsset;
									}
								});
								return resolve({name:binanceExchange.name,url:binanceExchange.url,is_exchange:binanceExchange.is_exchange,data:binanceTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	huobiMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve, reject){
			ExchangeList.findOne({name:'huobi'}, function(err, huobiExchange){
				if(!_.isEmpty(huobiExchange)){
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:huobiExchange.id});
					tickers.sort('id DESC');
					tickers.exec(function(err, huobiTickers){
						if(!_.isEmpty(huobiTickers)){
							huobiTickers=huobiTickers.tickers;
							huobiTickers.sort(function(a,b){ if(parseFloat(a.tick.vol)>parseFloat(b.tick.vol)){ return -1;}else{ return 1;}});
							if(count>0){
								huobiTickers=_.slice(huobiTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(huobiTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:huobiExchange.name,url:huobiExchange.url,is_exchange:huobiExchange.is_exchange,data:huobiTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	geminiMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve, reject){
			ExchangeList.findOne({name:'gemini'}, function(err, geminiExchange){
				if(!_.isEmpty(geminiExchange)){
					var geminiProducts=geminiExchange.products;
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:geminiExchange.id});
					tickers.sort('id DESC');
					tickers.exec(function(err, geminiTickers){
						if(!_.isEmpty(geminiTickers)){
							geminiTickers=geminiTickers.tickers;
							geminiTickers.sort(function(a,b){if(parseFloat(a.vol)>parseFloat(b.vol)){return -1;}else{ return 1;}});
							if(count>0){
								geminiTickers=_.slice(geminiTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(geminiTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.currency;
									}
								}); 
								return resolve({name:geminiExchange.name,url:geminiExchange.url,is_exchange:geminiExchange.is_exchange,data:geminiTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	krakenMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'kraken'},function(err, krakenExchange){
				if(!_.isEmpty(krakenExchange)){
					var krakenTickers=ExchangeTickers.findOne();
					krakenTickers.where({exchange_id:krakenExchange.id});
					krakenTickers.sort('id DESC');
					krakenTickers.exec(function(err,krakenTickers){
						if(!_.isEmpty(krakenTickers)){
							krakenTickers=krakenTickers.tickers;
							krakenTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								krakenTickers=_.slice(krakenTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(krakenTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:krakenExchange.name,url:krakenExchange.url,is_exchange:krakenExchange.is_exchange,data:krakenTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	bitflyerMarketData:function(count){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bitflyer'},function(err, bitflyerExchange){
				if(!_.isEmpty(bitflyerExchange)){
					var bitflyerTickers=ExchangeTickers.findOne();
					bitflyerTickers.where({exchange_id:bitflyerExchange.id});
					bitflyerTickers.sort('id DESC');
					bitflyerTickers.exec(function(err,bitflyerTickers){
						if(!_.isEmpty(bitflyerTickers)){
							bitflyerTickers=bitflyerTickers.tickers;
							bitflyerTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								bitflyerTickers=_.slice(bitflyerTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(bitflyerTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:bitflyerExchange.name,url:bitflyerExchange.url,is_exchange:bitflyerExchange.is_exchange,data:bitflyerTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	bithumbMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bithumb'},function(err, bithumbExchange){
				if(!_.isEmpty(bithumbExchange)){
					var bithumbTickers=ExchangeTickers.findOne();
					bithumbTickers.where({exchange_id:bithumbExchange.id});
					bithumbTickers.sort('id DESC');
					bithumbTickers.exec(function(err,bithumbTickers){
						if(!_.isEmpty(bithumbTickers)){
							bithumbTickers=bithumbTickers.tickers;
							bithumbTickers.sort(function(a,b){ if(parseFloat(a.volume_1day)>parseFloat(b.volume_1day)){return -1;}else {return 1;}});
							if(count>0){
								bithumbTickers=_.slice(bithumbTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(bithumbTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:bithumbExchange.name,url:bithumbExchange.url,is_exchange:bithumbExchange.is_exchange,data:bithumbTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	bitstampMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bitstamp'},function(err, bitstampExchange){
				if(!_.isEmpty(bitstampExchange)){
					var bitstampTickers=ExchangeTickers.findOne();
					bitstampTickers.where({exchange_id:bitstampExchange.id});
					bitstampTickers.sort('id DESC');
					bitstampTickers.exec(function(err,bitstampTickers){
						if(!_.isEmpty(bitstampTickers)){
							bitstampTickers=bitstampTickers.tickers;
							bitstampTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								bitstampTickers=_.slice(bitstampTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(bitstampTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:bitstampExchange.name,url:bitstampExchange.url,is_exchange:bitstampExchange.is_exchange,data:bitstampTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	bitzMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bitz'},function(err, bitzExchange){
				if(!_.isEmpty(bitzExchange)){
					var bitzTickers=ExchangeTickers.findOne();
					bitzTickers.where({exchange_id:bitzExchange.id});
					bitzTickers.sort('id DESC');
					bitzTickers.exec(function(err,bitzTickers){
						if(!_.isEmpty(bitzTickers)){
							bitzTickers=bitzTickers.tickers;
							bitzTickers.sort(function(a,b){ if(parseFloat(a.vol)>parseFloat(b.vol)){return -1;}else {return 1;}});
							if(count>0){
								bitzTickers=_.slice(bitzTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(bitzTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:bitzExchange.name,url:bitzExchange.url,is_exchange:bitzExchange.is_exchange,data:bitzTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	lbankMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'lbank'},function(err, lbankExchange){
				if(!_.isEmpty(lbankExchange)){
					var lbankTickers=ExchangeTickers.findOne();
					lbankTickers.where({exchange_id:lbankExchange.id});
					lbankTickers.sort('id DESC');
					lbankTickers.exec(function(err,lbankTickers){
						if(!_.isEmpty(lbankTickers)){
							lbankTickers=lbankTickers.tickers;
							lbankTickers.sort(function(a,b){ if(parseFloat(a.ticker.vol)>parseFloat(b.ticker.vol)){return -1;}else {return 1;}});
							if(count>0){
								lbankTickers=_.slice(lbankTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(lbankTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:lbankExchange.name,url:lbankExchange.url,is_exchange:lbankExchange.is_exchange,data:lbankTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	coinoneMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'coinone'},function(err, coinoneExchange){
				if(!_.isEmpty(coinoneExchange)){
					var coinoneTickers=ExchangeTickers.findOne();
					coinoneTickers.where({exchange_id:coinoneExchange.id});
					coinoneTickers.sort('id DESC');
					coinoneTickers.exec(function(err,coinoneTickers){
						if(!_.isEmpty(coinoneTickers)){
							coinoneTickers=coinoneTickers.tickers;
							coinoneTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								coinoneTickers=_.slice(coinoneTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(coinoneTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:coinoneExchange.name,url:coinoneExchange.url,is_exchange:coinoneExchange.is_exchange,data:coinoneTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	wexMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'wex'},function(err, wexExchange){
				if(!_.isEmpty(wexExchange)){
					var wexTickers=ExchangeTickers.findOne();
					wexTickers.where({exchange_id:wexExchange.id});
					wexTickers.sort('id DESC');
					wexTickers.exec(function(err,wexTickers){
						if(!_.isEmpty(wexTickers)){
							wexTickers=wexTickers.tickers;
							wexTickers.sort(function(a,b){ if(parseFloat(a.vol)>parseFloat(b.vol)){return -1;}else {return 1;}});
							if(count>0){
								wexTickers=_.slice(wexTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(wexTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:wexExchange.name,url:wexExchange.url,is_exchange:wexExchange.is_exchange,data:wexTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	exmoMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'exmo'},function(err, exmoExchange){
				if(!_.isEmpty(exmoExchange)){
					var exmoTickers=ExchangeTickers.findOne();
					exmoTickers.where({exchange_id:exmoExchange.id});
					exmoTickers.sort('id DESC');
					exmoTickers.exec(function(err,exmoTickers){
						if(!_.isEmpty(exmoTickers)){
							exmoTickers=exmoTickers.tickers;
							exmoTickers.sort(function(a,b){ if(parseFloat(a.vol)>parseFloat(b.vol)){return -1;}else {return 1;}});
							if(count>0){
								exmoTickers=_.slice(exmoTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(exmoTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:exmoExchange.name,url:exmoExchange.url,is_exchange:exmoExchange.is_exchange,data:exmoTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	liquiMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'liqui'},function(err, liquiExchange){
				if(!_.isEmpty(liquiExchange)){
					var liquiTickers=ExchangeTickers.findOne();
					liquiTickers.where({exchange_id:liquiExchange.id});
					liquiTickers.sort('id DESC');
					liquiTickers.exec(function(err,liquiTickers){
						if(!_.isEmpty(liquiTickers)){
							liquiTickers=liquiTickers.tickers;
							liquiTickers.sort(function(a,b){ if(parseFloat(a.vol)>parseFloat(b.vol)){return -1;}else {return 1;}});
							if(count>0){
								liquiTickers=_.slice(liquiTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(liquiTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:liquiExchange.name,url:liquiExchange.url,is_exchange:liquiExchange.is_exchange,data:liquiTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	korbitMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'korbit'},function(err, korbitExchange){
				if(!_.isEmpty(korbitExchange)){
					var korbitTickers=ExchangeTickers.findOne();
					korbitTickers.where({exchange_id:korbitExchange.id});
					korbitTickers.sort('id DESC');
					korbitTickers.exec(function(err,korbitTickers){
						if(!_.isEmpty(korbitTickers)){
							korbitTickers=korbitTickers.tickers;
							korbitTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								korbitTickers=_.slice(korbitTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(korbitTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:korbitExchange.name,url:korbitExchange.url,is_exchange:korbitExchange.is_exchange,data:korbitTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	bitmexMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'bitmex'},function(err, bitmexExchange){
				if(!_.isEmpty(bitmexExchange)){
					var bitmexTickers=ExchangeTickers.findOne();
					bitmexTickers.where({exchange_id:bitmexExchange.id});
					bitmexTickers.sort('id DESC');
					bitmexTickers.exec(function(err,bitmexTickers){
						if(!_.isEmpty(bitmexTickers)){
							bitmexTickers=bitmexTickers.tickers;
							bitmexTickers.sort(function(a,b){ if(parseFloat(a.totalVolume)>parseFloat(b.totalVolume)){return -1;}else {return 1;}});
							if(count>0){
								bitmexTickers=_.slice(bitmexTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(bitmexTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:bitmexExchange.name,url:bitmexExchange.url,is_exchange:bitmexExchange.is_exchange,data:bitmexTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	livecoinMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'livecoin'},function(err, livecoinExchange){
				if(!_.isEmpty(livecoinExchange)){
					var livecoinTickers=ExchangeTickers.findOne();
					livecoinTickers.where({exchange_id:livecoinExchange.id});
					livecoinTickers.sort('id DESC');
					livecoinTickers.exec(function(err,livecoinTickers){
						if(!_.isEmpty(livecoinTickers)){
							livecoinTickers=livecoinTickers.tickers;
							livecoinTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								livecoinTickers=_.slice(livecoinTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(livecoinTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:livecoinExchange.name,url:livecoinExchange.url,is_exchange:livecoinExchange.is_exchange,data:livecoinTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	cexMarketData:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'cex'},function(err, cexExchange){
				if(!_.isEmpty(cexExchange)){
					var cexTickers=ExchangeTickers.findOne();
					cexTickers.where({exchange_id:cexExchange.id});
					cexTickers.sort('id DESC');
					cexTickers.exec(function(err,cexTickers){
						if(!_.isEmpty(cexTickers)){
							cexTickers=cexTickers.tickers;
							cexTickers.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(count>0){
								cexTickers=_.slice(cexTickers,0,count);
							}
							
							ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(cexTickers,function(ticker){ 
									var full_name=_.filter(full_names.list,{symbol:_.toLower(ticker.base_currency)});
									if(!_.isEmpty(full_name)){
										full_name=_.head(full_name);
										ticker.full_name=full_name.full_name;
									}
									else{
										ticker.full_name=ticker.base_currency;
									}
								}); 
								return resolve({name:cexExchange.name,url:cexExchange.url,is_exchange:cexExchange.is_exchange,data:cexTickers});
							}).
							catch(err => {
								return resolve({name:'',url:'',is_exchange:'',data:[]});
							});
						}
						else{
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						}
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	fxMarketData:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			FxTickers.find().exec(function(err,tickers){
				_.forEach(tickers,function(ticker){
					ticker.base_currency=_.join(_.split(ticker.symbol,'/',1));
					ticker.quote_currency=_.replace(ticker.symbol,ticker.base_currency+'/','');
					ticker.product=_.replace(ticker.symbol,'/','');
				});
				return resolve({name:'',url:'',is_exchange:'',data:tickers});
			});
		});
	},
	
	fxMarketDataRelativePrices:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			FxTickers.find().exec(function(err,tickers){
				_.forEach(tickers,function(ticker){
					ticker.base_currency=_.join(_.split(ticker.symbol,'/',1));
					ticker.quote_currency=_.replace(ticker.symbol,ticker.base_currency+'/','');
					ticker.product=_.replace(ticker.symbol,'/','');
				});
				
				var fx_currencies=[];
				var fx_currencies_prices=[];
				
				_.forEach(tickers,function(fx_ticker){
					fx_currencies.push(fx_ticker.base_currency);
					fx_currencies.push(fx_ticker.quote_currency);
				});
				
				fx_currencies=_.uniq(fx_currencies);
				_.forEach(fx_currencies,function(currency){ 
					var currency_objects=_.filter(tickers,{base_currency:currency});
					if(!_.isEmpty(currency_objects)){
						_.forEach(currency_objects,function(currency_object){
							var quote_currency=currency_object.quote_currency;
							var price=currency_object.bid;
							
							if(_.isEmpty(fx_currencies_prices)){
								fx_currencies_prices.push({currency:currency,prices:[{currency:quote_currency,price:price}]});	
							}
							else{
								var inserted=false;
								_.forEach(fx_currencies_prices,function(fx_currencies_price){
									if(fx_currencies_price.currency==currency){
										fx_currencies_price.prices.push({currency:quote_currency,price:price});
										inserted=true;
									}
								});
								if(!inserted){
									fx_currencies_prices.push({currency:currency,prices:[{currency:quote_currency,price:price}]});	
								}
							}
						});	
					}
					
					var currency_objects=_.filter(tickers,{quote_currency:currency});
					if(!_.isEmpty(currency_objects)){
						_.forEach(currency_objects,function(currency_object){
							var quote_currency=currency_object.base_currency;
							var price=1/currency_object.bid;
							
							if(_.isEmpty(fx_currencies_prices)){
								fx_currencies_prices.push({currency:currency,prices:[{currency:quote_currency,price:price}]});	
							}
							else{
								var inserted=false;
								_.forEach(fx_currencies_prices,function(fx_currencies_price){
									if(fx_currencies_price.currency==currency){
										fx_currencies_price.prices.push({currency:quote_currency,price:price});
										inserted=true;
									}
								});
								if(!inserted){
									fx_currencies_prices.push({currency:currency,prices:[{currency:quote_currency,price:price}]});
								}
							}
						});	
					}
				});
				
				for(var i=0;i<fx_currencies.length;i++){  
					_.forEach(fx_currencies,function(currency){
						var related_currencies=_.difference(fx_currencies,[currency]);
						var check_currency=_.filter(fx_currencies_prices,{currency:currency});
						if(!_.isEmpty(check_currency)){
							check_currency=_.head(check_currency);
							var unrelated_currencies=[];
							
							_.forEach(related_currencies,function(related_currency){
								if(_.isEmpty(_.filter(check_currency.prices,{currency:related_currency}))){
									unrelated_currencies.push(related_currency);
								}
							});
							
							if(!_.isEmpty(unrelated_currencies)){
								_.forEach(unrelated_currencies,function(unrelated_currency){
									var is_assigned=false;
									var temp_array=fx_currencies_prices;
									_.forEach(temp_array,function(lookups){
										if(!is_assigned)
										{
											if(!_.isEmpty(_.filter(lookups.prices,{currency:unrelated_currency}))){
												if(!_.isEmpty(_.filter(check_currency.prices,{currency:lookups.currency}))){
													var price_lookup=_.head(_.filter(lookups.prices,{currency:unrelated_currency}));
													var price_self=_.head(_.filter(check_currency.prices,{currency:lookups.currency}));
													
													_.forEach(fx_currencies_prices,function(assignment){
														if(assignment.currency==currency){
															assignment.prices.push({currency:unrelated_currency,price:(price_self.price*price_lookup.price)});
															is_assigned=true;
														}
													});
												}
											}
										}
									});
									
								});
							}
						}
					});
				}
				return resolve({name:'',url:'',is_exchange:'',data:fx_currencies_prices});
			});
		});
	},
	
	fxPairList:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			var return_array=[];
			FxTickers.find().exec(function(err,tickers){
				_.forEach(tickers,function(ticker){
					var currency1=_.join(_.split(ticker.symbol,'/',1));
					var currency2=_.replace(ticker.symbol,currency1+'/','');
					return_array.push(_.toLower(currency1+'_'+currency2));
					return_array.push(_.toLower(currency2+'_'+currency1));
				});
				return resolve({data:return_array});
			});
		});
	},
	
	encrypt:function(data){
		var crypto = require('crypto');
		var data=JSON.stringify(data);
		
		var alg = 'aes-256-cbc';
		var key = '0123456789abcdefghijklmnopqrstuv';
		var iv = '0123456789ABCDEF';
		var cipher = crypto.createCipheriv(alg, key, iv);
		var encoded = cipher.update(data, 'utf8', 'base64');
		encoded += cipher.final('base64');
		return encoded;
		
		
		/*var key = crypto.createCipher('aes-256-ecb', '123');
		return key.update(data, 'utf8', 'hex') + key.final('hex');*/
	},
	
	decrypt:function(data){
		var crypto = require('crypto');
		var key = crypto.createDecipher('aes-256-ecb','123');
		return key.update(data, 'hex','utf8')+ key.final('utf8');
	},
	
	fixDataBySymbol:function(symbol){
		var _ = require('lodash');
		var moment = require('moment');
		return new Promise(function(resolve,reject){
			TotalCryptoFix.find().limit(1).sort({id:-1}).exec(function(err,totalCryptofix){ 
			//TotalCryptoFix.find().limit(2).sort({id:-1}).exec(function(err,totalCryptofix){ 
				if(!_.isEmpty(totalCryptofix)){ 
					if(totalCryptofix.length==1){
						totalCryptofix=_.head(totalCryptofix);
					}
					else{
						totalCryptofix=totalCryptofix[1];
					}
					
					var now=moment(totalCryptofix.date_created);
					var end=moment();
					var duration = moment.duration(end.diff(now));
					var hours=24;
					var minutes=0;
					var seconds=0;
					if(duration.asHours()<24 && duration.asHours()>0){
						var hours = parseInt(24-duration.asHours());
						var minutes = 60-parseInt(duration.asMinutes())%60;
					}
					
					//SINCE CRON JOB MAY TAKE FEW SECONS/MINUTES TO EXECUTE CODE
					if(hours<10){
						seconds=30;
					}
					
					totalCryptofix.date_created=moment(totalCryptofix.date_created).format('LLLL');
					totalCryptofix.hours=hours;
					totalCryptofix.minutes=minutes;
					totalCryptofix.seconds=seconds;
					totalCryptofix.prices=_.filter(totalCryptofix.prices,{currency:_.toUpper(symbol)});
					return resolve({name:'total cryptos fix price',url:'http://totalcryptos.com',is_exchange:'no',data:totalCryptofix});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	fxDataBySymbol:function(symbol,count){
		var _ = require('lodash');
		var moment = require('moment');
		return new Promise(function(resolve,reject){
			TotalCryptoPricesCurrencies.find().limit(1).sort({id:-1}).exec(function(err,totalCryptofx){ 
				if(!_.isEmpty(totalCryptofx)){ 
					
					totalCryptofx=_.head(totalCryptofx);
					totalCryptofx=totalCryptofx.prices;
					
					totalCryptofx=_.filter(totalCryptofx,{quote_currency:_.toLower(symbol)});
					totalCryptofx.sort(function(a,b){ if(parseFloat(a.price)>parseFloat(b.price)){return -1;}else {return 1;}});
					
					if(count>0){
						totalCryptofx=_.slice(totalCryptofx,0,count);
					}
					return resolve({name:'total cryptos fx price',url:'http://totalcryptos.com',is_exchange:'no',data:totalCryptofx});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	totalCryptoPricesUsd:function(count=0){
		var _ = require('lodash');
		
		return new Promise(function(resolve,reject){
			TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
				if(!_.isEmpty(totalCryptoPrices)){ 
					totalCryptoPrices=_.head(totalCryptoPrices);
					totalCryptoPrices=totalCryptoPrices.prices;
					totalCryptoPrices=_.filter(totalCryptoPrices,{quote_currency:'usd'});
					_.remove(totalCryptoPrices,function(price){ if(_.isEmpty(price.market_cap_usd)){return true;} return false;});
					totalCryptoPrices.sort(function(a,b){ if(parseFloat(a.market_cap_usd)>parseFloat(b.market_cap_usd)){return -1;}else {return 1;}});
					if(count>0){
						totalCryptoPrices=_.slice(totalCryptoPrices,0,count);
					}
					
					ExchangeDataService.currencyFullNames().then(full_names => {
						_.forEach(totalCryptoPrices,function(price){ 
							var full_name=_.filter(full_names.list,{symbol:price.base_currency});
							if(!_.isEmpty(full_name)){
								full_name=_.head(full_name);
								price.full_name=full_name.full_name;
							}
							else{
								price.full_name=price.base_currency;
							}
						});
						return resolve({name:'total cryptos usd price',url:'http://totalcryptos.com',is_exchange:'yes',data:totalCryptoPrices});
					}).
					catch(err => {
						return resolve({name:'',url:'',is_exchange:'',data:[]});
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	totalCryptoPricesPairs:function(count=0){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
				if(!_.isEmpty(totalCryptoPrices)){ 
					totalCryptoPrices=_.head(totalCryptoPrices);
					totalCryptoPrices=totalCryptoPrices.prices;
					totalCryptoPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					if(count>0){
						totalCryptoPrices=_.slice(totalCryptoPrices,0,count);
					}
					
					ExchangeDataService.currencyFullNames().then(full_names => {
						_.forEach(totalCryptoPrices,function(price){ 
							var full_name=_.filter(full_names.list,{symbol:price.base_currency});
							if(!_.isEmpty(full_name)){
								full_name=_.head(full_name);
								price.full_name=full_name.full_name;
							}
							else{
								price.full_name=price.base_currency;
							}
						});
						return resolve({name:'total cryptos pair price',url:'http://totalcryptos.com',is_exchange:'yes',data:totalCryptoPrices});
					}).
					catch(err => {
						return resolve({name:'',url:'',is_exchange:'',data:[]});
					});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
			});
		});
	},
	
	totalcryptonewlisting:function(count=0){
		var _ = require('lodash');
		var moment = require('moment');
		var date_after = moment().subtract(24*30, 'hours').toDate();
		
		return new Promise(function(resolve,reject){
			ExchangeNewCoins.find({ "date_created" : { ">": date_after } }).sort('id ASC').exec(function(err, products){
				if(err){ 
					ApiService.exchangeErrors('totalcryptoprices','query_select',err,'tickers_select',curDateTime);
				}
			
				TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
					if(!_.isEmpty(totalCryptoPrices)){ 
						totalCryptoPrices=_.head(totalCryptoPrices);
						totalCryptoPrices=totalCryptoPrices.prices;
						totalCryptoPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
						
						var new_products=[];
						_.forEach(products,function(row){
							product_list=row.products_new;
							var added_days=moment().diff(moment(row.date_created),'days');
							_.forEach(product_list,function(product){
								switch(row.name){
									case 'gdax':
										new_products.push({product:_.toLower(_.replace(product,'_','')),added:added_days});
									break;
									case 'bittrex':
										new_products.push({product:_.toLower(_.replace(product.MarketName,'-','')),added:added_days});
									break;
									case 'bitfinex':
										new_products.push({product:product,added:added_days});
									break;
									case 'hitbtc':
										new_products.push({product:_.toLower(product.id),added:added_days});
									break;
									case 'gate':
										new_products.push({product:_.toLower(_.replace(product,'_','')),added:added_days});
									break;
									case 'binance':
										new_products.push({product:_.toLower(product.symbol),added:added_days});
									break;
									case 'huobi':
										new_products.push({product:product['base-currency']+product['quote-currency'],added:added_days});
									break;
									case 'gemini':
										new_products.push({product:product,added:added_days});
									break;
									case 'bitflyer':
										if(!_.isEmpty(product.alias)){
											new_products.push({product:_.toLower(_.replace(product.alias,'_','')),added:added_days});
										}
										else{
											new_products.push({product:_.toLower(_.replace(product.product_code,'_','')),added:added_days});
										}
									break;
									case 'lbank':
										new_products.push({product:_.replace(product,'_',''),added:added_days});
									break;
									case 'exmo':
										new_products.push({product:_.toLower(_.replace(product,'_','')),added:added_days});
									break;
									case 'liqui':
										new_products.push({product:_.toLower(_.replace(product,'_','')),added:added_days});
									break;
								}
							});
						});
		
						new_products=_.uniqBy(new_products,'product');
						totalCryptoPrices=_.intersectionBy(totalCryptoPrices, new_products, 'product');
						_.forEach(totalCryptoPrices,function(prices){
							var product=_.filter(new_products,{product:prices.product});
							product=_.head(product);
							prices.added=product.added
						});
						if(count>0){
							totalCryptoPrices=_.slice(totalCryptoPrices,0,count);
						}
						
						ExchangeDataService.currencyFullNames().then(full_names => {
							_.forEach(totalCryptoPrices,function(price){ 
								var full_name=_.filter(full_names.list,{symbol:price.base_currency});
								if(!_.isEmpty(full_name)){
									full_name=_.head(full_name);
									price.full_name=full_name.full_name;
								}
								else{
									price.full_name=price.base_currency;
								}
							});
							return resolve({name:'total cryptos pair price',url:'http://totalcryptos.com',is_exchange:'yes',data:totalCryptoPrices});
						}).
						catch(err => {
							return resolve({name:'',url:'',is_exchange:'',data:[]});
						});
					}
					else{
						return resolve({name:'',url:'',is_exchange:'',data:[]});
					}
				});
			});	
		});
	},
	
	currencyFullNames:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeCurrencyFullNames.findOne({name:'coinmarketcap'},function(err, currencies){
				currencies=_.map(currencies.list.data,function(currency){ return {symbol:_.toLower(currency.symbol),full_name:currency.name};}); 
				return resolve({list:currencies});
			});
		});
	},
	
	totalCryptosPriceHistory:function(time,period){
		var _ = require('lodash');
		var moment = require('moment');
		var date_after = moment().subtract(time, 'hours').toDate();
		return new Promise(function(resolve,reject){
			var totalCryptosPrice=TotalCryptoPrice.find();
			totalCryptosPrice.where({ "date_created" : { ">": date_after } });
			totalCryptosPrice.sort('id ASC');
			totalCryptosPrice.exec(function(err,history){
				var tc100_array=[];
				var tcw100_array=[];
				var market_cap_array=[];
				var temp_array=[];
				var history_array=[];
				if(!_.isEmpty(history)){
					_.forEach(history,function(data){
						
						if(period=='day'){
							tc100_array.push({TC100:data.tc100,time:moment(data.date_created).format('HH a')});
							tcw100_array.push({TCw100:data.tcw100,time:moment(data.date_created).format('HH a')});
							market_cap_array.push({MARKETCAP:data.total_usd_market_cap,time:moment(data.date_created).format('HH a')});
						}
						else if(period=='week'){
							var exists=false;
							_.forEach(temp_array,function(temp){
								if(temp.date==moment(data.date_created).format('DD')){
									exists=true;
									temp.tc100=data.tc100;
									temp.tcw100=data.tcw100;
									temp.total_usd_market_cap=data.total_usd_market_cap;
								}
							});
							if(!exists){
								temp_array.push({date:moment(data.date_created).format('DD'),tc100:data.tc100,tcw100:data.tcw100,total_usd_market_cap:data.total_usd_market_cap,time:moment(data.date_created).format('MMMM Do')});
							}
						}
						
						data.date_created=moment(data.date_created).format('MMMM Do YYYY, h:mm:ss a');
						history_array.push(data);
						
					});
					
					if(period=='week'){
						_.forEach(temp_array,function(temp){
							tc100_array.push({TC100:temp.tc100,time:temp.time});
							tcw100_array.push({TCw100:temp.tcw100,time:temp.time});
							market_cap_array.push({MARKETCAP:temp.total_usd_market_cap,time:temp.time});
						});
					}
				}  
				return resolve({tc100_array:tc100_array,tcw100_array:tcw100_array,market_cap_array:market_cap_array,history_array:history_array});
			});
		});
	},
	
	totalCryptosPrice:function(){ 
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			TotalCryptoPrice.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrice){ 
				if(!_.isEmpty(totalCryptoPrice)){ 
					totalCryptoPrice=_.head(totalCryptoPrice);
					return resolve({tc100:Math.round(totalCryptoPrice.tc100),total_usd_market_cap:Math.round(totalCryptoPrice.total_usd_market_cap),tcw100:Math.round(totalCryptoPrice.tcw100)});
				}
				else{
					return resolve({tc100:0,total_usd_market_cap:0,tcw100:0});
				}
			});
		});
	},
	
	totalCryptoPricesHistorySymbol:function(symbol){
		var _ = require('lodash');
		var moment = require('moment');
		return new Promise(function(resolve,reject){
			TotalCryptoPricesHistory.find().sort({id:-1}).exec(function(err,totalCryptoPricesHistory){ 
				if(!_.isEmpty(totalCryptoPricesHistory)){ 
					var return_array=[];
					_.forEach(totalCryptoPricesHistory,function(history){
						var filter=_.filter(history.prices,{base_currency:symbol});
						if(!_.isEmpty(filter)){
							_.forEach(filter,function(filter_data){
								filter_data.data_date=moment(history.data_date).format('YYYY-MM-DD');
								return_array.push(filter_data);
							});
						}
					});
					return resolve(return_array);
				}
				else{
					return resolve([]);
				}
			});
		});
	},
	
	totalCryptoHistoryChart:function(product){
		var _ = require('lodash');
		var moment = require('moment');
		return new Promise(function(resolve,reject){
			TotalCryptoChartHistory.find().sort({id:-1}).exec(function(err,totalCryptoChart){ 
				if(!_.isEmpty(totalCryptoChart)){ 
					var return_array=[];
					_.forEach(totalCryptoChart,function(history){
						var filter=_.filter(history.prices,{product:product});
						if(!_.isEmpty(filter)){
							filter=_.head(filter);
							filter.data_date=moment(history.data_date).format('YYYY-MM-DD');
							filter.timestamp=moment(history.data_date).unix();
							return_array.push(filter);
						}
					});
					return_array=_.uniqBy(return_array,'data_date');
					return resolve(return_array);
				}
				else{
					return resolve([]);
				}
			});
		});
	},
	
	exchanges_currencies:function(){
		var _ = require('lodash');
		var moment = require('moment');
	
		return new Promise(function(resolve,reject){
			ExchangeList.find({select :['name','is_exchange'],is_exchange:'yes'},function(err, exchanges){
				if(err){ 
					return resolve({exchanges:[],currencies:[]});
				}
				
				_.sortBy(exchanges,[function(exchange) { return exchange.name; }]);
				ExchangeDataService.totalCryptoPricesPairs().then(pairs => {
					var currencies=_.map(pairs.data,'base_currency');
					currencies=_.uniq(currencies);
					currencies.sort();
					return resolve({exchanges:exchanges,currencies:currencies});
				}).catch(err => {return resolve({exchanges:exchanges,currencies:[]});});
			});
		});
	},
	
	ico_data:function(){
		var _ = require('lodash');
		var moment = require('moment');
		return new Promise(function(resolve,reject){
			IcoWatch.find({name:'icowatchlist'}).limit(1).sort({id:-1}).exec(function(err, ico_watch){
				if(!_.isEmpty(ico_watch)){
					ico_watch=_.head(ico_watch);
					return resolve({name:ico_watch.name,url:ico_watch.url,data:ico_watch.data});
				}
				else{
					return resolve({name:'',url:'',data:[]});
				}
			});
		});
	},
	
	rssFid:function(count){
		var _ = require('lodash');
		var Parser = require('rss-parser');
		var parser = new Parser();
		return new Promise(function(resolve,reject){
		
		(async () => {
			try{
				let feed = await parser.parseURL('https://portal.totalcryptos.com/index.php?option=com_easyblog&view=latest&format=feed&type=rss');
				if(count>0){
					feed.items=_.slice(feed.items,0,count);
				}
				return resolve(feed);
			}
			catch(err){
				return resolve([]);
			}
		})();
		});
	}
};
