module.exports = {
	socketData:function(){
		var _ = require('lodash');
		var Promise = require("bluebird");
		
		return Promise.all([
			ExchangeDataService.gdaxMarketData(),
			ExchangeDataService.bittrexMarketData(),
			ExchangeDataService.coinmarketcapMarketData(),
			ExchangeDataService.bitfinexMarketData(),
			ExchangeDataService.hitbtcMarketData(),
			ExchangeDataService.gateMarketData(),
			ExchangeDataService.kunaMarketData(),
			ExchangeDataService.okexMarketData(),
			ExchangeDataService.binanceMarketData(),
			ExchangeDataService.huobiMarketData(),
			ExchangeDataService.geminiMarketData(),
			ExchangeDataService.krakenMarketData(),
			ExchangeDataService.bitflyerMarketData(),
			ExchangeDataService.bithumbMarketData(),
			ExchangeDataService.bitstampMarketData(),
			ExchangeDataService.bitzMarketData(),
			ExchangeDataService.lbankMarketData(),
			ExchangeDataService.coinoneMarketData(),
			ExchangeDataService.wexMarketData(),
			ExchangeDataService.exmoMarketData(),
			ExchangeDataService.liquiMarketData(),
			ExchangeDataService.korbitMarketData(),
			ExchangeDataService.bitmexMarketData(),
			ExchangeDataService.livecoinMarketData(),
			ExchangeDataService.cexMarketData(),
			ExchangeDataService.totalCryptoPricesUsd(),
			ExchangeDataService.totalCryptoPricesPairs(),
			ExchangeDataService.totalCryptosPrice(),
			ExchangeDataService.totalCryptoPricesUsd(10),
			FrontendService.gainers_and_losers(10),
			FrontendService.RSS()
					]
		).then(response => { 
			sails.sockets.blast('exchangeData',{gdax:response[0].data,bittrex:response[1].data, coinmarket:response[2].data,bitfinex:response[3].data,hitbtc:response[4].data,gate:response[5].data,kuna:response[6].data,okex:response[7].data,binance:response[8].data,huobi:response[9].data,gemini:response[10].data,kraken:response[11].data,bitflyer:response[12].data,bithumb:response[13].data,bitstamp:response[14].data,bitz:response[15].data,lbank:response[16].data,coinone:response[17].data,wex:response[18].data,exmo:response[19].data,liqui:response[20].data,korbit:response[21].data,bitmex:response[22].data,livecoin:response[23].data,cex:response[24].data,totalcryptospriceusd:response[25].data,totalcryptospricepairs:response[26].data,cryptoData:response[27],topproducts:response[28].data,gainers_losers:response[29].gainers_losers,rss:response[30]});
		}).
		catch(err => { 
			//NO NEED TO SEND SOCKET DATA IN THIS CASE
		});
	},
	
	headerFooterData:function(callBack){
		return Promise.all([
			ExchangeDataService.gdaxMarketData(),
			ExchangeDataService.totalCryptosPrice(),
			ExchangeDataService.totalCryptoPricesUsd(10),
			FrontendService.RSS()
					]
		).then(response => { 
			callBack({gdax:response[0].data,cryptoData:response[1],topproducts:response[2].data,rss:response[3]});
		}).
		catch(err => { 
			callBack({gdax:[],cryptoData:[],topproducts:[],rss:[]});
		});
	},
	
	tabData:function(tab,callBack,count){
		switch(tab){
			case 'totalcryptospriceusd':
				return Promise.all([
					ExchangeDataService.totalCryptoPricesUsd(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			case 'totalcryptospricepairs':
				return Promise.all([
					ExchangeDataService.totalCryptoPricesPairs(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			case 'totalcryptosall':
				return Promise.all([
					ExchangeDataService.totalCryptoPricesPairs()
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			case 'totalcryptonewlisting':
				return Promise.all([
					ExchangeDataService.totalcryptonewlisting()
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			case 'coin':
				return Promise.all([
					ExchangeDataService.coinmarketcapMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'bittrex':
				return Promise.all([
					ExchangeDataService.bittrexMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'bitfinex':
				return Promise.all([
					ExchangeDataService.bitfinexMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'hitbtc':
				return Promise.all([
					ExchangeDataService.hitbtcMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'gate':
				return Promise.all([
					ExchangeDataService.gateMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'kuna':
				return Promise.all([
					ExchangeDataService.kunaMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'okex':
				return Promise.all([
					ExchangeDataService.okexMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'binance':
				return Promise.all([
					ExchangeDataService.binanceMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'huobi':
				return Promise.all([
					ExchangeDataService.huobiMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'gemini':
				return Promise.all([
					ExchangeDataService.geminiMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'kraken':
				return Promise.all([
					ExchangeDataService.krakenMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'bitflyer':
				return Promise.all([
					ExchangeDataService.bitflyerMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'bithumb':
				return Promise.all([
					ExchangeDataService.bithumbMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'bitstamp':
				return Promise.all([
					ExchangeDataService.bitstampMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'bitz':
				return Promise.all([
					ExchangeDataService.bitzMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'lbank':
				return Promise.all([
					ExchangeDataService.lbankMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'coinone':
				return Promise.all([
					ExchangeDataService.coinoneMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'wex':
				return Promise.all([
					ExchangeDataService.wexMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'exmo':
				return Promise.all([
					ExchangeDataService.exmoMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'liqui':
				return Promise.all([
					ExchangeDataService.liquiMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'korbit':
				return Promise.all([
					ExchangeDataService.korbitMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});	
			break;
			case 'bitmex':
				return Promise.all([
					ExchangeDataService.bitmexMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			case 'livecoin':
				return Promise.all([
					ExchangeDataService.livecoinMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			case 'cex':
				return Promise.all([
					ExchangeDataService.cexMarketData(count)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			default:
				callBack([]);
			break;
		}
	},
	
	fixData:function(type,symbol,callBack){
		switch(type){
			case 'databysymbol':
				return Promise.all([
					ExchangeDataService.fixDataBySymbol(symbol)
				]).then(response => {callBack(response[0].data);}).catch( err => {callBack([]);});
			break;
			default:
				callBack([]);
			break;	
		}
	},
	
	gainersLosers:function(callBack,count){
		return Promise.all([
			FrontendService.gainers_and_losers(count),
			ExchangeDataService.fxMarketData(count)
		]).then(response => {callBack({gainers:response[0].gainers_losers['gainer_24_h'],losers:response[0].gainers_losers['loser_24_h'],fx_data:response[1].data});}).catch( err => {callBack({gainers:[],losers:[],fx_data:[]});});
	},
	
	gainers_and_losers_data:function(callBack){
		return Promise.all([
			FrontendService.gainers_and_losers(),
		]).then(response => {callBack({gainers_1h:response[0].gainers_losers['gainer_1_h'],gainers_24h:response[0].gainers_losers['gainer_24_h'],gainers_7d:response[0].gainers_losers['gainer_7_d'],losers_1h:response[0].gainers_losers['loser_1_h'],losers_24h:response[0].gainers_losers['loser_24_h'],losers_7d:response[0].gainers_losers['loser_7_d']});}).catch( err => {callBack({gainers_1h:[],gainers_24h:[],gainers_7d:[],losers_1h:[],losers_24h:[],losers_7d:[]});});
	},
	
	gainers_data:function(callBack){
		return Promise.all([
			FrontendService.gainers_and_losers(),
		]).then(response => {callBack({gainers_1h:response[0].gainers_losers['gainer_1_h'],gainers_24h:response[0].gainers_losers['gainer_24_h'],gainers_7d:response[0].gainers_losers['gainer_7_d']});}).catch( err => {callBack({gainers_1h:[],gainers_24h:[],gainers_7d:[]});});
	},
	
	losers_data:function(callBack){
		return Promise.all([
			FrontendService.gainers_and_losers(),
		]).then(response => {callBack({losers_1h:response[0].gainers_losers['loser_1_h'],losers_24h:response[0].gainers_losers['loser_24_h'],losers_7d:response[0].gainers_losers['loser_7_d']});}).catch( err => {callBack({losers_1h:[],losers_24h:[],losers_7d:[]});});
	},

	volume_24_hour_currency_data:function(callBack){
		var _ = require('lodash');
		
		ExchangeList.find({},function(err, currencies){
			if(!_.isEmpty(currencies)){
				var exchange_array=[];
				_.forEach(currencies,function(currency){
					exchange_array.push({id:currency.id,name:currency.name,is_exchange:currency.is_exchange});
				});
				
				return Promise.all(exchange_array.map((exchange)=>{
					var exchange_data_array=[];
					switch(exchange.name){
						case 'gdax':
							return ExchangeDataService.gdaxMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.display_name,'/','')),volume:data.ticker.volume,price:data.ticker.price,variation:data.ticker.variation});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bittrex':
							return ExchangeDataService.bittrexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.BaseCurrency),pair:_.toUpper(_.replace(data.MarketName,'-','')),volume:data.Volume,price:data.Bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
						
						case 'bitfinex':
							return ExchangeDataService.bitfinexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.product_id.substr(0,3)),pair:_.toUpper(data.product_id),volume:data.volume,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
			
						case 'hitbtc':
							return ExchangeDataService.hitbtcMarketData().
							then(exchange_data => { 
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.baseCurrency),pair:_.toUpper(data.symbol),volume:data.volume,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
			
						case 'gate':
							return ExchangeDataService.gateMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.baseVolume,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
						
						case 'coinmarketcap':
							return ExchangeDataService.coinmarketcapMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.symbol),pair:_.toUpper(data.symbol+'USD'),volume:data['24h_volume_usd'],price:data.price_usd,variation:data.percent_change_24h});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'okex':
							return ExchangeDataService.okexMarketData().
							then(exchange_data => { 
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.ticker.vol,price:data.ticker.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'binance':
							return ExchangeDataService.binanceMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.baseAsset),pair:_.toUpper(data.symbol),volume:data.volume,price:data.lastPrice,variation:data.priceChangePercent});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'huobi':
							return ExchangeDataService.huobiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.tick.vol,price:data.tick.bid[0],variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;

						case 'gemini':
							return ExchangeDataService.geminiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.currency),pair:_.toUpper(data.product),volume:data.vol,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;

						case 'kraken':
							return ExchangeDataService.krakenMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.price,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;

						case 'bitflyer':
							return ExchangeDataService.bitflyerMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.best_bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;	
						
						case 'bithumb':
							return ExchangeDataService.bithumbMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume_1day,price:data.sell_price,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitstamp':
							return ExchangeDataService.bitstampMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitz':
							return ExchangeDataService.bitzMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.sell,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'lbank':
							return ExchangeDataService.lbankMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.ticker.vol,price:data.ticker.latest,variation:data.ticker.change});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'coinone':
							return ExchangeDataService.coinoneMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'wex':
							return ExchangeDataService.wexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'exmo':
							return ExchangeDataService.exmoMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last_trade,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'liqui':
							return ExchangeDataService.liquiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'korbit':
							return ExchangeDataService.korbitMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.last,variation:data.changePercent});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitmex':
							return ExchangeDataService.bitmexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.totalVolume,price:data.settledPrice,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'livecoin':
							return ExchangeDataService.livecoinMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'cex':
							return ExchangeDataService.cexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
			
						default:
							exchange.data=[];
							return exchange;
					}
				})).
				then(response_data =>{
					var temp_array=[];
					var return_array=[];
					_.forEach(response_data,function(exchange_data){
						if(!_.isEmpty(exchange_data.data)){
							temp_array.push(exchange_data);
						}
					});
					
					_.forEach(temp_array,function(exchange_data){
						_.forEach(exchange_data.data,function(coins){
							var exists=false;
							_.forEach(return_array,function(currency_data){
								if(currency_data.currency==coins.currency){
									_.forEach(currency_data.data,function(source){
										if(source.currency==_.replace(coins.pair,coins.currency,'') && source.src==_.toUpper(exchange_data.name)){
											exists=true;
										}
									});
								}
							});
							
							if(!exists){
								var is_updated=false;
								_.forEach(return_array,function(currency_data){
									if(currency_data.currency==coins.currency){
										currency_data.data.push({price:coins.price,volume:coins.volume,currency:_.replace(coins.pair,coins.currency,''),src:_.toUpper(exchange_data.name)});
										is_updated=true;
									}
								});
								
								if(!is_updated){
									var temp=[];
									temp.push({price:coins.price,volume:coins.volume,currency:_.replace(coins.pair,coins.currency,''),src:_.toUpper(exchange_data.name)});
									return_array.push({currency:coins.currency,data:temp});
								}
							}
						});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					_.forEach(return_array,function(currencies){
						currencies.data.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					});
					
					callBack({currency:return_array});
				}).
				catch(err => { callBack({currency:[]});});
			}
		});
	},
	
	volume_24_hour_currency_symbol_data(symbol,callBack){
		var _ = require('lodash');
		symbol=_.toLower(symbol);
		return Promise.all([
			ExchangeDataService.totalCryptoPricesHistorySymbol(symbol)
		]).
		then(response => {
			ExchangeList.find({},function(err, currencies){
				if(!_.isEmpty(currencies)){
					var exchange_array=[];
					_.forEach(currencies,function(currency){
						exchange_array.push({id:currency.id,name:currency.name,is_exchange:currency.is_exchange});
					});
					
					return Promise.all(exchange_array.map((exchange)=>{
						var exchange_data_array=[];
						switch(exchange.name){
							case 'gdax':
								return ExchangeDataService.gdaxMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.display_name,'/','')),volume:data.ticker.volume,price:data.ticker.price,variation:data.ticker.variation});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'bittrex':
								return ExchangeDataService.bittrexMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.BaseCurrency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.BaseCurrency),pair:_.toUpper(_.replace(data.MarketName,'-','')),volume:data.Volume,price:data.Bid,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => { exchange.data=[];return exchange;});
							break;
							
							case 'bitfinex':
								return ExchangeDataService.bitfinexMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.product_id.substr(0,3))==symbol){
											exchange_data_array.push({currency:_.toUpper(data.product_id.substr(0,3)),pair:_.toUpper(data.product_id),volume:data.volume,price:data.bid,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => { exchange.data=[];return exchange;});
							break;
				
							case 'hitbtc':
								return ExchangeDataService.hitbtcMarketData().
								then(exchange_data => { 
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.baseCurrency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.baseCurrency),pair:_.toUpper(data.symbol),volume:data.volume,price:data.bid,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => { exchange.data=[];return exchange;});
							break;
				
							case 'gate':
								return ExchangeDataService.gateMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(_.join(_.split(data.product,'_',1)))==symbol){
											exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.baseVolume,price:data.last,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => { exchange.data=[];return exchange;});
							break;
							
							case 'coinmarketcap':
								return ExchangeDataService.coinmarketcapMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.symbol)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.symbol),pair:_.toUpper(data.symbol+'USD'),volume:data['24h_volume_usd'],price:data.price_usd,variation:data.percent_change_24h});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'okex':
								return ExchangeDataService.okexMarketData().
								then(exchange_data => { 
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(_.join(_.split(data.product,'_',1)))==symbol){
											exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.ticker.vol,price:data.ticker.last,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'binance':
								return ExchangeDataService.binanceMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.baseAsset)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.baseAsset),pair:_.toUpper(data.symbol),volume:data.volume,price:data.lastPrice,variation:data.priceChangePercent});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'huobi':
								return ExchangeDataService.huobiMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.tick.vol,price:data.tick.bid[0],variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'gemini':
								return ExchangeDataService.geminiMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.currency),pair:_.toUpper(data.product),volume:data.vol,price:data.bid,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'kraken':
								return ExchangeDataService.krakenMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.price,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'bitflyer':
								return ExchangeDataService.bitflyerMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.best_bid,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'bithumb':
								return ExchangeDataService.bithumbMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume_1day,price:data.sell_price,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'bitstamp':
								return ExchangeDataService.bitstampMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'bitz':
								return ExchangeDataService.bitzMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.sell,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'lbank':
								return ExchangeDataService.lbankMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.ticker.vol,price:data.ticker.latest,variation:data.ticker.change});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'coinone':
								return ExchangeDataService.coinoneMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'wex':
								return ExchangeDataService.wexMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'exmo':
								return ExchangeDataService.exmoMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last_trade,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'liqui':
								return ExchangeDataService.liquiMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'korbit':
								return ExchangeDataService.korbitMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.last,variation:data.changePercent});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'bitmex':
								return ExchangeDataService.bitmexMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.totalVolume,price:data.settledPrice,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'livecoin':
								return ExchangeDataService.livecoinMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
							
							case 'cex':
								return ExchangeDataService.cexMarketData().
								then(exchange_data => {
									_.forEach(exchange_data.data,function(data){
										if(_.toLower(data.base_currency)==symbol){
											exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
										}
									});
									exchange.data=exchange_data_array;
									return exchange;
								}).
								catch(err => {exchange.data=[];return exchange;});
							break;
				
							default:
								exchange.data=[];
								return exchange;
						}
					})).
					then(symbol_response =>{
						var temp_array=[];
						var return_array=[];
						_.forEach(symbol_response,function(exchange_data){
							if(!_.isEmpty(exchange_data.data)){
								temp_array.push(exchange_data);
							}
						});
						
						_.forEach(temp_array,function(exchange_data){
							_.forEach(exchange_data.data,function(coins){
								var exists=false;
								_.forEach(return_array,function(currency_data){
									if(currency_data.currency==coins.currency){
										_.forEach(currency_data.data,function(source){
											if(source.currency==_.replace(coins.pair,coins.currency,'') && source.src==_.toUpper(exchange_data.name)){
												exists=true;
											}
										});
									}
								});
								
								if(!exists){
									var is_updated=false;
									_.forEach(return_array,function(currency_data){
										if(currency_data.currency==coins.currency){
											currency_data.data.push({price:coins.price,volume:coins.volume,currency:_.replace(coins.pair,coins.currency,''),src:_.toUpper(exchange_data.name)});
											is_updated=true;
										}
									});
									
									if(!is_updated){
										var temp=[];
										temp.push({price:coins.price,volume:coins.volume,currency:_.replace(coins.pair,coins.currency,''),src:_.toUpper(exchange_data.name)});
										return_array.push({currency:coins.currency,data:temp});
									}
								}
							});
						});
						
						//SORT DATA IN DESC ORDER OF VOLUME
						_.forEach(return_array,function(currencies){
							currencies.data.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
						});
						
						callBack({markets:return_array,history:response[0],currency:symbol});
					}).
					catch(err => { callBack({markets:[],history:response[0],currency:symbol});});
				}
			});
		}).
		catch(err => { callBack({markets:[],history:[],currency:symbol});});		
	},
	
	volume_24_hour_market_data:function(market,callBack){
		var _ = require('lodash');
		market=_.toLower(market);

		ExchangeList.find({},function(err, exchanges){
			if(!_.isEmpty(exchanges)){
				var exchange_array=[];
				_.forEach(exchanges,function(exchange){
					exchange_array.push({id:exchange.id,name:exchange.name,is_exchange:exchange.is_exchange});
				});
				
				return Promise.all(exchange_array.map((exchange)=>{
					var exchange_data_array=[];
					switch(exchange.name){
						case 'gdax':
							return ExchangeDataService.gdaxMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.display_name,'/',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.display_name,'/','')),volume:data.ticker.volume,price:data.ticker.price,variation:data.ticker.variation});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bittrex':
							return ExchangeDataService.bittrexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.MarketName,'-',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.MarketName,'-','')),volume:data.Volume,price:data.Bid,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
						
						case 'bitfinex':
							return ExchangeDataService.bitfinexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product_id)==market){
										exchange_data_array.push({market:_.toUpper(data.product_id),volume:data.volume,price:data.bid,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
			
						case 'hitbtc':
							return ExchangeDataService.hitbtcMarketData().
							then(exchange_data => { 
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.symbol)==market){
										exchange_data_array.push({market:_.toUpper(data.symbol),volume:data.volume,price:data.bid,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
			
						case 'gate':
							return ExchangeDataService.gateMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.baseVolume,price:data.last,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
						
						case 'coinmarketcap':
							return ExchangeDataService.coinmarketcapMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.symbol+'usd')==symbol){
										exchange_data_array.push({market:_.toUpper(data.symbol+'usd'),volume:data['24h_volume_usd'],price:data.price_usd,variation:data.percent_change_24h});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'kuna':
							return ExchangeDataService.kunaMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){ 
									if(_.toLower(data.product)==market){ 
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.vol,price:data.price,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;

						case 'okex':
							return ExchangeDataService.okexMarketData().
							then(exchange_data => { 
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.ticker.vol,price:data.ticker.last,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;

						case 'binance':
							return ExchangeDataService.binanceMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.symbol)==market){
										exchange_data_array.push({market:_.toUpper(data.symbol),volume:data.volume,price:data.lastPrice,variation:data.priceChangePercent});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;	
						
						case 'huobi':
							return ExchangeDataService.huobiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.tick.vol,price:data.tick.bid[0],variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'gemini':
							return ExchangeDataService.geminiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.vol,price:data.bid,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'kraken':
							return ExchangeDataService.krakenMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.volume,price:data.price,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitflyer':
							return ExchangeDataService.bitflyerMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.best_bid,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bithumb':
							return ExchangeDataService.bithumbMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.volume_1day,price:data.sell_price,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitstamp':
							return ExchangeDataService.bitstampMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitz':
							return ExchangeDataService.bitzMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.sell,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'lbank':
							return ExchangeDataService.lbankMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.symbol,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.symbol,'_','')),volume:data.ticker.vol,price:data.ticker.latest,variation:data.ticker.change});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'coinone':
							return ExchangeDataService.coinoneMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'wex':
							return ExchangeDataService.wexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'exmo':
							return ExchangeDataService.exmoMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last_trade,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'liqui':
							return ExchangeDataService.liquiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'korbit':
							return ExchangeDataService.korbitMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.product,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.last,variation:data.changePercent});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitmex':
							return ExchangeDataService.bitmexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(_.replace(data.symbol,'_',''))==market){
										exchange_data_array.push({market:_.toUpper(_.replace(data.symbol,'_','')),volume:data.totalVolume,price:data.settledPrice,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'livecoin':
							return ExchangeDataService.livecoinMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'cex':
							return ExchangeDataService.cexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									if(_.toLower(data.product)==market){
										exchange_data_array.push({market:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
									}
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
			
						default:
							exchange.data=[];
							return exchange;
					}
				})).
				then(market_response =>{
					var temp_array=[];
					var return_array=[];
					_.forEach(market_response,function(exchange_data){
						if(!_.isEmpty(exchange_data.data)){
							temp_array.push(exchange_data);
						}
					});
					
					_.forEach(temp_array,function(exchange_data){
						_.forEach(exchange_data.data,function(markets){
							var exists=false;
							_.forEach(return_array,function(market_data){
								if(market_data.market==markets.market){
									_.forEach(market_data.data,function(source){
										if(source.src==_.toUpper(exchange_data.name)){
											exists=true;
										}
									});
								}
							});
							
							if(!exists){
								var is_updated=false;
								_.forEach(return_array,function(market_data){
									if(market_data.market==markets.market){
										market_data.data.push({price:markets.price,volume:markets.volume,src:_.toUpper(exchange_data.name)});
										is_updated=true;
									}
								});
								
								if(!is_updated){
									var temp=[];
									temp.push({price:markets.price,volume:markets.volume,src:_.toUpper(exchange_data.name)});
									return_array.push({market:markets.market,data:temp});
								}
							}
						});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					_.forEach(return_array,function(markets){
						markets.data.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					});
					
					callBack({market:return_array});
				}).
				catch(err => { callBack({market:[]});});
			}
		});	
	},
	
	volume_24_hour_exchange_data:function(callBack){
		var _ = require('lodash');
	
		ExchangeList.find({},function(err, exchanges){
			if(!_.isEmpty(exchanges)){
				var exchange_array=[];
				_.forEach(exchanges,function(exchange){
					exchange_array.push({id:exchange.id,name:exchange.name,is_exchange:exchange.is_exchange});
				});
				
				return Promise.all(exchange_array.map((exchange)=>{
					var exchange_data_array=[];
					switch(exchange.name){
						case 'gdax':
							return ExchangeDataService.gdaxMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.display_name,'/','')),volume:data.ticker.volume,price:data.ticker.price,variation:data.ticker.variation});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bittrex':
							return ExchangeDataService.bittrexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.BaseCurrency),pair:_.toUpper(_.replace(data.MarketName,'-','')),volume:data.Volume,price:data.Bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
						
						case 'bitfinex':
							return ExchangeDataService.bitfinexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.product_id.substr(0,3)),pair:_.toUpper(data.product_id),volume:data.volume,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
			
						case 'hitbtc':
							return ExchangeDataService.hitbtcMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.baseCurrency),pair:_.toUpper(data.symbol),volume:data.volume,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
			
						case 'gate':
							return ExchangeDataService.gateMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.baseVolume,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => { exchange.data=[];return exchange;});
						break;
						
						case 'coinmarketcap':
							return ExchangeDataService.coinmarketcapMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.symbol),pair:_.toUpper(data.symbol+'USD'),volume:data['24h_volume_usd'],price:data.price_usd,variation:data.percent_change_24h});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'okex':
							return ExchangeDataService.okexMarketData().
							then(exchange_data => { 
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.ticker.vol,price:data.ticker.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'binance':
							return ExchangeDataService.binanceMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.baseAsset),pair:_.toUpper(data.symbol),volume:data.volume,price:data.lastPrice,variation:data.priceChangePercent});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'huobi':
							return ExchangeDataService.huobiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.tick.vol,price:data.tick.bid[0],variation:'--'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'gemini':
							return ExchangeDataService.geminiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.currency),pair:_.toUpper(data.product),volume:data.vol,price:data.bid,variation:'--'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'kraken':
							return ExchangeDataService.krakenMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.price,variation:'--'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitflyer':
							return ExchangeDataService.bitflyerMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.best_bid,variation:'--'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bithumb':
							return ExchangeDataService.bithumbMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume_1day,price:data.sell_price,variation:'--'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitstamp':
							return ExchangeDataService.bitstampMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'--'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitz':
							return ExchangeDataService.bitzMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.sell,variation:'--'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'lbank':
							return ExchangeDataService.lbankMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.ticker.vol,price:data.ticker.latest,variation:data.ticker.change});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'coinone':
							return ExchangeDataService.coinoneMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'wex':
							return ExchangeDataService.wexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'exmo':
							return ExchangeDataService.exmoMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last_trade,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'liqui':
							return ExchangeDataService.liquiMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'korbit':
							return ExchangeDataService.korbitMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.last,variation:data.changePercent});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'bitmex':
							return ExchangeDataService.bitmexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.totalVolume,price:data.settledPrice,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'livecoin':
							return ExchangeDataService.livecoinMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
						
						case 'cex':
							return ExchangeDataService.cexMarketData().
							then(exchange_data => {
								_.forEach(exchange_data.data,function(data){
									exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
								});
								exchange.data=exchange_data_array;
								return exchange;
							}).
							catch(err => {exchange.data=[];return exchange;});
						break;
			
						default:
							exchange.data=[];
							return exchange;
					}
				})).
				then(exchange_response =>{
					var temp_array=[];
					var return_array=[];
					_.forEach(exchange_response,function(exchange_data){
						if(!_.isEmpty(exchange_data.data)){
							exchange_data.displayName=_.toUpper(exchange_data.name);
							temp_array.push(exchange_data);
						}
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					_.forEach(temp_array,function(exchange_data){
						exchange_data.data.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					});
					
					callBack({exchange:temp_array});
				}).
				catch(err => { callBack({exchange:[]});});
			}
		});
	},
	
	exchange_data:function(exchangeName,callBack){	
		var _ = require('lodash');
		var exchange_data_array=[];
		
		switch(exchangeName){
			
			case 'gdax':
				ExchangeDataService.gdaxMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.display_name),volume:data.ticker.volume,price:data.ticker.price,variation:data.ticker.variation});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
				
			case 'bittrex':
				ExchangeDataService.bittrexMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.BaseCurrency),pair:_.toUpper(_.replace(data.MarketName,'-','/')),volume:data.Volume,price:data.Bid,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => { callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'bitfinex':
				ExchangeDataService.bitfinexMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.product_id.substr(0,3)),pair:_.toUpper(data.product_id),volume:data.volume,price:data.bid,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => { callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'hitbtc':
				ExchangeDataService.hitbtcMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.baseCurrency),pair:_.toUpper(data.symbol),volume:data.volume,price:data.bid,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => { callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'gate':
				ExchangeDataService.gateMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(data.product),volume:data.baseVolume,price:data.last,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => { callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'coinmarketcap':
				return ExchangeDataService.coinmarketcapMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.symbol),pair:_.toUpper(data.symbol+'USD'),volume:data['24h_volume_usd'],price:data.price_usd,variation:data.percent_change_24h});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'kuna':
				return ExchangeDataService.kunaMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:'---',pair:_.toUpper(data.product),volume:data.vol,price:data.price,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'okex':
				return ExchangeDataService.okexMarketData().
				then(exchange_data => { 
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(_.join(_.split(data.product,'_',1))),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.ticker.vol,price:data.ticker.last,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'binance':
				return ExchangeDataService.binanceMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.baseAsset),pair:_.toUpper(data.symbol),volume:data.volume,price:data.lastPrice,variation:data.priceChangePercent});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'huobi':
				return ExchangeDataService.huobiMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.tick.vol,price:data.tick.bid[0],variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'gemini':
				return ExchangeDataService.geminiMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.currency),pair:_.toUpper(data.product),volume:data.vol,price:data.bid,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'kraken':
				return ExchangeDataService.krakenMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.price,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'bitflyer':
				return ExchangeDataService.bitflyerMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.best_bid,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'bithumb':
				return ExchangeDataService.bithumbMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume_1day,price:data.sell_price,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'bitstamp':
				return ExchangeDataService.bitstampMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'bitz':
				return ExchangeDataService.bitzMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.sell,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'lbank':
				return ExchangeDataService.lbankMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.ticker.vol,price:data.ticker.latest,variation:data.ticker.change});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'coinone':
				return ExchangeDataService.coinoneMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'wex':
				return ExchangeDataService.wexMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'exmo':
				return ExchangeDataService.exmoMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last_trade,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'liqui':
				return ExchangeDataService.liquiMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.vol,price:data.last,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'korbit':
				return ExchangeDataService.korbitMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.product,'_','')),volume:data.volume,price:data.last,variation:data.changePercent});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'bitmex':
				return ExchangeDataService.bitmexMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(_.replace(data.symbol,'_','')),volume:data.totalVolume,price:data.settledPrice,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'livecoin':
				return ExchangeDataService.livecoinMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.last,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;
			
			case 'cex':
				return ExchangeDataService.cexMarketData().
				then(exchange_data => {
					_.forEach(exchange_data.data,function(data){
						exchange_data_array.push({currency:_.toUpper(data.base_currency),pair:_.toUpper(data.product),volume:data.volume,price:data.bid,variation:'---'});
					});
					
					//SORT DATA IN DESC ORDER OF VOLUME
					exchange_data_array.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					
					callBack({name:_.toUpper(exchange_data.name),url:exchange_data.url,data:exchange_data_array});
				}).
				catch(err => {callBack({name:'',url:'',data:exchange_data_array});});
			break;

			default:
			callBack({name:'',url:'',data:[]});
		}
	},
	
	tc_history_data:function(callBack){
		var Promise = require("bluebird");
		var moment = require("moment");
		return Promise.all([
			//ExchangeDataService.totalCryptosPriceHistory(moment().format('HH'),'day'),
			ExchangeDataService.totalCryptosPriceHistory(24,'day'),
			ExchangeDataService.totalCryptosPriceHistory(24*7,'week'),
		]).
		then(response => { 
			callBack({history1_day:response[0],history7_day:response[1]});
		}).
		catch(err => { callBack({history1_day:[],history7_day:[]});});
	},
	
	gainers_and_losers:function(count=0){
		var _=require('lodash');
		return new Promise(function(resolve,reject){
			ExchangeList.findOne({name:'coinmarketcap'},function(err, coin_market_exchange){
				var gainers_losers=[];
				gainers_losers['gainer_1_h']=[];
				gainers_losers['loser_1_h']=[];
				gainers_losers['gainer_24_h']=[];
				gainers_losers['loser_24_h']=[];
				gainers_losers['gainer_7_d']=[];
				gainers_losers['loser_7_d']=[];
				if(!_.isEmpty(coin_market_exchange)){
					var tickers=ExchangeTickers.findOne();
					tickers.where({exchange_id:coin_market_exchange.id});
					tickers.sort('id DESC');
					tickers.then(function(tickers){
						var tickers=tickers.tickers;
						//PROCESS TO GET LAST 1 HOUR GAINERS AND LOOSERS
						tickers.sort(function(a,b){ if(parseFloat(a.percent_change_1h)>parseFloat(b.percent_change_1h)){return -1;}else {return 1;}});
						var temp=[];
						_.forEach(tickers,function(ticker){
							if(parseFloat(ticker.percent_change_1h)>0){
								temp.push(ticker);
							}
						});
						
						if(count>0){
							temp=_.slice(temp,0,count);
						}
						gainers_losers['gainer_1_h']=temp;
						tickers.reverse();
						temp=[];
						_.forEach(tickers,function(ticker){
							if(parseFloat(ticker.percent_change_1h)<0){
								temp.push(ticker);
							}
						});
						if(count>0){
							temp=_.slice(temp,0,count);
						}
						gainers_losers['loser_1_h']=temp;
						
						//PROCESS TO GET LAST 24 HOURS GAINERS AND LOOSERS
						tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
						
						temp=[];
						_.forEach(tickers,function(ticker){
							if(parseFloat(ticker.percent_change_24h)>0){
								temp.push(ticker);
							}
						});
						
						if(count>0){ 
							temp=_.slice(temp,0,count);
						}
						gainers_losers['gainer_24_h']=temp;
						
						tickers.reverse();
						
						temp=[];
						_.forEach(tickers,function(ticker){
							if(parseFloat(ticker.percent_change_24h)<0){
								temp.push(ticker);
							}
						});
						if(count>0){ 
							temp=_.slice(temp,0,count);
						}
						gainers_losers['loser_24_h']=temp;
						
						//PROCESS TO GET LAST 7 DAYS GAINERS AND LOOSERS
						tickers.sort(function(a,b){if(parseFloat(a.percent_change_7d)>parseFloat(b.percent_change_7d)){return -1;}else {return 1;}});
						
						temp=[];
						_.forEach(tickers,function(ticker){
							if(parseFloat(ticker.percent_change_7d)>0){
								temp.push(ticker);
							}
						});
						if(count>0){ 
							temp=_.slice(temp,0,count);
						}
						gainers_losers['gainer_7_d']=temp;
						
						tickers.reverse();
						
						temp=[];
						_.forEach(tickers,function(ticker){
							if(parseFloat(ticker.percent_change_7d)<0){
								temp.push(ticker);
							}
						});
						if(count>0){ 
							temp=_.slice(temp,0,count);
						}
						gainers_losers['loser_7_d']=temp; 
						return resolve({gainers_losers:gainers_losers});
					});
				}
				else{
					return resolve({gainers_losers:gainers_losers});
				}
			});
		});	
	},
	
	RSS:function(callBack){
		let Parser = require('rss-parser');
		let parser = new Parser();

		return (async () => {
		 	
		 	try{
		  		let feed = await parser.parseURL('http://bloc10.com/feed');
		  		return feed;	
		  	}catch(error){
		  		return {title:"The RSSfeed Cannot be load", items:[{title:"The feed cannot be load",content:"The RSS feed cannot be load"}]};
		  	}

		})();
	}
	
};
