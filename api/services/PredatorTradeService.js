module.exports = {
	predators_data:function(currencies,callBack){
		var _ = require('lodash');
		if(_.isEmpty(currencies)){
			currencies=[];
		}
		var currencies_temp=currencies;
		ExchangeList.find({select:['id','name'],is_exchange:'yes'},function(err, exchange_list){
			if(_.isEmpty(exchange_list)){exchange_list=[];}
			return Promise.all(exchange_list.map((exchange) => {
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
													if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
														temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.price,exchange:exchange.name,date_created:date_created}});
													}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.Bid,sell:tickers_match.Ask,volume:tickers_match.Volume,ask:tickers_match.Ask,bid:tickers_match.Bid,last:tickers_match.Last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last_price,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.highestBid,sell:tickers_match.lowestAsk,volume:tickers_match.baseVolume,ask:tickers_match.lowestAsk,bid:tickers_match.highestBid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ticker.buy,sell:tickers_match.ticker.sell,volume:tickers_match.ticker.vol,ask:tickers_match.ticker.sell,bid:tickers_match.ticker.buy,last:tickers_match.ticker.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bidPrice,sell:tickers_match.askPrice,volume:tickers_match.volume,ask:tickers_match.askPrice,bid:tickers_match.bidPrice,last:tickers_match.lastPrice,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.tick.bid[0],sell:tickers_match.tick.ask[0],volume:tickers_match.tick.vol,ask:tickers_match.tick.ask[0],bid:tickers_match.tick.bid[0],last:tickers_match.tick.bid[0],exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.vol,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.best_bid,sell:tickers_match.best_ask,volume:tickers_match.volume,ask:tickers_match.best_ask,bid:tickers_match.best_bid,last:tickers_match.best_bid,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy_price,sell:tickers_match.sell_price,volume:tickers_match.volume_1day,ask:tickers_match.sell_price,bid:tickers_match.buy_price,last:tickers_match.buy_price,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'lbank':
									var temp_array=[];
									//AS THERE IS NO ASK/BID OR BUY/SELL DATA HERE
									/*_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ticker.low,sell:tickers_match.ticker.latest,volume:tickers_match.ticker.vol,last:tickers_match.ticker.latest,exchange:exchange.name,date_created:date_created}});
												}
											}
										});
									});*/
									return resolve(temp_array);
									
								break;
								case 'coinone':
									var temp_array=[];
									//AS THERE IS NO ASK/BID OR BUY/SELL DATA HERE
									/*_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.low,sell:tickers_match.last,volume:tickers_match.volume,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
											}
										});
									});*/
									return resolve(temp_array);
								break;
								case 'wex':
									var temp_array=[];
									//AS IT IS A CRAP EXCHANGE
									/*_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
											}
										});
									});*/
									return resolve(temp_array);					
								break;
								case 'exmo':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+'_'+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy_price,sell:tickers_match.sell_price,volume:tickers_match.vol,ask:tickers_match.sell_price,bid:tickers_match.buy_price,last:tickers_match.last_trade,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
													if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
														temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bidPrice,sell:tickers_match.askPrice,volume:tickers_match.totalVolume,ask:tickers_match.askPrice,bid:tickers_match.bidPrice,last:tickers_match.lastPrice,exchange:exchange.name,date_created:date_created}});
													}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.best_bid,sell:tickers_match.best_ask,volume:tickers_match.volume,ask:tickers_match.best_ask,bid:tickers_match.best_bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
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
												if(_.isEmpty(tickers_match.is_old) || tickers_match.is_old=='no'){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
												}
											}
										});
									});
									return resolve(temp_array);
								break;
								default:
									return resolve([]);
								break;
							}
						}
						else{
							return resolve([]);
						}
					}).catch(err => { callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
				});	
			})).
			then(response => {
				var return_array=[];
				
				ExchangeDataService.fxPairList().then(pairs=>{
					_.forEach(response,function(exchange_data){
						_.forEach(exchange_data,function(data){
							if(_.indexOf(pairs.data,data.product)==-1){
								if(_.isEmpty(_.filter(return_array,{product:data.product}))){
									return_array.push({product:data.product,records:[data.record]});
								}
								else{
									_.forEach(return_array,function(return_data){
										if(return_data.product==data.product){
											return_data.records.push(data.record);
											return_data.records.sort(function(a,b){ if(parseFloat(a.sell)>parseFloat(b.sell)){return -1;}else {return 1;}});
										}
									});
								}
							}
						});
					});
					callBack({errCode:1,message:'Request processed successfully.',data:return_array});
				}).catch( err => {});
			}).
			catch(err => { callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
		});	
	},
	
	predator_create_user_token:function(request,callBack){
		var _ = require('lodash');
		var moment=require('moment');
		var user_id=request.param('user_id');
		var currencies=request.param('currencies');
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		
		if(_.isEmpty(user_id)){
			callBack({errCode:300,message:'Invalid user id',token:''});
		}
		else{
			var token = Math.random().toString(36).slice(-8)+user_id;
			PredatorUserTokens.count({user_id:user_id},function(err,count){
				if(err){
					callBack({errCode:500,message:'Server error. Please try again.',token:''});
				}
				if(count>0){
					PredatorUserTokens.update({user_id:user_id},{token:token,currencies:currencies,date_updated:curDateTime},function(err,data){
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.',token:''});
						}
						else{
							callBack({errCode:1,message:'Token updated successfully',token:token});
						}
					});
				}
				else{
					PredatorUserTokens.create({user_id:user_id,token:token,currencies:currencies,date_created:curDateTime,date_updated:curDateTime},function(err,data){
						if(err){ 
							callBack({errCode:500,message:'Server error. Please try again.',token:''});
						}
						else{
							callBack({errCode:1,message:'Token registered successfully',token:token});
						}
					});
				}
			});
		}
	},
	
	predator_update_user_currencies:function(request,callBack){
		var _ = require('lodash');
		var moment=require('moment');
		var user_id=request.param('user_id');
		var currencies=request.param('currencies');
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		if(_.isEmpty(user_id)){
			callBack({errCode:300,message:'Invalid user id'});
		}
		else{
			PredatorUserTokens.count({user_id:user_id},function(err,count){
				if(err){
					callBack({errCode:500,message:'Server error. Please try again.'});
				}
				if(count>0){
					PredatorUserTokens.update({user_id:user_id},{currencies:currencies,date_updated:curDateTime},function(err,data){
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.'});
						}
						else{
							callBack({errCode:1,message:'Currencies updated successfully'});
						}
					});
				}
				else{
					callBack({errCode:300,message:'Invalid user id'});
				}
			});
		}
	}
};
