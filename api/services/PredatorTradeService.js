module.exports = {
	predators_data:function(currencies,callBack){
		var _ = require('lodash');
		if(_.isEmpty(currencies)){
			currencies=[];
		}
		var currencies_temp=currencies;
		return new Promise(function(resolve,reject){
		ExchangeList.find({select:['id','name'],is_exchange:'yes'},function(err, exchange_list){
			console.log("bbb");
			return Promise.all(exchange_list.map((exchange) => {
				console.log("ccc");
				return new Promise(function(resolve,reject){
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:exchange.id});
					tickers.sort('id DESC');
					tickers.then(function(tickers){
						if(!_.isEmpty(tickers)){
							var date_created=tickers.date_created;
							var tickers=tickers.tickers;
							switch(exchange.name){
								case 'gdax':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										var tickers2=_.filter(tickers,{base_currency:_.toUpper(currency)});
										if(!_.isEmpty(tickers2)){
											_.forEach(currencies_temp,function(currency_temp){
												var tickers_match=_.filter(tickers2,{quote_currency:_.toUpper(currency_temp)});
												if(!_.isEmpty(tickers_match)){
													tickers_match=_.head(tickers_match);
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ask,sell:tickers_match.bid,volume:tickers_match.ticker.volume,exchange:exchange.name,date_created:date_created}});
												}
											});
										}
									});
									return resolve(temp_array);
								break;
								case 'bittrex':
									var temp_array=[];
									tickers=tickers.result;
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{MarketName:_.toUpper(currency+'-'+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.Ask,sell:tickers_match.Bid,volume:tickers_match.Volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitfinex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
										var tickers_match=_.filter(tickers,{product_id:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ask,sell:tickers_match.bid,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'hitbtc':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ask,sell:tickers_match.bid,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'gate':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.lowestAsk,sell:tickers_match.highestBid,volume:tickers_match.baseVolume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'kuna':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'okex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ticker.buy,sell:tickers_match.ticker.sell,volume:tickers_match.ticker.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'binance':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.askPrice,sell:tickers_match.bidPrice,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'huobi':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.tick.ask[0],sell:tickers_match.tick.bid[0],volume:tickers_match.tick.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'gemini':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ask,sell:tickers_match.bid,volume:tickers_match.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'kraken':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.low,sell:tickers_match.price,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitflyer':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+'_'+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.best_ask,sell:tickers_match.best_bid,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bithumb':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy_price,sell:tickers_match.sell_price,volume:tickers_match.volume_1day,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;	
								case 'bitstamp':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ask,sell:tickers_match.bid,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitz':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'lbank':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ticker.low,sell:tickers_match.ticker.latest,volume:tickers_match.ticker.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'coinone':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.low,sell:tickers_match.last,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'wex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);					
								break;
								case 'exmo':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+'_'+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy_price,sell:tickers_match.sell_price,volume:tickers_match.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'liqui':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'korbit':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ask,sell:tickers_match.bid,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitmex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												if(!_.isEmpty(tickers_match.askPrice) && !_.isEmpty(tickers_match.bidPrice)){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.askPrice,sell:tickers_match.bidPrice,volume:tickers_match.totalVolume,exchange:exchange.name,date_created:date_created}});
												}
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'livecoin':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.best_ask,sell:tickers_match.best_bid,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'cex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ask,sell:tickers_match.bid,volume:tickers_match.volume,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
							}
						}
					}).catch(err => { console.log(err); callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
				});	
			})).
			then(response => {
				var return_array=[];
				console.log("sdsadasd!!!");
				_.forEach(response,function(exchange_data){
					_.forEach(exchange_data,function(data){
						if(_.isEmpty(_.filter(return_array,{product:data.product}))){
							return_array.push({product:data.product,records:[data.record]});
						}
						else{
							_.forEach(return_array,function(return_data){
								if(return_data.product==data.product){
									return_data.records.push(data.record);
									return_data.records.sort(function(a,b){ if(parseFloat(a.price)>parseFloat(b.price)){return -1;}else {return 1;}});
								}
							});
						}
					});
				});
				callBack({errCode:1,message:'Request processed successfully.',data:return_array});
			}).
			catch(err => {console.log(err);callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
		});	
		});
		console.log("aaaaa");
		callBack({errCode:1,message:'Request processed successfully.',data:'hey!!!!'});
	}
};
