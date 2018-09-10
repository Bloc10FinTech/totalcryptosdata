module.exports = {
	
	tcPrices:function(callBack,request,isInc){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'tcPrices').then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrice.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrice){ 
						if(!_.isEmpty(totalCryptoPrice)){ 
							totalCryptoPrice=_.head(totalCryptoPrice);
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:{tc100:Math.round(totalCryptoPrice.tc100),total_usd_market_cap:Math.round(totalCryptoPrice.total_usd_market_cap),tcw100:Math.round(totalCryptoPrice.tcw100)}}));
							}
							else{
								callBack({errCode:1,message:'Request processed successfully.',data:{tc100:Math.round(totalCryptoPrice.tc100),total_usd_market_cap:Math.round(totalCryptoPrice.total_usd_market_cap),tcw100:Math.round(totalCryptoPrice.tcw100)}});
							}
						}
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	symbolsUSDPrices:function(callBack,request,isInc){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'symbolsUSDPrices').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						if(!_.isEmpty(totalCryptoPrices)){ 
							totalCryptoPrices=_.head(totalCryptoPrices);
							totalCryptoPrices=totalCryptoPrices.prices;
							totalCryptoPrices=_.filter(totalCryptoPrices,{quote_currency:'usd'});
							totalCryptoPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:totalCryptoPrices}));
							}
							else{
								callBack({errCode:1,message:'Request processed successfully.',data:totalCryptoPrices});
							}
						}
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	symbolUSDPrice:function(callBack,request,currency,isInc){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'symbolUSDPrice').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						if(!_.isEmpty(totalCryptoPrices)){ 
							totalCryptoPrices=_.head(totalCryptoPrices);
							totalCryptoPrices=totalCryptoPrices.prices;
							totalCryptoPrice=_.filter(totalCryptoPrices,{base_currency:currency,quote_currency:'usd'});
							if(!_.isEmpty(totalCryptoPrice)){
								totalCryptoPrice=_.head(totalCryptoPrice);
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:totalCryptoPrice}));
								}
								else{
									callBack({errCode:1,message:'Request processed successfully.',data:totalCryptoPrice});
								}
							}
							else{
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
								}
								else{
									callBack({errCode:404,message:'Record not found.',data:[]});
								}
							}
						}
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	productsPrices:function(callBack,request,isInc){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'productsPrices').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						if(!_.isEmpty(productPrices)){ 
							productPrices=_.head(productPrices);
							productPrices=productPrices.prices;
							productPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:productPrices}));
							}
							else{
								callBack({errCode:1,message:'Request processed successfully.',data:productPrices});
							}
						}
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	productPrice:function(callBack,request,product,isInc){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'productPrice').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						if(!_.isEmpty(productPrices)){ 
							productPrices=_.head(productPrices);
							productPrices=productPrices.prices;
							productPrice=_.filter(productPrices,{product:product});
							if(!_.isEmpty(productPrice)){
								productPrice=_.head(productPrice);
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:productPrice}));
								}
								else{
									callBack({errCode:1,message:'Request processed successfully.',data:productPrice});
								}
							}
							else{
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
								}
								else{
									callBack({errCode:404,message:'Record not found.',data:[]});
								}
							}
						}
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	biggestGainers:function(callBack,request,isInc){
		var _ = require('lodash');
		var Promise = require("bluebird");
		MobileApisService.checkUpdateApiCalls(request.ip,'biggestGainers').
		then(response => { 
			if(response){
				return Promise.all([
					MobileApisService.topProductsPrices(callBack,request,false,'internal_call'),
					MobileApisService.topGainersLosers(callBack,request,'',false,'internal_call')
				]).then(response => { 
					if(isInc){
						callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:{products:response[0],gainers:response[1]}}));
					}
					else{
						callBack({errCode:1,message:'Request processed successfully.',data:{products:response[0],gainers:response[1]}});
					}
				}).catch(err => {
					if(isInc){
						callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
					}
					else{
						callBack({errCode:500,message:'Server error. Please try again.',data:[]});
					}
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	topProductsPrices:function(callBack,request,isInc,internal_call=null){
		var _ = require('lodash');
		if(_.isEmpty(internal_call)){
			MobileApisService.checkUpdateApiCalls(request.ip,'topProductsPrices').
			then(response => {
				if(response){
					return new Promise(function(resolve,reject){
						TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
							if(err){
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
								}
								else{
									callBack({errCode:500,message:'Server error. Please try again.',data:[]});
								}
							}
							if(!_.isEmpty(productPrices)){ 
								productPrices=_.head(productPrices);
								productPrices=productPrices.prices;
								productPrices=_.filter(productPrices,{quote_currency:'usd'});
								_.remove(productPrices,function(price){ if(_.isEmpty(price.market_cap_usd)){return true;} return false;});
								productPrices.sort(function(a,b){ if(parseFloat(a.market_cap_usd)>parseFloat(b.market_cap_usd)){return -1;}else {return 1;}});
								productPrices=_.slice(productPrices,0,10);
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:productPrices}));
								}
								else{
									callBack({errCode:1,message:'Request processed successfully.',data:productPrices});
								}
							}
							else{
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
								}
								else{
									callBack({errCode:404,message:'Record not found.',data:[]});
								}
							}
						});
					});
				}
				else{
					if(isInc){
						callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
					}
					else{
						callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
					}
				}
			}).
			catch(err => {
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
				}
				else{
					callBack({errCode:500,message:'Server error. Please try again.',data:[]});
				}
			});
		}
		else{ 
			return new Promise(function(resolve,reject){
				TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
					if(err){
						return [];
					}
					if(!_.isEmpty(productPrices)){ 
						productPrices=_.head(productPrices);
						productPrices=productPrices.prices;
						productPrices=_.filter(productPrices,{quote_currency:'usd'});
						_.remove(productPrices,function(price){ if(_.isEmpty(price.market_cap_usd)){return true;} return false;});
						productPrices.sort(function(a,b){ if(parseFloat(a.market_cap_usd)>parseFloat(b.market_cap_usd)){return -1;}else {return 1;}});
						productPrices=_.slice(productPrices,0,10); 
						return resolve(productPrices);
					}
					else{
						return resolve([]);
					}
				});
			});	
		}
	},
	
	tcHistory24H:function(callBack,request,isInc){
		var _=require('lodash');
		var moment = require('moment');
		var date_after = moment().subtract(24, 'hours').toDate();
		MobileApisService.checkUpdateApiCalls(request.ip,'tcHistory24H').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					
					var totalCryptosPrice=TotalCryptoPrice.find();
					totalCryptosPrice.where({ "date_created" : { ">": date_after } });
					totalCryptosPrice.sort('id ASC');
					totalCryptosPrice.exec(function(err,history){
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						var tc100_array=[];
						var tcw100_array=[];
						var market_cap_array=[];
						if(!_.isEmpty(history)){
							_.forEach(history,function(data){
								tc100_array.push({tc100:data.tc100,timestamp:moment(data.date_created, "YYYY-MM-DD h:i:s").format('X')});
								tcw100_array.push({tcw100:data.tcw100,timestamp:moment(data.date_created, "YYYY-MM-DD h:i:s").format('X')});
								market_cap_array.push({total_usd_market_cap:data.total_usd_market_cap,timestamp:moment(data.date_created, "YYYY-MM-DD h:i:s").format('X')});
							});
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:{tc100_array:tc100_array,tcw100_array:tcw100_array,market_cap_array:market_cap_array}}));
							}
							else{
								callBack({errCode:1,message:'Request processed successfully.',data:{tc100_array:tc100_array,tcw100_array:tcw100_array,market_cap_array:market_cap_array}});
							}
						} 
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}	
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	tcHistory7D:function(callBack,request,isInc){
		var _=require('lodash');
		var moment = require('moment');
		var date_after = moment().subtract(24*7, 'hours').toDate();
		MobileApisService.checkUpdateApiCalls(request.ip,'tcHistory7D').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					
					var totalCryptosPrice=TotalCryptoPrice.find();
					totalCryptosPrice.where({ "date_created" : { ">": date_after } });
					totalCryptosPrice.sort('id ASC');
					totalCryptosPrice.exec(function(err,history){
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						var tc100_array=[];
						var tcw100_array=[];
						var market_cap_array=[];
						if(!_.isEmpty(history)){
							_.forEach(history,function(data){
								tc100_array.push({tc100:data.tc100,timestamp:moment(data.date_created, "YYYY-MM-DD h:i:s").format('X')});
								tcw100_array.push({tcw100:data.tcw100,timestamp:moment(data.date_created, "YYYY-MM-DD h:i:s").format('X')});
								market_cap_array.push({total_usd_market_cap:data.total_usd_market_cap,timestamp:moment(data.date_created, "YYYY-MM-DD h:i:s").format('X')});
							});
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:{tc100_array:tc100_array,tcw100_array:tcw100_array,market_cap_array:market_cap_array}}));
							}
							else{
								callBack({errCode:1,message:'Request processed successfully.',data:{tc100_array:tc100_array,tcw100_array:tcw100_array,market_cap_array:market_cap_array}});
							}
						} 
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}	
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	topGainersLosers:function(callBack,request,time,isInc,internal_call=null){
		var _=require('lodash');
		if(_.isEmpty(internal_call)){
			MobileApisService.checkUpdateApiCalls(request.ip,'topGainersLosers').
			then(response => {
				if(response){
					return new Promise(function(resolve,reject){
						ExchangeList.findOne({name:'coinmarketcap'},function(err, coin_market_exchange){
							if(err){
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
								}
								else{
									callBack({errCode:500,message:'Server error. Please try again.',data:[]});
								}
							}
							if(!_.isEmpty(coin_market_exchange)){
								var tickers=ExchangeTickers.findOne();
								tickers.where({exchange_id:coin_market_exchange.id});
								tickers.sort('id DESC');
								tickers.then(function(tickers){
									var tickers=tickers.tickers;
									if(time=='1h'){
										tickers=_.reject(tickers,{percent_change_1h:null});
										tickers.sort(function(a,b){if(parseFloat(a.percent_change_1h)>parseFloat(b.percent_change_1h)){return -1;}else {return 1;}});
									}
									else if(time=='24h'){
										tickers=_.reject(tickers,{percent_change_24h:null});
										tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
									}
									else if(time=='7d'){
										tickers=_.reject(tickers,{percent_change_7d:null});
										tickers.sort(function(a,b){if(parseFloat(a.percent_change_7d)>parseFloat(b.percent_change_7d)){return -1;}else {return 1;}});
									}
									if(isInc){
										callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:{gainers:_.slice(tickers,0,5),losers:_.slice(tickers.reverse(),0,5)}}));
									}
									else{
										callBack({errCode:1,message:'Request processed successfully.',data:{gainers:_.slice(tickers,0,5),losers:_.slice(tickers.reverse(),0,5)}});
									}
								}).
								catch(err => {
									if(isInc){
										callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
									}
									else{
										callBack({errCode:500,message:'Server error. Please try again.',data:[]});
									}
								});
							}
							else{
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
								}
								else{
									callBack({errCode:404,message:'Record not found.',data:[]});
								}
							}
						});	
					});
				}
				else{
					if(isInc){
						callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
					}
					else{
						callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
					}
				}
			}).
			catch(err => {
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
				}
				else{
					callBack({errCode:500,message:'Server error. Please try again.',data:[]});
				}
			});
		}
		else{	
			return new Promise(function(resolve,reject){
				ExchangeList.findOne({name:'coinmarketcap'},function(err, coin_market_exchange){
					if(err){
						return [];
					}
					if(!_.isEmpty(coin_market_exchange)){
						var tickers=ExchangeTickers.findOne();
						tickers.where({exchange_id:coin_market_exchange.id});
						tickers.sort('id DESC');
						tickers.then(function(tickers){
							var tickers=tickers.tickers;
							tickers=_.reject(tickers,{percent_change_24h:null});
							tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
							return resolve(_.slice(tickers,0,10));
						}).
						catch(err => {return resolve([]);});
					}
					else{
						return resolve([]);
					}
				});	
			});
		}
	},
	
	fixPrice:function(callBack,request,symbol,isInc){
		var _ = require('lodash');
		var moment = require('moment');
		MobileApisService.checkUpdateApiCalls(request.ip,'fixPrice').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoFix.find().limit(2).sort({id:-1}).exec(function(err,totalCryptofix){ 
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						if(!_.isEmpty(totalCryptofix)){ 
							if(totalCryptofix.length==1){
								totalCryptofix=_.head(totalCryptofix);
							}
							else{
								totalCryptofix=totalCryptofix[1];
							}
						
							totalCryptofix.date_created=moment(totalCryptofix.date_created).format('LLLL');
							totalCryptofix.prices=_.filter(totalCryptofix.prices,{currency:_.toUpper(symbol)});
							if(!_.isEmpty(totalCryptofix.prices)){
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:totalCryptofix}));
								}
								else{
									callBack({errCode:1,message:'Request processed successfully.',data:totalCryptofix});
								}
							}
							else{
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
								}
								else{
									callBack({errCode:404,message:'Record not found.',data:[]});
								}
							}
						}
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	fixPrices:function(callBack,request,isInc){
		var _ = require('lodash');
		var moment = require('moment');
		MobileApisService.checkUpdateApiCalls(request.ip,'fixPrice').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoFix.find().limit(2).sort({id:-1}).exec(function(err,totalCryptofix){ 
						if(err){
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
							}
							else{
								callBack({errCode:500,message:'Server error. Please try again.',data:[]});
							}
						}
						if(!_.isEmpty(totalCryptofix)){ 
							if(totalCryptofix.length==1){
								totalCryptofix=_.head(totalCryptofix);
							}
							else{
								totalCryptofix=totalCryptofix[1];
							}
						
							totalCryptofix.date_created=moment(totalCryptofix.date_created).format('LLLL');
							if(!_.isEmpty(totalCryptofix.prices)){
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:totalCryptofix}));
								}
								else{
									callBack({errCode:1,message:'Request processed successfully.',data:totalCryptofix});
								}
							}
							else{
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
								}
								else{
									callBack({errCode:404,message:'Record not found.',data:[]});
								}
							}
						}
						else{
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
					});
				});
			}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});
	},
	
	fixMaster:function(callBack,request){
		var _ = require('lodash');
		var moment = require('moment');
		var Excel = require('exceljs');
		var env = require('dotenv');
		
		MobileApisService.checkUpdateApiCalls(request.ip,'fixMaster').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoFix.find().limit(1).sort({id:-1}).exec(function(err,totalCryptofix){ 
						if(!_.isEmpty(totalCryptofix)){ 
							if(totalCryptofix.length==1){
								totalCryptofix=_.head(totalCryptofix);
							}
							else{
								totalCryptofix=totalCryptofix[1];
							}
							
							var workbook = new Excel.Workbook();
							workbook.views = [
							  {
								x: 0, y: 0, width: 1000, height: 2000,
								firstSheet: 0, activeTab: 0, visibility: 'visible'
							  }
							];
							
							var date_created=moment(totalCryptofix.date_created).format('MM.DD.YYYY');
							_.forEach(totalCryptofix.prices,function(data){
								var worksheet = workbook.addWorksheet(_.toLower(data.currency));
								worksheet.state = 'show';
								
								worksheet.columns = [
									{ header: 'Currency', key: 'currency', width: 40,style: { alignment: { horizontal: 'left' }}},
									{ header: 'Price', key: 'price', width: 40,style: { alignment: { horizontal: 'left' }}},
									{ header: 'Date', key: 'date', width: 40,style: { alignment: { horizontal: 'left' }}}
								];
								
								var date=moment(totalCryptofix.date_created).format('YYYY-MM-DD');
								_.forEach(data.prices,function(price){
									worksheet.addRow({currency: price.currency, price: price.price, date: date});
								});
							});
							
							var tempFilePath = './.tmp/public/BITFIX.'+date_created+'.xlsx';
							var url=(process.env.HOST)+'/BITFIX.'+date_created+'.xlsx';
							workbook.xlsx.writeFile(tempFilePath).then(function() {
								callBack(url);
							}).catch(err => {
								callBack('');
							});
						}
						else{
							callBack('');
						}
					});
				});
			}
			else{
				callBack('');
			}
		}).
		catch(err => {
			callBack('');
		});
	},

	sliderData:function(callBack,request,isInc){
		var _=require('lodash');
		var time=request.param('time');
		var currencies=request.param('currencies');
		if(_.indexOf(['1h','24h','7d'],time)==-1){
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:300,message:'Invalid arguments.',data:[]}));
			}
			else{
				callBack({errCode:300,message:'Invalid arguments.',data:[]});
			}
		}
		else{
			MobileApisService.checkUpdateApiCalls(request.ip,'sliderData').
			then(response => {
				if(response){
					return new Promise(function(resolve,reject){
						ExchangeList.findOne({name:'coinmarketcap'},function(err, coin_market_exchange){
							if(err){
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
								}
								else{
									callBack({errCode:500,message:'Server error. Please try again.',data:[]});
								}
							}
							if(!_.isEmpty(coin_market_exchange)){
								var tickers=ExchangeTickers.findOne();
								tickers.where({exchange_id:coin_market_exchange.id});
								tickers.sort('id DESC');
								tickers.then(function(tickers){
									var tickers=tickers.tickers;
									if(time=='1h'){
										tickers=_.reject(tickers,{percent_change_1h:null});
										tickers.sort(function(a,b){if(parseFloat(a.percent_change_1h)>parseFloat(b.percent_change_1h)){return -1;}else {return 1;}});
									}
									else if(time=='24h'){
										tickers=_.reject(tickers,{percent_change_24h:null});
										tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
									}
									else if(time=='7d'){
										tickers=_.reject(tickers,{percent_change_7d:null});
										tickers.sort(function(a,b){if(parseFloat(a.percent_change_7d)>parseFloat(b.percent_change_7d)){return -1;}else {return 1;}});
									}
									
									if(_.isEmpty(currencies)){
										if(isInc){
											callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:{gainers:_.slice(tickers,0,5),losers:_.slice(tickers.reverse(),0,5)}}));
										}
										else{
											callBack({errCode:1,message:'Request processed successfully.',data:{gainers:_.slice(tickers,0,5),losers:_.slice(tickers.reverse(),0,5)}});
										}
									}
									else{
										var temp=[];
										_.forEach(tickers,function(ticker){
											_.forEach(currencies,function(currency){
												if(_.toUpper(currency)==_.toUpper(ticker.symbol)){
													temp.push(ticker);
												}
											});
										});
										if(isInc){
											callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:temp}));
										}
										else{
											callBack({errCode:1,message:'Request processed successfully.',data:temp});
										}
									}
								}).
								catch(err => {
									if(isInc){
										callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
									}
									else{
										callBack({errCode:500,message:'Server error. Please try again.',data:[]});
									}
								});
							}
							else{
								if(isInc){
									callBack(ExchangeDataService.encrypt({errCode:404,message:'Record not found.',data:[]}));
								}
								else{
									callBack({errCode:404,message:'Record not found.',data:[]});
								}
							}
						});	
					});
				}
				else{
					if(isInc){
						callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
					}
					else{
						callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
					}
				}
			}).
			catch(err => {
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
				}
				else{
					callBack({errCode:500,message:'Server error. Please try again.',data:[]});
				}
			});
		}	
	},
	
	currencyFullNames:function(callBack,request,isInc){
		var _ = require('lodash');
		var moment = require('moment');
		MobileApisService.checkUpdateApiCalls(request.ip,'currencyFullNames').
		then(response => {
			return new Promise(function(resolve,reject){
				ExchangeCurrencyFullNames.findOne({name:'coinmarketcap'},function(err, currencies){
					currencies=_.map(currencies.list.data,function(currency){ return {symbol:_.toLower(currency.symbol),full_name:currency.name};}); 
					if(isInc){
						callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:currencies}));
					}
					else{
						callBack({errCode:1,message:'Request processed successfully.',data:currencies});
					}
				});
			});
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});	
	},
	
	productPriceHistoryChart:function(callBack,product,request,isInc){
		var _ = require('lodash');
		var moment = require('moment');
		
		product=_.toLower(product);
		MobileApisService.checkUpdateApiCalls(request.ip,'productPriceHistoryChart').
		then(response => {
			if(response){
					return new Promise(function(resolve,reject){
						TotalCryptoChartHistory.find().limit(90).sort({id:-1}).exec(function(err,totalCryptoPrices){
							var return_array=[];
							_.forEach(totalCryptoPrices,function(totalCryptoPrice){
								var price=_.filter(totalCryptoPrice.prices,{product:product});
								if(!_.isEmpty(price)){
									price=_.head(price);
									return_array.push({price:price.price,data_date:moment(totalCryptoPrice.data_date).format('YYYY-MM-DD'),product:product});
								}
							});
							return_array=_.uniqBy(return_array,'data_date');
							return_array.sort(function(a,b){if(a.data_date>b.data_date){return -1;}else {return 1;}});
							if(isInc){
								callBack(ExchangeDataService.encrypt({errCode:1,message:'Request processed successfully.',data:return_array}));
							}
							else{
								callBack({errCode:1,message:'Request processed successfully.',data:return_array});
							}
						});
					});
				}
			else{
				if(isInc){
					callBack(ExchangeDataService.encrypt({errCode:300,message:'Api call limit exceeded.',data:[]}));
				}
				else{
					callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
				}
			}
		}).
		catch(err => {
			if(isInc){
				callBack(ExchangeDataService.encrypt({errCode:500,message:'Server error. Please try again.',data:[]}));
			}
			else{
				callBack({errCode:500,message:'Server error. Please try again.',data:[]});
			}
		});	
	},
	
	checkUpdateApiCalls:function(ip_address,api_name){
		var moment = require('moment');
		var _ = require('lodash');
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		var date_after=moment().subtract(1, 'minutes').toDate();
		return new Promise(function(resolve,reject){
			ApiRequestIps.count().where({ip_address:ip_address}).where({api_name:api_name}).where({'date_created':{'>':date_after}}).exec(function(err,count){
				if(count>=10){ 
					return resolve(false);
				}
				else{
					ApiRequestIps.create({ip_address:ip_address,api_name:api_name,date_created:curDateTime},function(err,data){});
					return resolve(true);
				}
			});
		});
	},
	
	userRegistration:function(callBack,request){
		var moment = require('moment');
		var _ = require('lodash');
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		var name=request.param('name');
		var email=request.param('email');
		var password = Math.random().toString(36).slice(-8);
		Auth.create({name:name,email:email,password:password,date_created:curDateTime},function(err, data){
			console.log(data);
			if(err){ console.log(err);
				callBack({errCode:500,message:'Server error. Please try again.'});
			}
			
			//callBack({errCode:1,message:'User registered successfully.'});
		});
	}
};
