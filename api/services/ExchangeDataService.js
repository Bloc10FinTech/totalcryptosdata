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
							return resolve({name:bittrexExchange.name,url:bittrexExchange.url,is_exchange:bittrexExchange.is_exchange,data:bittrexTickers});
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
							return resolve({name:coinmarketcapExchange.name,url:coinmarketcapExchange.url,is_exchange:coinmarketcapExchange.is_exchange,data:coinMarketTickers});
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
							return resolve({name:bitfinexExchange.name,url:bitfinexExchange.url,is_exchange:bitfinexExchange.is_exchange,data:bitfinexTickers});
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
							return resolve({name:hitbtcExchange.name,url:hitbtcExchange.url,is_exchange:hitbtcExchange.is_exchange,data:hitbtcTickers});
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
							return resolve({name:gateExchange.name,url:gateExchange.url,is_exchange:gateExchange.is_exchange,data:gateTickers});
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
							return resolve({name:okexExchange.name,url:okexExchange.url,is_exchange:okexExchange.is_exchange,data:okexTickers});
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
							return resolve({name:binanceExchange.name,url:binanceExchange.url,is_exchange:binanceExchange.is_exchange,data:binanceTickers});
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
							return resolve({name:huobiExchange.name,url:huobiExchange.url,is_exchange:huobiExchange.is_exchange,data:huobiTickers});
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
							return resolve({name:geminiExchange.name,url:geminiExchange.url,is_exchange:geminiExchange.is_exchange,data:geminiTickers});
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
							return resolve({name:krakenExchange.name,url:krakenExchange.url,is_exchange:krakenExchange.is_exchange,data:krakenTickers});
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
							return resolve({name:bitflyerExchange.name,url:bitflyerExchange.url,is_exchange:bitflyerExchange.is_exchange,data:bitflyerTickers});
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
							return resolve({name:bithumbExchange.name,url:bithumbExchange.url,is_exchange:bithumbExchange.is_exchange,data:bithumbTickers});
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
							return resolve({name:bitstampExchange.name,url:bitstampExchange.url,is_exchange:bitstampExchange.is_exchange,data:bitstampTickers});
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
							return resolve({name:bitzExchange.name,url:bitzExchange.url,is_exchange:bitzExchange.is_exchange,data:bitzTickers});
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
							return resolve({name:lbankExchange.name,url:lbankExchange.url,is_exchange:lbankExchange.is_exchange,data:lbankTickers});
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
							return resolve({name:coinoneExchange.name,url:coinoneExchange.url,is_exchange:coinoneExchange.is_exchange,data:coinoneTickers});
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
							return resolve({name:wexExchange.name,url:wexExchange.url,is_exchange:wexExchange.is_exchange,data:wexTickers});
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
							return resolve({name:exmoExchange.name,url:exmoExchange.url,is_exchange:exmoExchange.is_exchange,data:exmoTickers});
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
							return resolve({name:liquiExchange.name,url:liquiExchange.url,is_exchange:liquiExchange.is_exchange,data:liquiTickers});
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
							return resolve({name:korbitExchange.name,url:korbitExchange.url,is_exchange:korbitExchange.is_exchange,data:korbitTickers});
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
							return resolve({name:bitmexExchange.name,url:bitmexExchange.url,is_exchange:bitmexExchange.is_exchange,data:bitmexTickers});
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
							return resolve({name:livecoinExchange.name,url:livecoinExchange.url,is_exchange:livecoinExchange.is_exchange,data:livecoinTickers});
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
							return resolve({name:cexExchange.name,url:cexExchange.url,is_exchange:cexExchange.is_exchange,data:cexTickers});
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
					return resolve({name:'total cryptos usd price',url:'http://totalcryptos.com',is_exchange:'yes',data:totalCryptoPrices});
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
					return resolve({name:'total cryptos pair price',url:'http://totalcryptos.com',is_exchange:'yes',data:totalCryptoPrices});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
				}
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
	
	topTotalCryptoPrices:function(){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,topTotalCryptoPrices){ 
				if(!_.isEmpty(topTotalCryptoPrices)){ 
				
					topTotalCryptoPrices=_.head(topTotalCryptoPrices);
					topTotalCryptoPrices=topTotalCryptoPrices.prices;
					
					topTotalCryptoPrices=_.filter(topTotalCryptoPrices,{quote_currency:'usd'});
					_.remove(topTotalCryptoPrices,function(price){ if(_.isEmpty(price.market_cap_usd)){return true;} return false;});
					
					topTotalCryptoPrices.sort(function(a,b){ if(parseFloat(a.market_cap_usd)>parseFloat(b.market_cap_usd)){return -1;}else {return 1;}});
					topTotalCryptoPrices=_.slice(topTotalCryptoPrices,0,10);
					return resolve({name:'top total cryptos prices',url:'http://totalcryptos.com',is_exchange:'yes',data:topTotalCryptoPrices});
				}
				else{
					return resolve({name:'',url:'',is_exchange:'',data:[]});
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
	}
};
