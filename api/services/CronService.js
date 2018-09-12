module.exports = {
	createExchange:function(){
		console.log('crone job for create exchange working');
		var moment = require('moment');
		var _ = require('lodash');
		var math = require('mathjs');
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		var date_after = moment().subtract(24, 'hours').toDate();
		var dataDate=moment().subtract(24, 'hours').format('YYYY-MM-DD');
		
		//PROCESS TO INSERT GDAX STATIC DATA
		ExchangeList.count({name: 'gdax'},function(err,count){
			if(err){ ApiService.exchangeErrors('gdax','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){ 
				Promise.all([
					ApiService.gdaxCurrencies(),
					ApiService.gdaxProducts()
				]).
				then(response => {
					if(count==0){ 
						ExchangeList.create({name:'gdax',url:'https://www.gdax.com',is_exchange:'yes',currencies:JSON.parse(response[0]),products:JSON.parse(response[1]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('gdax','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else {
						ExchangeList.findOne({name:'gdax'},function(err,data){
							var prev_currencies=data.currencies;
							var prev_products=data.products;
							var new_currencies=_.differenceBy(JSON.parse(response[0]), prev_currencies, 'id');
							var new_products=_.differenceBy(JSON.parse(response[1]), prev_products, 'id');
							if(new_currencies.length>0 && new_products.length>0){
								ExchangeList.update({name:'gdax'},{currencies:JSON.parse(response[0]),products:JSON.parse(response[1])},function(err,data){
								if(err){ ApiService.exchangeErrors('gdax','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product.id,'-',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'gdax',currencies:new_currencies,products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('gdax','query_insert',err,'exchange_insert',curDateTime);}
									});
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('gdax','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT BITTREX STATIC DATA
		ExchangeList.count({name: 'bittrex'},function(err,count){
			if(err){ ApiService.exchangeErrors('bittrex','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.bittrexCurrencies(),
					ApiService.bittrexProducts()
				]).
				then(response => { 
					if(count==0){
						ExchangeList.create({name:'bittrex',url:'https://bittrex.com',is_exchange:'yes',currencies:JSON.parse(response[0]),products:JSON.parse(response[1]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('bittrex','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else {
						ExchangeList.findOne({name:'bittrex'},function(err,data){
							var prev_currencies=data.currencies.result;
							var prev_products=data.products.result;
							var new_currencies=_.differenceBy(JSON.parse(response[0]).result, prev_currencies, 'Currency');
							var new_products=_.differenceBy(JSON.parse(response[1]).result, prev_products, 'MarketName');
							if(new_currencies.length>0 && new_products.length>0){
								ExchangeList.update({name:'bittrex'},{currencies:JSON.parse(response[0]),products:JSON.parse(response[1])},function(err,data){
								if(err){ ApiService.exchangeErrors('bittrex','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product.MarketName,'-',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'bittrex',currencies:new_currencies,products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('bittrex','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('bittrex','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT COINMARKETCAP STATIC DATA
		ExchangeList.count({name: 'coinmarketcap'},function(err,count){
			if(err){ ApiService.exchangeErrors('coinmarketcap','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				ExchangeList.create({name:'coinmarketcap',url:'https://coinmarketcap.com',is_exchange:'no',currencies:null,products:null,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('coinmarketcap','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT COINMARKETCAP CURRENCY FULL NAME LIST 
		ExchangeCurrencyFullNames.count({name: 'coinmarketcap'},function(err,count){
			if(err){ ApiService.exchangeErrors('coinmarketcap','query_select',err,'currency_full_name_select',curDateTime);}
			if(count==0){
				Promise.all([
					ApiService.coinFullNames()
				]).then( response => {
					ExchangeCurrencyFullNames.create({name:'coinmarketcap',list:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('coinmarketcap','query_insert',err,'currency_full_name_select',curDateTime);}
					});
				}).
				catch(err => {
					ApiService.exchangeErrors('coinmarketcap','api',err,'currency_full_name_api_select',curDateTime);
				});
			}
		});
		
		//PROCESS TO INSERT BITFINEX STATIC DATA
		ExchangeList.count({name: 'bitfinex'},function(err,count){
			if(err){ ApiService.exchangeErrors('bitfinex','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.bitfinexProducts()
				]).
				then(response => { 
					if(count==0){ 
						ExchangeList.create({name:'bitfinex',url:'https://www.bitfinex.com',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('bitfinex','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'bitfinex'},function(err,data){
							var prev_products=data.products;
							var new_products=_.difference(JSON.parse(response[0]), prev_products);
							if(new_products.length>0){
								ExchangeList.update({name:'bitfinex'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('bitfinex','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:product});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'bitfinex',currencies:null,
										products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('bitfinex','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('bitfinex','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT HITBTC STATIC DATA
		ExchangeList.count({name: 'hitbtc'},function(err,count){
			if(err){ ApiService.exchangeErrors('hitbtc','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.hitbtcCurrencies(),
					ApiService.hitbtcProducts()
				]).
				then(response => { 
					if(count==0){
						ExchangeList.create({name:'hitbtc',url:'https://hitbtc.com',is_exchange:'yes',currencies:JSON.parse(response[0]),products:JSON.parse(response[1]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('hitbtc','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'hitbtc'},function(err,data){
							var prev_currencies=data.currencies;
							var prev_products=data.products;
							var new_currencies=_.differenceBy(JSON.parse(response[0]), prev_currencies, 'id');
							var new_products=_.differenceBy(JSON.parse(response[1]), prev_products, 'id');
							if(new_currencies.length>0 && new_products.length>0){
								ExchangeList.update({name:'hitbtc'},{currencies:JSON.parse(response[0]),products:JSON.parse(response[1])},function(err,data){
								if(err){ ApiService.exchangeErrors('hitbtc','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(product.id)});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'hitbtc',currencies:new_currencies,products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('hitbtc','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('hitbtc','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PRCOESS TO INSERT GATE STATIC DATA
		ExchangeList.count({name: 'gate'},function(err,count){
			if(err){ ApiService.exchangeErrors('gate','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.gateProducts()
				]).
				then(response => { 
					if(count==0){
						ExchangeList.create({name:'gate',url:'https://gate.io',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('gate','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'gate'},function(err,data){
							var prev_products=data.products;
							var new_products=_.difference(JSON.parse(response[0]), prev_products);
							if(new_products.length>0){
								ExchangeList.update({name:'gate'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('gate','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product,'_',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name: 'gate',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('gate','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('gate','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT KUNA STATIC DATA
		ExchangeList.count({name:'kuna'},function(err,count){
			if(err){ ApiService.exchangeErrors('kuna','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				ExchangeList.create({name:'kuna',url:'https://kuna.io',is_exchange:'yes',currencies:null,products:null,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('kuna','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT OKEX STATIC DATA
		ExchangeList.count({name:'okex'},function(err,count){
			if(err){ ApiService.exchangeErrors('okex','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				var products=['ltc_btc', 'eth_btc', 'etc_btc', 'bch_btc', 'btc_usdt', 'eth_usdt' ,'ltc_usdt', 'etc_usdt', 'bch_usdt', 'etc_eth', 'bt1_btc' ,'bt2_btc' ,'btg_btc' ,'qtum_btc' ,'hsr_btc', 'neo_btc', 'gas_btc' ,'qtum_usdt' ,'hsr_usdt' ,'neo_usdt' ,'gas_usdt'];
				ExchangeList.create({name:'okex',url:'https://www.okex.com',is_exchange:'yes',currencies:null,products:products,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('okex','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT BINANCE STATIC DATA
		ExchangeList.count({name:'binance'},function(err, count){
			if(err){ ApiService.exchangeErrors('binance','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.binanceProducts()
				]).
				then(response => { 
					if(count==0){
						ExchangeList.create({name:'binance',url:'https://www.binance.com',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('binance','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'binance'},function(err,data){
							var prev_products=data.products.symbols;
							var new_products=_.differenceBy(JSON.parse(response[0]).symbols, prev_products, 'symbol');
							if(new_products.length>0){
								ExchangeList.update({name:'binance'},{currencies:null,products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('binance','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(product.symbol)});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'binance',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('binance','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('binance','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT HUOBI STATIC DATA 
		ExchangeList.count({name:'huobi'},function(err, count){ 
			if(err){ ApiService.exchangeErrors('huobi','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){ 
				Promise.all([
					ApiService.huobiCurrencies(),
					ApiService.huobiProducts()
				]).
				then(response => {  
					if(count==0){
						ExchangeList.create({name:'huobi',url:'https://www.huobi.pro',is_exchange:'yes',currencies:JSON.parse(response[0]),products:JSON.parse(response[1]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('huobi','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'huobi'},function(err,data){
							var prev_currencies=data.currencies.data;
							var prev_products=data.products.data;
							var new_currencies=_.difference(JSON.parse(response[0]).data, prev_currencies);
							var new_products=_.differenceBy(JSON.parse(response[1]).data, prev_products, 'base-currency');
							if(new_currencies.length>0 && new_products.length>0){
								ExchangeList.update({name:'huobi'},{currencies:JSON.parse(response[0]),products:JSON.parse(response[1])},function(err,data){
								if(err){ ApiService.exchangeErrors('huobi','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:(product['base-currency']+product['quote-currency'])});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'huobi',currencies:new_currencies,products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('huobi','query_insert',err,'exchange_insert',curDateTime);}
									});
								});	
							}
						});
						
					}
				}).
				catch(err => { ApiService.exchangeErrors('huobi','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT GEMINI STATIC DATA
		ExchangeList.count({name:'gemini'},function(err,count){
			if(err){ ApiService.exchangeErrors('gemini','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.geminiProducts()
				]).
				then(response => {  
					if(count==0){
						ExchangeList.create({name:'gemini',url:'https://gemini.com',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('gemini','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'gemini'},function(err,data){
							var prev_products=data.products;
							var new_products=_.difference(JSON.parse(response[0]), prev_products);
							if(new_products.length>0){
								ExchangeList.update({name:'gemini'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('gemini','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(product)});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'gemini',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('gemini','query_insert',err,'exchange_insert',curDateTime);}
									});
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('gemini','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT KRAKEN STATIC DATA
		ExchangeList.count({name:'kraken'},function(err,count){
			if(err){ ApiService.exchangeErrors('kraken','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.krakenCurrencies(),
					ApiService.krakenProducts()
				]).
				then(response => {
					if(count==0){
						ExchangeList.create({name:'kraken',url:'https://www.kraken.com',is_exchange:'yes',currencies:JSON.parse(response[0]),products:JSON.parse(response[1]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('kraken','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'kraken'},function(err,data){
							var prev_currencies=Object.keys(data.currencies.result);
							var prev_products=Object.keys(data.products.result);
							var new_currencies=_.difference(Object.keys(JSON.parse(response[0]).result), prev_currencies);
							var new_products=_.difference(Object.keys(JSON.parse(response[1]).result), prev_products);
							if(new_currencies.length>0 && new_products.length>0){
								ExchangeList.update({name:'kraken'},{currencies:JSON.parse(response[0]),products:JSON.parse(response[1])},function(err,data){
								if(err){ ApiService.exchangeErrors('kraken','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(product)});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'kraken',currencies:new_currencies,products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('kraken','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('kraken','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT BIT FLYER STATIC DATA
		ExchangeList.count({name:'bitflyer'},function(err,count){
			if(err){ ApiService.exchangeErrors('bitflyer','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.bitflyerProducts()
				]).
				then(response => {
					var exists=false;
					var products=JSON.parse(response[0]);
					_.forEach(products,function(product){
						if(product.product_code=='BTC_USD'){
							exists=true;
						}
					});
					if(!exists){
						products.push({product_code: "BTC_USD"});
					}
					
					if(count==0){
						ExchangeList.create({name:'bitflyer',url:'https://bitflyer.jp',is_exchange:'yes',currencies:null,products:products,date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('bitflyer','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'bitflyer'},function(err,data){
							var prev_products=data.products;
							var new_products=_.differenceBy(products, prev_products, 'product_code');
							if(new_products.length>0){
								ExchangeList.update({name:'bitflyer'},{products:products},function(err,data){
								if(err){ ApiService.exchangeErrors('bitflyer','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											if(!_.isEmpty(product.alias)){
												var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product.alias,'_',''))});
											}
											else{
												var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product.product_code,'_',''))});
											}
											
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'bitflyer',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('bitflyer','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('bitflyer','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT BITHUMB STATIC DATA
		ExchangeList.count({name:'bithumb'},function(err,count){
			if(err){ ApiService.exchangeErrors('bithumb','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				currencies=['BTC', 'ETH', 'DASH', 'LTC', 'ETC', 'XRP', 'BCH', 'XMR', 'ZEC', 'QTUM', 'BTG', 'EOS'];
				ExchangeList.create({name:'bithumb',url:'https://www.bithumb.com',is_exchange:'yes',currencies:currencies,products:null,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('bithumb','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT BITSTAMP STATIC DATA
		ExchangeList.count({name:'bitstamp'},function(err,count){
			if(err){ ApiService.exchangeErrors('bitstamp','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.bitstampProducts()
				]).
				then(response => { 
					if(count==0){
						ExchangeList.create({name:'bitstamp',url:'https://www.bitstamp.net',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('bitstamp','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'bitstamp'},function(err,data){
							var prev_products=data.products;
							var new_products=_.differenceBy(JSON.parse(response[0]), prev_products, 'url_symbol');
							if(new_products.length>0){
								ExchangeList.update({name:'bitstamp'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('bitstamp','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product.name,'/',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'bitstamp',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('bitstamp','query_insert',err,'exchange_insert',curDateTime);}
									});
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('bitstamp','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT BIT-Z STATIC DATA
		ExchangeList.count({name:'bitz'},function(err,count){
			if(err){ ApiService.exchangeErrors('bitz','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				ExchangeList.create({name:'bitz',url:'https://www.bit-z.com',is_exchange:'yes',currencies:null,products:null,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('bitz','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT LBANK STATIC DATA
		ExchangeList.count({name:'lbank'},function(err,count){
			if(err){ ApiService.exchangeErrors('lbank','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.lbankProducts()
				]).
				then(response => {  
					if(count==0){
						ExchangeList.create({name:'lbank',url:'https://www.lbank.info',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('lbank','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'lbank'},function(err,data){
							var prev_products=data.products;
							var new_products=_.difference(JSON.parse(response[0]), prev_products);
							if(new_products.length>0){
								ExchangeList.update({name:'lbank'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('lbank','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product,'_',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'lbank',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('lbank','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('lbank','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT COINONE STATIC DATA
		ExchangeList.count({name:'coinone'},function(err,count){
			if(err){ ApiService.exchangeErrors('coinone','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				currencies=['btc', 'bch', 'eth', 'etc', 'xrp', 'qtum', 'iota', 'ltc', 'btg'];
				ExchangeList.create({name:'coinone',url:'https://coinone.co.kr',is_exchange:'yes',currencies:currencies,products:null,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('coinone','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT WEX STATIC DATA
		ExchangeList.count({name:'wex'},function(err,count){
			if(err){ ApiService.exchangeErrors('wex','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.wexProducts()
				]).
				then(response => {  
					if(count==0){
						ExchangeList.create({name:'wex',url:'https://wex.nz',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('wex','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'wex'},function(err,data){
							var prev_products=Object.keys(data.products.pairs);
							var new_products=_.difference(Object.keys(JSON.parse(response[0]).pairs), prev_products);
							if(new_products.length>0){
								ExchangeList.update({name:'wex'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('wex','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product,'_',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'wex',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('wex','query_insert',err,'exchange_insert',curDateTime);}
									});
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('wex','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT EXMO STATIC DATA
		ExchangeList.count({name:'exmo'},function(err,count){
			if(err){ ApiService.exchangeErrors('exmo','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.exmoCurrencies(),
					ApiService.exmoProducts()
				]).
				then(response => { 
					if(count==0){
						ExchangeList.create({name:'exmo',url:'https://exmo.com',is_exchange:'yes',currencies:JSON.parse(response[0]),products:JSON.parse(response[1]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('exmo','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'exmo'},function(err,data){
							var prev_currencies=data.currencies;
							var prev_products=Object.keys(data.products);
							var new_currencies=_.difference(JSON.parse(response[0]), prev_currencies);
							var new_products=_.difference(Object.keys(JSON.parse(response[1])), prev_products);
							if(new_currencies.length>0 && new_products.length>0){
								ExchangeList.update({name:'exmo'},{currencies:JSON.parse(response[0]),products:JSON.parse(response[1])},function(err,data){
								if(err){ ApiService.exchangeErrors('exmo','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product,'_',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'exmo',currencies:new_currencies,products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('exmo','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('exmo','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT LIQUI STATIC DATA
		ExchangeList.count({name:'liqui'},function(err,count){
			if(err){ ApiService.exchangeErrors('liqui','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.liquiProducts()
				]).
				then(response => { 
					if(count==0){
						ExchangeList.create({name:'liqui',url:'https://liqui.io',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
							if(err){ ApiService.exchangeErrors('liqui','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'liqui'},function(err,data){
							var prev_products=Object.keys(data.products.pairs);
							var new_products=_.difference(Object.keys(JSON.parse(response[0]).pairs), prev_products);
							if(new_products.length>0){
								ExchangeList.update({name:'liqui'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('liqui','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:_.toLower(_.replace(product,'_',''))});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'liqui',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('liqui','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('liqui','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO INSERT KORBIT STATIC DATA
		ExchangeList.count({name:'korbit'},function(err,count){
			if(err){ ApiService.exchangeErrors('korbit','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				var currencies=['BTC', 'ETC', 'ETH', 'XRP', 'BCH'];
				var products=['etc_krw', 'eth_krw', 'xrp_krw', 'bch_krw'];
				ExchangeList.create({name:'korbit',url:'https://www.korbit.co.kr',is_exchange:'yes',currencies:currencies,products:products,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('korbit','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT BITMEX STATIC DATA
		ExchangeList.count({name:'bitmex'},function(err,count){
			if(err){ ApiService.exchangeErrors('bitmex','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				ExchangeList.create({name:'bitmex',url:'https://www.bitmex.com',is_exchange:'yes',currencies:null,products:null,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('bitmex','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT LIVECOIN STATIC DATA
		ExchangeList.count({name:'livecoin'},function(err,count){
			if(err){ ApiService.exchangeErrors('livecoin','query_select',err,'exchange_select',curDateTime);}
			if(count==0){
				ExchangeList.create({name:'livecoin',url:'https://www.livecoin.net',is_exchange:'yes',currencies:null,products:null,date_created: curDateTime},function(err,data){
					if(err){ ApiService.exchangeErrors('livecoin','query_insert',err,'exchange_insert',curDateTime);}
				});
			}
		});
		
		//PROCESS TO INSERT CEX STATIC DATA
		ExchangeList.count({name:'cex'},function(err,count){
			if(err){ ApiService.exchangeErrors('cex','query_select',err,'exchange_select',curDateTime);}
			if(count>=0){
				Promise.all([
					ApiService.cexProducts()
				]).
				then(response => {  
					if(count==0){
						ExchangeList.create({name:'cex',url:'https://cex.io',is_exchange:'yes',currencies:null,products:JSON.parse(response[0]),date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('cex','query_insert',err,'exchange_insert',curDateTime);}
						});
					}
					else{
						ExchangeList.findOne({name:'cex'},function(err,data){
							var prev_products=data.products.data.pairs;
							var new_products=_.differenceBy(JSON.parse(response[0]).data.pairs, prev_products, 'symbol1');
							if(new_products.length>0){
								ExchangeList.update({name:'cex'},{products:JSON.parse(response[0])},function(err,data){
								if(err){ ApiService.exchangeErrors('cex','query_update',err,'exchange_update',curDateTime);}	
								});
								
								var new_products_all=[];
								TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){
									var temp_new=[];
									if(!_.isEmpty(totalCryptoPrices)){ 
										totalCryptoPrices=_.head(totalCryptoPrices);
										totalCryptoPrices=totalCryptoPrices.prices;
										_.forEach(new_products,function(product){
											var filter_data=_.filter(totalCryptoPrices,{product:(product['symbol1']+product['symbol2'])});
											if(_.isEmpty(filter_data)){
												new_products_all.push(product);
											}
										});
									}
									
									ExchangeNewCoins.create({exchange_id:data.id,name:'cex',currencies:null,
									products:new_products,products_new:new_products_all,date_created:curDateTime},function(err,data){
										if(err){ ApiService.exchangeErrors('cex','query_insert',err,'exchange_insert',curDateTime);}
									});	
								});	
							}
						});
					}
				}).
				catch(err => { ApiService.exchangeErrors('cex','api',err,'exchange_api_select',curDateTime);});
			}
		});
		
		//PROCESS TO CREATE TOTAL CRYPTO PRICES 24 HOUR HISTORY
		TotalCryptoPrices.find({ "date_created" : { ">": date_after } }).sort('id ASC').exec(function(err, data){
			if(err){ 
				ApiService.exchangeErrors('totalcryptoprices','query_select',err,'history_select',curDateTime);
			}
			var insert_data=[];
			_.forEach(data,function(prices){
				_.forEach(prices.prices,function(price){
					var updated=false;
					_.forEach(insert_data,function(record){
						if(record.product==price.product){
							updated=true;
							record.price=parseFloat(price.price);
							record.change_perc_1h=parseFloat(price.change_perc_1h);
							record.change_perc_24h=parseFloat(price.change_perc_24h);
							record.chart=price.chart;
							record.volume.push(parseFloat(price.volume));
							record.low.push(parseFloat(price.low));
							record.high.push(parseFloat(price.high));
						}
					});
					if(!updated){
						var low=[];
						var high=[];
						var volume=[];
						low.push(parseFloat(price.low));
						high.push(parseFloat(price.high));
						volume.push(parseFloat(price.volume));
						insert_data.push({base_currency:price.base_currency,quote_currency:price.quote_currency,product:price.product,price:parseFloat(price.price),change_perc_1h:parseFloat(price.change_perc_1h),change_perc_24h:parseFloat(price.change_perc_24h),low:low,high:high,volume:volume,chart:price.chart});
					}
				});
			});
			
			//PROCESS TO PREPARE LOW/HIGH AND VOLUME
			_.forEach(insert_data,function(record){
				record.volume=math.format(_.reduce(record.volume,function(sum,n){return sum+n;},0)/record.volume.length, {lowerExp: -100, upperExp: 100});
				record.high=math.format(Math.max.apply(Math,record.high), {lowerExp: -100, upperExp: 100});
				record.low=math.format(Math.min.apply(Math,record.low), {lowerExp: -100, upperExp: 100});
			});
			
			TotalCryptoPricesHistory.create({prices:insert_data,data_date:dataDate,date_created:curDateTime},function(err,data){
				if(err){ 
					ApiService.exchangeErrors('totalcryptopriceshistory','query_insert',err,'history_insert',curDateTime);
				}
			});
			
			//PROCESS TO PREPARE CHART HISTORY ARRAY
			var chart_history=[];
			_.forEach(insert_data,function(data){
				chart_history.push({product:data.product,price:data.price});
			});
			TotalCryptoChartHistory.create({prices:chart_history,data_date:dataDate,date_created:curDateTime},function(err,data){
				if(err){ 
					ApiService.exchangeErrors('totalcryptocharthistory','query_insert',err,'history_insert',curDateTime);
				}
			});
			
		});
		
		//PROCESS TO INSERT ICO WATCHLIST DATA
		IcoWatch.count({name:'icowatchlist'},function(err,count){
			if(err){ ApiService.exchangeErrors('icowatchlist','query_select',err,'ico_select',curDateTime);}
			if(count==0){
				ApiService.icoWatchList().then(response => {
					IcoWatch.create({name:'icowatchlist',url:'https://icowatchlist.com',api_key:null,data:response,date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('icowatchlist','query_insert',err,'ico_insert',curDateTime);}
					});
				}).catch(err => {
					ApiService.exchangeErrors('icowatchlist','api',err,'ico_api_select',curDateTime);
				});
			}
			else{
				ApiService.icoWatchList().then(response => {
					IcoWatch.update({name:'icowatchlist'},{data:response,date_created: curDateTime},function(err,data){
						if(err){ ApiService.exchangeErrors('icowatchlist','query_update',err,'ico_update',curDateTime);}
					});
				}).catch(err => {
					ApiService.exchangeErrors('icowatchlist','api',err,'ico_api_select',curDateTime);
				});
			}
		});
	},
		
	createExchangeTickers1:function(){
		console.log('crone job for create tickers1 working');
		var moment = require('moment');
		var _ = require('lodash');
		
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		var date_after = moment().subtract(24, 'hours').toDate();
		
		//PROCESS TO INSERT GDAX PRODUCTS TICKERS
		ExchangeList.findOne({name:'gdax'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('gdax','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				return Promise.all(products.map((product) => {
						return ApiService.gdaxMarketTicker(product.id).
						then(ticker => {
							ticker=JSON.parse(ticker);
							ticker.product_id=product.id;
							ticker.is_old='no';
							return ticker;
						}).
						catch(err => { 
							ApiService.exchangeErrors('gdax','api',err,'tickers_api_select',curDateTime);
						});
					})).
				then(tickers => {
					var tickers_data=[];	
					_.forEach(tickers,function(ticker){
						if(!_.isEmpty(ticker) && _.isEmpty(ticker.message)){
							tickers_data.push(ticker);
						}
					});
					if(!_.isEmpty(tickers_data)){
						
						//PROCESS TO SYNC WITH LAST ENTRY
						var last_tickers=ExchangeTickers.findOne();
						last_tickers.where({exchange_id:exchange_id});
						last_tickers.sort('id DESC');
						last_tickers.exec(function(err,last_tickers){
							if(err){ 
								ApiService.exchangeErrors('gdax','query_select',err,'tickers_select',curDateTime);
							}
							
							if(!_.isEmpty(last_tickers)){
								last_tickers=last_tickers.tickers;
								_.forEach(last_tickers,function(ticker){
									var filter=_.filter(tickers_data,{product_id:ticker.product_id});
									if(_.isEmpty(filter)){
										ticker.is_old='yes';
										tickers_data.push(ticker);
									}
								});
							}
							
							ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
								if(err){ 
									ApiService.exchangeErrors('gdax','query_insert',err,'tickers_insert',curDateTime);
								}
							});
							
						});
						
					}
				}).
				catch(err=> { 
					ApiService.exchangeErrors('gdax','api',err,'tickers_api_select',curDateTime);
				});
			}	
		});
		
		//PROCESS TO INSERT GDAX PRODUCTS STATS
		ExchangeList.findOne({name:'gdax'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('gdax','query_select',err,'stats_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				return Promise.all(products.map((product) => {
						return ApiService.gdaxMarketStat(product.id).
						then(stat => {
							stat=JSON.parse(stat);
							stat.product_id=product.id;
							stat.is_old='no';
							return stat;
						}).
						catch(err => { 
							ApiService.exchangeErrors('gdax','api',err,'stats_api_select',curDateTime);
						});
					})).
				then(stats => {
					var stats_data=[];
					_.forEach(stats,function(stat){
						if(!_.isEmpty(stat) && _.isEmpty(stat.message)){
							stats_data.push(stat);
						}
					});
					if(!_.isEmpty(stats_data)){
						
						//PROCESS TO SYNC WITH LAST ENTRY
						var last_stats=ExchangeStats.findOne();
						last_stats.where({exchange_id:exchange_id});
						last_stats.sort('id DESC');
						last_stats.exec(function(err,last_stats){
							if(err){ 
								ApiService.exchangeErrors('gdax','query_select',err,'stats_select',curDateTime);
							}
							
							if(!_.isEmpty(last_stats)){
								last_stats=last_stats.stats;
								_.forEach(last_stats,function(stat){
									var filter=_.filter(stats_data,{product_id:stat.product_id});
									if(_.isEmpty(filter)){
										stat.is_old='yes';
										stats_data.push(stat);
									}
								});
							}
							
							ExchangeStats.create({exchange_id:exchange_id,stats:stats_data,date_created:curDateTime},function(err,data){
								if(err){ 
									ApiService.exchangeErrors('gdax','query_insert',err,'stats_insert',curDateTime);
								}
							});	
							
						});
						
					}
				}).
				catch(err=> { 
					ApiService.exchangeErrors('gdax','api',err,'stats_api_select',curDateTime);
				});
			}	
		});
		
		//PROCESS TO INSERT GDAX PRODUCTS TRADES
		ExchangeList.findOne({name:'gdax'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('gdax','query_select',err,'trades_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				return Promise.all(products.map((product) => {
						return ApiService.gdaxMarketTrade(product.id).
						then(trade => {
							trade=JSON.parse(trade);
							trade.is_old='no';
							return {product_id:product.id,data:trade};
						}).
						catch(err => { 
							ApiService.exchangeErrors('gdax','api',err,'trades_api_select',curDateTime);
						});
					})).
				then(trades => {
					var trades_data=[];
					_.forEach(trades,function(trade){
						if(!_.isEmpty(trade) && _.isEmpty(trade.data.message)){
							trades_data.push(trade);
						}
					});
					if(!_.isEmpty(trades_data)){
						
						//PROCESS TO SYNC WITH LAST ENTRY
						var last_trades=ExchangeTrades.findOne();
						last_trades.where({exchange_id:exchange_id});
						last_trades.sort('id DESC');
						last_trades.exec(function(err,last_trades){
							if(err){ 
								ApiService.exchangeErrors('gdax','query_select',err,'trades_select',curDateTime);
							}
							
							if(!_.isEmpty(last_trades)){
								last_trades=last_trades.trades;
								_.forEach(last_trades,function(trade){
									var filter=_.filter(trades_data,{product_id:trade.product_id});
									if(_.isEmpty(filter)){
										trade.is_old='yes';
										trades_data.push(trade);
									}
								});
							}
							
							ExchangeTrades.create({exchange_id:exchange_id,trades:trades_data,date_created:curDateTime},function(err,data){
								if(err){ 
									ApiService.exchangeErrors('gdax','query_insert',err,'trades_insert',curDateTime);
								}
							});	
							
						});
						
					}
				}).
				catch(err=> { 
					ApiService.exchangeErrors('gdax','api',err,'trades_api_select',curDateTime);
				});
			}	
		});
		
		//PROCESS TO INSERT KUNA TICKERS
		ExchangeList.findOne({name:'kuna'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('kuna','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){ 
					if(err){  
						ApiService.exchangeErrors('kuna','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.kunaMarketTicker().then(tickers=>{
						try{
							var temp=[];
							tickers=JSON.parse(tickers);
							var products=Object.keys(tickers);
							
							_.forEach(products,function(product){
								if(!_.isEmpty(tickers[product])){
									var ticker=tickers[product];
									ticker=ticker.ticker;
									ticker.product=product;
									ticker.is_old='no';
									
									var chart_data=[];
									_.forEach(charts,function(chart){
										chart=_.filter(chart.tickers,{product,product});
										if(!_.isEmpty(chart)){
											chart=_.head(chart);
											chart_data.push(chart.last);
										}
									});
									
									chart_data.push(ticker.last);
									ticker.chart=chart_data;
									temp.push(ticker);
								}
							});	
							
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('kuna','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('kuna','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch (e){
							ApiService.exchangeErrors('kuna','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err=> { 
						ApiService.exchangeErrors('kuna','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}	
		});	
		
		//PROCESS TO INSERT OKEX PRODUCTS TICKERS
		ExchangeList.findOne({name:'okex'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('okex','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('okex','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
							return ApiService.okexMarketTicker(product).
							then(ticker => {
								ticker=JSON.parse(ticker);
								ticker.product=product;
								ticker.is_old='no';
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{product:product});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.ticker.last);
									}
								});
								
								chart_data.push(ticker.ticker.last);
								ticker.chart=chart_data;
								return ticker;
							}).
							catch(err => { 
								ApiService.exchangeErrors('okex','api',err,'tickers_api_select',curDateTime);
							});
						})).
					then(tickers => {
						var tickers_data=[];	
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker) && _.isEmpty(ticker.error_code)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('okex','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers_data,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers_data.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('okex','query_insert',err,'tickers_insert',curDateTime);
									}
								});
								
							});
						}
					}).
					catch(err=> { 
						ApiService.exchangeErrors('okex','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}	
		});
		
		//PROCESS TO INSERT GEMINI MARKET TICKERS
		ExchangeList.findOne({name:'gemini'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('gemini','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){ 
					if(err){ 
						ApiService.exchangeErrors('gemini','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
							return ApiService.geminiMarketTicker(product).
							then(ticker => {
								ticker=JSON.parse(ticker);
								var keys=Object.keys(ticker.volume);
								keys=_.remove(keys, function(key){return key!='timestamp';});
								if(_.toLower(keys[0]+keys[1])==_.toLower(product)){
									ticker.vol=ticker.volume[keys[1]];
									ticker.currency=keys[0];
								}
								else{
									ticker.vol=ticker.volume[keys[0]];
									ticker.currency=keys[1];
								}
								ticker.product=product;
								ticker.is_old='no';
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{product:product});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.last);
									}
								});
								
								chart_data.push(ticker.last);
								ticker.chart=chart_data;
								return ticker;
							}).
							catch(err => { 
								ApiService.exchangeErrors('gemini','api',err,'tickers_api_select',curDateTime);
							});
						})).
					then(tickers => {
						var tickers_data=[];	
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('gemini','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers_data,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers_data.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('gemini','query_insert',err,'tickers_insert',curDateTime);
									}
								});
								
							});
							
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('gemini','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT KRAKEN MARKET TICKERS
		ExchangeList.findOne({name:'kraken'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('kraken','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var temp=[];
				var products=data.products.result;
	
				_.forEach(Object.keys(products),function(product_name){
					temp.push({name:product_name,base:products[product_name].base,quote:products[product_name].quote});
				});
				products=temp;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('kraken','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
						return ApiService.krakenMarketTicker(product.name).
						then(ticker => {
							ticker=JSON.parse(ticker);
							ticker.product=product.name;
							ticker.base_currency=product.base;
							ticker.quote_currency=product.quote;
							ticker.is_old='no';
							return ticker;
						}).
						catch(err => { 
							ApiService.exchangeErrors('kraken','api',err,'tickers_api_select',curDateTime);
						});
					})).
					then(tickers => {
						
						var tickers_data=[];
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker) &&_.isEmpty(ticker.error)){
								ticker.price=ticker.result[ticker.product].l[0];
								ticker.last=ticker.price;
								ticker.bid=ticker.result[ticker.product].b[0];
								ticker.ask=ticker.result[ticker.product].a[0];
								ticker.volume=ticker.result[ticker.product].v[1];
								ticker.low=ticker.result[ticker.product].l[1];
								ticker.high=ticker.result[ticker.product].h[1];
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{product:ticker.product});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.price);
									}
								});
								
								chart_data.push(ticker.price);
								ticker.chart=chart_data;
								tickers_data.push(ticker);
							}
						});
						
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('kraken','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers_data,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers_data.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('kraken','query_insert',err,'tickers_insert',curDateTime);
									}
								});
								
							});
					
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('kraken','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT BITFLYER MARKET TICKERS
		ExchangeList.findOne({name:'bitflyer'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('bitflyer','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				var temp=[];
				_.forEach(products,function(product){
					if(_.isEmpty(product.alias) && 	(((product.product_code.match(/_/g) || []).length)==1)){
						temp.push(product);
					}
				});
				products=temp;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('bitflyer','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
						return ApiService.bitflyerMarketTicker(product.product_code).
						then(ticker => {
							ticker=JSON.parse(ticker);
							ticker.product=product.product_code;
							ticker.base_currency=_.join(_.split(product.product_code,'_',1));
							ticker.quote_currency=_.replace(product.product_code,ticker.base_currency+'_','');
							ticker.is_old='no';
							
							var chart_data=[];
							_.forEach(charts,function(chart){
								chart=_.filter(chart.tickers,{product:product.product_code});
								if(!_.isEmpty(chart)){
									chart=_.head(chart);
									chart_data.push(chart.best_bid);
								}
							});
							
							chart_data.push(ticker.best_bid);
							ticker.chart=chart_data;
							return ticker;
						}).
						catch(err => { 
							ApiService.exchangeErrors('bitflyer','api',err,'tickers_api_select',curDateTime);
						});
					})).
					then(tickers => {
						var tickers_data=[];	
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('bitflyer','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers_data,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers_data.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('bitflyer','query_insert',err,'tickers_insert',curDateTime);
									}
								});
								
							});
							
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('bitflyer','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT BITHUMB MARKET TICKERS
		ExchangeList.findOne({name:'bithumb'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('bithumb','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('bithumb','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.bithumbMarketTicker().
					then(tickers => {
						try{
							tickers=JSON.parse(tickers);
							if(parseInt(tickers.status)==0){
								var temp=[];
								_.forEach(Object.keys(tickers.data),function(currency){
									if(currency!='date'){
										var ticker=tickers.data[currency];
										ticker.base_currency=currency;
										ticker.quote_currency='KRW';
										ticker.product=currency+'KRW';
										ticker.is_old='no';
										
										var chart_data=[];
										_.forEach(charts,function(chart){
											chart=_.filter(chart.tickers,{product:currency+'KRW'});
											if(!_.isEmpty(chart)){
												chart=_.head(chart);
												chart_data.push(chart.buy_price);
											}
										});
										
										chart_data.push(ticker.buy_price);
										ticker.chart=chart_data;
										temp.push(ticker);
									}
								});
								tickers=temp;
								
								//PROCESS TO SYNC WITH LAST ENTRY
								var last_tickers=ExchangeTickers.findOne();
								last_tickers.where({exchange_id:exchange_id});
								last_tickers.sort('id DESC');
								last_tickers.exec(function(err,last_tickers){
									if(err){ 
										ApiService.exchangeErrors('bithumb','query_select',err,'tickers_select',curDateTime);
									}
									
									if(!_.isEmpty(last_tickers)){
										last_tickers=last_tickers.tickers;
										_.forEach(last_tickers,function(ticker){
											if(!_.isEmpty(ticker.product)){
												var filter=_.filter(tickers,{product:ticker.product});
												if(_.isEmpty(filter)){
													ticker.is_old='yes';
													tickers.push(ticker);
												}
											}
										});
									}
									
									ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err, data){
										if(err){ 
											ApiService.exchangeErrors('bithumb','query_insert',err,'tickers_insert',curDateTime);
										}
									});
								});
								
							}
						}
						catch(e){
							ApiService.exchangeErrors('bithumb','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('bithumb','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT BITSTAMP MARKET TICKERS
		ExchangeList.findOne({name:'bitstamp'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('bitstamp','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('bitstamp','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
						return ApiService.bitstampMarketTicker(product.url_symbol).
						then(ticker => {
							ticker=JSON.parse(ticker);
							ticker.product=product.url_symbol;
							ticker.base_currency=_.join(_.split(product.name,'/',1));
							ticker.quote_currency=_.replace(product.name,ticker.base_currency+'/','');
							ticker.is_old='no';
							
							var chart_data=[];
							_.forEach(charts,function(chart){
								chart=_.filter(chart.tickers,{product:product.url_symbol});
								if(!_.isEmpty(chart)){
									chart=_.head(chart);
									chart_data.push(chart.last);
								}
							});
							
							chart_data.push(ticker.last);
							ticker.chart=chart_data;
							return ticker;
						}).
						catch(err => { 
							ApiService.exchangeErrors('bitstamp','api',err,'tickers_api_select',curDateTime);
						});
					})).
					then(tickers => {
						var tickers_data=[];	
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('bitstamp','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers_data,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers_data.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('bitstamp','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('bitstamp','api',err,'tickers_api_select',curDateTime);
					});
				});
			}
		});
		
		//PROCESS TO INSERT LBANK MARKET TICKERS
		ExchangeList.findOne({name:'lbank'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('lbank','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('lbank','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.lbankMarketTicker().
					then(tickers => {
						try{ 
							tickers=JSON.parse(tickers);
							_.forEach(tickers,function(ticker){
								ticker.base_currency=_.join(_.split(ticker.symbol,'_',1));
								ticker.quote_currency=_.replace(ticker.symbol,ticker.base_currency+'_','');
								ticker.is_old='no';
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{symbol:ticker.symbol});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.ticker.latest);
									}
								});
								
								chart_data.push(ticker.ticker.latest);
								ticker.chart=chart_data;
							});
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('lbank','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{symbol:ticker.symbol});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err, data){
									if(err){ 
										ApiService.exchangeErrors('lbank','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){
							ApiService.exchangeErrors('lbank','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('lbank','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT COINONE MARKET TICKERS
		ExchangeList.findOne({name:'coinone'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('coinone','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('coinone','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.coinoneMarketTicker().
					then(tickers => {
						try{ 
							var temp=[];
							tickers=JSON.parse(tickers);
							if(parseInt(tickers.errorCode)==0){
								_.forEach(Object.keys(tickers),function(currency){
									if(!_.includes(['errorCode','result','timestamp'],currency)){
										var ticker=tickers[currency];
										ticker.base_currency=currency;
										ticker.quote_currency='krw';
										ticker.product=currency+'krw';
										ticker.is_old='no';
										
										var chart_data=[];
										_.forEach(charts,function(chart){
											chart=_.filter(chart.tickers,{product:currency+'krw'});
											if(!_.isEmpty(chart)){
												chart=_.head(chart);
												chart_data.push(chart.last);
											}
										});

										chart_data.push(ticker.last);
										ticker.chart=chart_data;
										temp.push(ticker);
									}
								});
							}	
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('coinone','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err, data){
									if(err){ 
										ApiService.exchangeErrors('coinone','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){
							ApiService.exchangeErrors('coinone','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('coinone','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT WEX MARKET TICKERS
		ExchangeList.findOne({name:'wex'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('wex','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=Object.keys(data.products.pairs);
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('wex','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.wexMarketTicker(_.join(products,'-')).
					then(tickers => {
						try{ 
							var temp=[];
							tickers=JSON.parse(tickers);
						
							_.forEach(Object.keys(tickers),function(product){
								var ticker=tickers[product];
								ticker.base_currency=_.join(_.split(product,'_',1));
								ticker.quote_currency=_.replace(product,ticker.base_currency+'_','');
								ticker.product=product;
								ticker.is_old='no';
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{product:product});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.last);
									}
								});
								
								chart_data.push(ticker.last);
								ticker.chart=chart_data;
								temp.push(ticker);
							});
				
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('wex','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err, data){
									if(err){ 
										ApiService.exchangeErrors('wex','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){ 
							ApiService.exchangeErrors('wex','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('wex','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT EXMO MARKET TICKERS
		ExchangeList.findOne({name:'exmo'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('exmo','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('exmo','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.exmoMarketTicker().
					then(tickers => {
						try{ 
							var temp=[];
							tickers=JSON.parse(tickers);
							
							_.forEach(Object.keys(tickers),function(product){
								var ticker=tickers[product];
								ticker.base_currency=_.join(_.split(product,'_',1));
								ticker.quote_currency=_.replace(product,ticker.base_currency+'_','');
								ticker.product=product;
								ticker.is_old='no';
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{product:product});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.last_trade);
									}
								});
								
								chart_data.push(ticker.last_trade);
								ticker.chart=chart_data;
								temp.push(ticker);
							});
				
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('exmo','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err, data){
									if(err){ 
										ApiService.exchangeErrors('exmo','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){
							ApiService.exchangeErrors('exmo','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('exmo','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});	
		
		//PROCESS TO INSERT KORBIT MARKET TICKERS
		ExchangeList.findOne({name:'korbit'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('korbit','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('korbit','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
						return ApiService.korbitMarketTicker(product).
						then(ticker => {
							ticker=JSON.parse(ticker);
							ticker.product=product;
							ticker.base_currency=_.join(_.split(product,'_',1));
							ticker.quote_currency=_.replace(product,ticker.base_currency+'_','');
							ticker.is_old='no';
							
							var chart_data=[];
							_.forEach(charts,function(chart){
								chart=_.filter(chart.tickers,{product:product});
								if(!_.isEmpty(chart)){
									chart=_.head(chart);
									chart_data.push(chart.last);
								}
							});
							
							chart_data.push(ticker.last);
							ticker.chart=chart_data;
							return ticker;
						}).
						catch(err => { 
							ApiService.exchangeErrors('korbit','api',err,'tickers_api_select',curDateTime);
						});
					})).
					then(tickers => {
						var tickers_data=[];	
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('korbit','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers_data,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers_data.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('korbit','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('korbit','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT CEX MARKET TICKERS
		ExchangeList.findOne({name:'cex'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('cex','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products.data.pairs;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('cex','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
						return ApiService.cexMarketTicker(product.symbol1,product.symbol2).
						then(ticker => {
							ticker=JSON.parse(ticker);
							ticker.product=product.symbol1+product.symbol2;
							ticker.base_currency=product.symbol1;
							ticker.quote_currency=product.symbol2;
							ticker.is_old='no';
							
							var chart_data=[];
							_.forEach(charts,function(chart){
								chart=_.filter(chart.tickers,{product:product.symbol1+product.symbol2});
								if(!_.isEmpty(chart)){
									chart=_.head(chart);
									chart_data.push(chart.last);
								}
							});
							
							chart_data.push(ticker.last);
							ticker.chart=chart_data;
							return ticker;
						}).
						catch(err => { 
							ApiService.exchangeErrors('cex','api',err,'tickers_api_select',curDateTime);
						});
					})).
					then(tickers => {
						var tickers_data=[];	
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('cex','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers_data,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers_data.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('cex','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('cex','api',err,'tickers_api_select',curDateTime);
					});
				});
			}
		});
	},
	
	createExchangeTickers2:function(){
		console.log('crone job for create tickers2 working');
		var moment = require('moment');
		var _ = require('lodash');
		var math = require('mathjs');
	
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		var date_after = moment().subtract(24, 'hours').toDate();

		//PROCESS TO INSERT BITTEX PRODUCTS/MARKETS TICKERS
		ExchangeList.findOne({name:'bittrex'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('bittrex','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products.result; 
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){ 
					if(err){ 
						ApiService.exchangeErrors('bittrex','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.bittrexMarketSummaries().then(tickers=>{
						if(_.isEmpty(JSON.parse(tickers).message)){
							 tickers=JSON.parse(tickers);
							 var temp=[];
							 _.forEach(tickers.result,function(ticker){
								 var product=_.filter(products,{MarketName:ticker.MarketName});
								 if(!_.isEmpty(product)){
									product=_.head(product);
									ticker.BaseCurrency=product.BaseCurrency;
									ticker.MarketCurrency=product.MarketCurrency;
									//PROCESS TO FORMAT VALUE IF THERE IS ANY EXPONENTIAL VALUE
									ticker.High=math.format(ticker.High,{lowerExp: -100, upperExp: 100});
									ticker.Low=math.format(ticker.Low,{lowerExp: -100, upperExp: 100});
									ticker.Last=math.format(ticker.Last,{lowerExp: -100, upperExp: 100});
									ticker.Bid=math.format(ticker.Bid,{lowerExp: -100, upperExp: 100});
									ticker.Ask=math.format(ticker.Ask,{lowerExp: -100, upperExp: 100});
									ticker.PrevDay=math.format(ticker.PrevDay,{lowerExp: -100, upperExp: 100});
									ticker.is_old='no';
									
									var chart_data=[];
									_.forEach(charts,function(chart){
										chart=_.filter(chart.tickers.result,{MarketName:ticker.MarketName});
										if(!_.isEmpty(chart)){
											chart=_.head(chart);
											chart_data.push(chart.Last);
										}
									});
									chart_data.push(ticker.Last);
									ticker.chart=chart_data;
									temp.push(ticker);
								 }
							 });
							 tickers.result=temp;
							 //PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('bittrex','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers.result;
									_.forEach(last_tickers,function(ticker){
										if(!_.isEmpty(ticker.BaseCurrency)){
											var filter=_.filter(tickers.result,{MarketName:ticker.MarketName});
											if(_.isEmpty(filter)){
												ticker.is_old='yes';
												tickers.result.push(ticker);
											}
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('bittrex','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
					}).
					catch(err=> { 
						ApiService.exchangeErrors('bittrex','api',err,'tickers_api_select',curDateTime);
					});
				});
			}	
		});
		
		//PROCESS TO INSERT COINMARKETCAP PRODUCTS/MARKETS TICKERS
		ExchangeList.findOne({name:'coinmarketcap'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('coinmarketcap','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('coinmarketcap','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.coinMarketTicker().then(tickers=>{
						tickers=JSON.parse(tickers);
						
						_.forEach(tickers,function(ticker){
							var chart_data=[];
							_.forEach(charts,function(chart){
								chart=_.filter(chart.tickers,{symbol:ticker.symbol});
								if(!_.isEmpty(chart)){
									chart=_.head(chart);
									chart_data.push(chart.price_usd);
								}
							});
							chart_data.push(ticker.price_usd);
							ticker.chart=chart_data;
							ticker.is_old='no';
						});
						
						 //PROCESS TO SYNC WITH LAST ENTRY
						var last_tickers=ExchangeTickers.findOne();
						last_tickers.where({exchange_id:exchange_id});
						last_tickers.sort('id DESC');
						last_tickers.exec(function(err,last_tickers){
							if(err){ 
								ApiService.exchangeErrors('coinmarketcap','query_select',err,'tickers_select',curDateTime);
							}
							
							if(!_.isEmpty(last_tickers)){
								last_tickers=last_tickers.tickers;
								_.forEach(last_tickers,function(ticker){
									var filter=_.filter(tickers,{symbol:ticker.symbol});
									if(_.isEmpty(filter)){
										ticker.is_old='yes';
										tickers.push(ticker);
									}
								});
							}
							
							tickers=_.reject(tickers,{market_cap_usd:null});
							tickers=_.reject(tickers,{percent_change_1h:null});
							tickers=_.reject(tickers,{percent_change_24h:null});
							ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
								if(err){ 
									ApiService.exchangeErrors('coinmarketcap','query_insert',err,'tickers_insert',curDateTime);
								}
							});
						});
						
					}).
					catch(err=> { 
						ApiService.exchangeErrors('coinmarketcap','api',err,'tickers_api_select',curDateTime);
					});
				});
			}	
		});
		
		//PROCESS TO INSERT BITFINEX PRODUCTS/MARKETS TICKERS
		ExchangeList.findOne({name:'bitfinex'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('bitfinex','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				products=data.products;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('bitfinex','query_select',err,'tickers_select',curDateTime);
					}	
					return Promise.all(products.map((product)=>{
						return ApiService.bitFinexMarketTicker(product).then((ticker)=>{
							ticker=JSON.parse(ticker);
							ticker.product_id=product;
							
							var chart_data=[];
							_.forEach(charts,function(chart){
								chart=_.filter(chart.tickers,{product_id:product});
								if(!_.isEmpty(chart)){
									chart=_.head(chart);
									chart_data.push(chart.last_price);
								}
							});
							
							chart_data.push(ticker.last_price);
							ticker.chart=chart_data;
							ticker.is_old='no';
							return ticker;
						}).
						catch(err=> { 
							ApiService.exchangeErrors('bitfinex','api',err,'tickers_api_select',curDateTime);
						});
					})).
					then(tickers => {
						var tickers_data=[];
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker) && _.isEmpty(ticker.error)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('bitfinex','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product_id:ticker.product_id});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('bitfinex','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('bitfinex','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT HITBTC PRODUCTS/MARKETS TICKERS
		ExchangeList.findOne({name:'hitbtc'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('hitbtc','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('hitbtc','query_select',err,'tickers_select',curDateTime);
					}
					var temp=[];
					ApiService.hitbtcMarketTicker().then(tickers=>{
						try{ 
							tickers=JSON.parse(tickers);
							
							_.forEach(tickers,function(ticker){
								var product=_.filter(products,{id:ticker.symbol});
								if(!_.isEmpty(product)){
									product=_.head(product);
									ticker.baseCurrency=product.baseCurrency;
									ticker.quoteCurrency=product.quoteCurrency;
									ticker.is_old='no';
									var chart_data=[];
									
									_.forEach(charts,function(chart){
										chart=_.filter(chart.tickers,{symbol:ticker.symbol});
										if(!_.isEmpty(chart)){
											chart=_.head(chart);
											chart_data.push(chart.last);
										}
									});	
									
									chart_data.push(ticker.last);
									ticker.chart=chart_data;
									temp.push(ticker);
								}
							});
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('hitbtc','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										if(!_.isEmpty(ticker.baseCurrency)){
											var filter=_.filter(tickers,{symbol:ticker.symbol});
											if(_.isEmpty(filter)){
												ticker.is_old='yes';
												tickers.push(ticker);
											}
										}
									});
								}
								
								tickers=_.reject(tickers,{bid:null});
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('hitbtc','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){ 
							ApiService.exchangeErrors('hitbtc','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err=>{ 
						ApiService.exchangeErrors('hitbtc','api',err,'tickers_api_select',curDateTime);
					});
				});
			}	
		});	
		
		//PROCESS TO INSERT GATE TICKERS
		ExchangeList.findOne({name:'gate'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('gate','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('gate','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.gateMarketTicker().then(tickers=>{
						try{
							var temp=[];
							tickers=JSON.parse(tickers);
							
							_.forEach(products,function(product){
								if(!_.isEmpty(tickers[_.toLower(product)])){
									product=_.toLower(product);
									var ticker=tickers[product];
									ticker.product=product;
									ticker.is_old='no';
									var chart_data=[];
									_.forEach(charts,function(chart){
										chart=_.filter(chart.tickers,{product:product});
										if(!_.isEmpty(chart)){
											chart=_.head(chart);
											chart_data.push(chart.last);
										}
									});
									chart_data.push(ticker.last);
									ticker.chart=chart_data;
									temp.push(ticker);
								}
							});
							
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('gate','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('gate','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){
							ApiService.exchangeErrors('gate','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err=> { 
						ApiService.exchangeErrors('gate','api',err,'tickers_api_select',curDateTime);
					});
				});
			}	
		});	
		
		//PROCESS TO INSERT BINANCE TICKERS
		ExchangeList.findOne({name:'binance'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('binance','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products.symbols;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('binance','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.binanceMarketTicker().
					then(tickers => {
						try{
							tickers=JSON.parse(tickers);
							var temp=[];
							_.forEach(tickers,function(ticker){
								var product=_.filter(products,{symbol:ticker.symbol});
								if(!_.isEmpty(product)){
									product=_.head(product);
									ticker.baseAsset=product.baseAsset;
									ticker.quoteAsset=product.quoteAsset;
									ticker.is_old='no';
									var chart_data=[];
									_.forEach(charts,function(chart){
										chart=_.filter(chart.tickers,{symbol:ticker.symbol});
										if(!_.isEmpty(chart)){
											chart=_.head(chart);
											chart_data.push(chart.lastPrice);
										}
									});
									chart_data.push(ticker.lastPrice);
									ticker.chart=chart_data;
									temp.push(ticker);
								}
							});
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('binance','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										if(!_.isEmpty(ticker.baseAsset)){
											var filter=_.filter(tickers,{symbol:ticker.symbol});
											if(_.isEmpty(filter)){
												ticker.is_old='yes';
												tickers.push(ticker);
											}
										}	
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err, data){
									if(err){ 
										ApiService.exchangeErrors('binance','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){
							ApiService.exchangeErrors('binance','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('binance','api',err,'tickers_api_select',curDateTime);
					});
				});
			}
		});
		
		//PROCESS TO INSERT HUOBI MARKET TICKERS
		ExchangeList.findOne({name:'huobi'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('huobi','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=data.products.data;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('huobi','query_select',err,'tickers_select',curDateTime);
					}
					return Promise.all(products.map((product) => {
							return ApiService.huobiMarketTicker(product['base-currency']+product['quote-currency']).
							then(ticker => {
								ticker=JSON.parse(ticker);
								ticker.product=product['base-currency']+product['quote-currency'];
								ticker.base_currency=product['base-currency'];
								ticker.quote_currency=product['quote-currency'];
								ticker.is_old='no';
								//PROCESS TO FORMAT VALUE IF THERE IS ANY EXPONENTIAL VALUE
								ticker.tick.open=math.format(ticker.tick.open,{lowerExp: -100, upperExp: 100});
								ticker.tick.close=math.format(ticker.tick.close,{lowerExp: -100, upperExp: 100});
								ticker.tick.high=math.format(ticker.tick.high,{lowerExp: -100, upperExp: 100});
								ticker.tick.low=math.format(ticker.tick.low,{lowerExp: -100, upperExp: 100});
								ticker.tick.ask[0]=math.format(ticker.tick.ask[0],{lowerExp: -100, upperExp: 100});
								ticker.tick.ask[1]=math.format(ticker.tick.ask[1],{lowerExp: -100, upperExp: 100});
								ticker.tick.bid[0]=math.format(ticker.tick.bid[0],{lowerExp: -100, upperExp: 100});
								ticker.tick.bid[1]=math.format(ticker.tick.bid[1],{lowerExp: -100, upperExp: 100});
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{product:product['base-currency']+product['quote-currency']});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.tick.bid[0]);
									}
								});
								
								chart_data.push(ticker.tick.bid[0]);
								ticker.chart=chart_data;
								return ticker;
							}).
							catch(err => { 
								ApiService.exchangeErrors('huobi','api',err,'tickers_api_select',curDateTime);
							});
						})).
					then(tickers => {
						var tickers_data=[];	
						_.forEach(tickers,function(ticker){
							if(!_.isEmpty(ticker) && !_.isEmpty(ticker.tick) && _.isEmpty(ticker.error_code)){
								tickers_data.push(ticker);
							}
						});
						if(!_.isEmpty(tickers_data)){
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('huobi','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers_data,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('huobi','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('huobi','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
	
		//PROCESS TO INSERT BIT-Z MARKET TICKERS
		ExchangeList.findOne({name:'bitz'},function(err,data){
			if(err){ 
				ApiService.exchangeErrors('bitz','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('bitz','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.bitzMarketTicker().then(tickers=>{
						try{
							var temp=[];
							tickers=JSON.parse(tickers);
							if(parseInt(tickers.code)==0){
								var products=Object.keys(tickers.data);
								_.forEach(products,function(product){
									var ticker=tickers.data[product];
									ticker.product=product;
									ticker.base_currency=_.join(_.split(product,'_',1));
									ticker.quote_currency=_.replace(product,ticker.base_currency+'_','');
									ticker.is_old='no';
									
									var chart_data=[];
									_.forEach(charts,function(chart){
										chart=_.filter(chart.tickers,{product:product});
										if(!_.isEmpty(chart)){
											chart=_.head(chart);
											chart_data.push(chart.last);
										}
									});
									
									chart_data.push(ticker.last);
									ticker.chart=chart_data;
									temp.push(ticker);
								});
								tickers=temp;
							
								//PROCESS TO SYNC WITH LAST ENTRY
								var last_tickers=ExchangeTickers.findOne();
								last_tickers.where({exchange_id:exchange_id});
								last_tickers.sort('id DESC');
								last_tickers.exec(function(err,last_tickers){
									if(err){ 
										ApiService.exchangeErrors('bitz','query_select',err,'tickers_select',curDateTime);
									}
									
									if(!_.isEmpty(last_tickers)){
										last_tickers=last_tickers.tickers;
										_.forEach(last_tickers,function(ticker){
											var filter=_.filter(tickers,{product:ticker.product});
											if(_.isEmpty(filter)){
												ticker.is_old='yes';
												tickers.push(ticker);
											}
										});
									}
									
									ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
										if(err){ 
											ApiService.exchangeErrors('bitz','query_insert',err,'tickers_insert',curDateTime);
										}
									});
								});
							
							}
						}
						catch (e){
							ApiService.exchangeErrors('bitz','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err=> { 
						ApiService.exchangeErrors('bitz','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}	
		});
		
		//PROCESS TO INSERT LIQUI MARKET TICKERS
		ExchangeList.findOne({name:'liqui'},function(err, data){
			if(err){ 
				ApiService.exchangeErrors('liqui','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				var products=Object.keys(data.products.pairs);
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('liqui','query_select',err,'tickers_select',curDateTime);
					}
					ApiService.liquiMarketTicker(_.join(products,'-')).
					then(tickers => {
						try{ 
							var temp=[];
							tickers=JSON.parse(tickers);
							
							_.forEach(Object.keys(tickers),function(product){
								var ticker=tickers[product];
								ticker.base_currency=_.join(_.split(product,'_',1));
								ticker.quote_currency=_.replace(product,ticker.base_currency+'_','');
								ticker.product=product;
								ticker.is_old='no';
								
								var chart_data=[];
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{product:product});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.last);
									}
								});
								
								chart_data.push(ticker.last);
								ticker.chart=chart_data;
								temp.push(ticker);
							});
				
							tickers=temp;
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('liqui','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err, data){
									if(err){ 
										ApiService.exchangeErrors('liqui','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
							
						}
						catch(e){ 
							ApiService.exchangeErrors('liqui','api',e,'tickers_api_select',curDateTime);
						}
					}).
					catch(err => { 
						ApiService.exchangeErrors('liqui','api',err,'tickers_api_select',curDateTime);
					});
				});	
			}
		});
		
		//PROCESS TO INSERT BITMEX PRODUCT/MARKET TICKERS
		ExchangeList.findOne({name:'bitmex'},function(err,data){ 
			if(err){ 
				ApiService.exchangeErrors('bitmex','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('bitmex','query_select',err,'tickers_select',curDateTime);
					}
					
					ApiService.bitmexTicker().then(tickers=>{
						tickers=JSON.parse(tickers);
						if(_.isEmpty(tickers.error)){
							tickers=_.reject(tickers,{lastPrice:null});
							_.forEach(tickers,function(ticker){
								var chart_data=[];
								ticker.base_currency=ticker.rootSymbol;
								ticker.quote_currency=_.replace(ticker.symbol,ticker.rootSymbol,'');
								ticker.is_old='no';
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{symbol:ticker.symbol});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.lastPrice);
									}
								});
								chart_data.push(ticker.lastPrice);
								ticker.chart=chart_data;
							});
							
							
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('bitmex','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{symbol:ticker.symbol});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('bitmex','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
						
						}
					}).
					catch(err=> { 
						ApiService.exchangeErrors('bitmex','api',err,'tickers_api_select',curDateTime);
					});
				});
			}	
		});
		
		//PROCESS TO CREATE LIVECOIN MARKET TICKERS
		ExchangeList.findOne({name:'livecoin'},function(err,data){ 
			if(err){ 
				ApiService.exchangeErrors('livecoin','query_select',err,'tickers_select',curDateTime);
			}
			if(!_.isEmpty(data)){
				var exchange_id=data.id;
				ExchangeTickers.find().where({exchange_id:exchange_id}).where({ "date_created" : { ">": date_after }}).sort('id ASC').exec(function(err, charts){
					if(err){ 
						ApiService.exchangeErrors('livecoin','query_select',err,'tickers_select',curDateTime);
					}
					
					ApiService.livecoinTicker().then(tickers=>{
						tickers=JSON.parse(tickers);
						
						if(_.isEmpty(tickers.errorCode)){
						_.forEach(tickers,function(ticker){
								var chart_data=[];
								ticker.base_currency=ticker.cur;
								ticker.quote_currency=_.replace(ticker.symbol,ticker.cur+'/','');
								ticker.product=_.replace(ticker.symbol,'/','');
								ticker.is_old='no';
								_.forEach(charts,function(chart){
									chart=_.filter(chart.tickers,{symbol:ticker.symbol});
									if(!_.isEmpty(chart)){
										chart=_.head(chart);
										chart_data.push(chart.last);
									}
								});
								chart_data.push(ticker.last);
								ticker.chart=chart_data;
							});
						
							//PROCESS TO SYNC WITH LAST ENTRY
							var last_tickers=ExchangeTickers.findOne();
							last_tickers.where({exchange_id:exchange_id});
							last_tickers.sort('id DESC');
							last_tickers.exec(function(err,last_tickers){
								if(err){ 
									ApiService.exchangeErrors('livecoin','query_select',err,'tickers_select',curDateTime);
								}
								
								if(!_.isEmpty(last_tickers)){
									last_tickers=last_tickers.tickers;
									_.forEach(last_tickers,function(ticker){
										var filter=_.filter(tickers,{product:ticker.product});
										if(_.isEmpty(filter)){
											ticker.is_old='yes';
											tickers.push(ticker);
										}
									});
								}
								
								ExchangeTickers.create({exchange_id:exchange_id,tickers:tickers,date_created:curDateTime},function(err,data){
									if(err){ 
										ApiService.exchangeErrors('livecoin','query_insert',err,'tickers_insert',curDateTime);
									}
								});
							});
						}	
					
					}).
					catch(err=> { 
						ApiService.exchangeErrors('livecoin','api',err,'tickers_api_select',curDateTime);
					});
				});
			}	
		});
		
		//PROCESS TO CALCULATE TOTAL CRYPTO PRICE
		TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
			if(err){ 
				ApiService.exchangeErrors('totalcryptoprice','query_select',err,'exchange_select',curDateTime);
			}
			var tc100=0;
			var total_usd_market_cap=0;
			var tcw100=0;
			if(!_.isEmpty(totalCryptoPrices)){ 
				totalCryptoPrices=_.head(totalCryptoPrices);
				totalCryptoPrices=totalCryptoPrices.prices;
				var temp=[];
				_.forEach(totalCryptoPrices,function(ticker){
					if(ticker.quote_currency=='usd'){
						temp.push(ticker);
					}
				});
				temp.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
				temp=_.slice(temp,0,100);
				_.forEach(temp,function(ticker){
					tc100+=parseFloat(ticker.price);
				});
				tc100=tc100/temp.length;
		
				ExchangeList.findOne({name:'coinmarketcap'},function(err, coinmarketcapExchange){
					if(err){ 
						ApiService.exchangeErrors('totalcryptoprice','query_select',err,'exchange_select',curDateTime);
					}
					if(!_.isEmpty(coinmarketcapExchange)){
						var coinMarketTickers=ExchangeTickers.findOne();
						coinMarketTickers.where({exchange_id:coinmarketcapExchange.id});
						coinMarketTickers.sort('id DESC');
						coinMarketTickers.exec(function(err,coinMarketTickers){
							if(err){ 
								ApiService.exchangeErrors('totalcryptoprice','query_select',err,'tickers_select',curDateTime);
							}
							if(!_.isEmpty(coinMarketTickers)){
								coinMarketTickers=coinMarketTickers.tickers;
								coinMarketTickers=_.reject(coinMarketTickers,{market_cap_usd:null});
								coinMarketTickers.sort(function(a,b){ if(parseFloat(a.market_cap_usd)>parseFloat(b.market_cap_usd)){return -1;}else {return 1;}});
								coinMarketTickers=_.slice(coinMarketTickers,0,100);
							
								_.forEach(coinMarketTickers,function(ticker){
									total_usd_market_cap=total_usd_market_cap+parseFloat(ticker.market_cap_usd);
								});
								
								_.forEach(coinMarketTickers,function(ticker){
									ticker.weight=parseFloat(ticker.market_cap_usd)/total_usd_market_cap;
									ticker.price_usd_weight=parseFloat(ticker.price_usd)*parseFloat(ticker.weight); 
									tcw100=tcw100+parseFloat(ticker.price_usd_weight);
								});
								tcw100=tcw100/coinMarketTickers.length;
								TotalCryptoPrice.create({tc100: tc100, total_usd_market_cap: total_usd_market_cap, tcw100: tcw100,date_created: curDateTime},function(err,data){ if(err){
									ApiService.exchangeErrors('totalcryptoprice','query_insert',err,'tickers_insert',curDateTime);
								}});
							}
						});
					}
				});
			}
		});
		
		//PROCESS TO CREATE TOTAL CRYPTO PRICES/CURRENCIES PRICES
		TotalCryptoPrices.find({ "date_created" : { ">": date_after } }).sort('id ASC').exec(function(err, charts){
			if(err){ 
				ApiService.exchangeErrors('totalcryptoprices','query_select',err,'tickers_select',curDateTime);
			}
			
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
				ExchangeDataService.cexMarketData()
			]
			).then(response => { 
				var exchange_objects={gdax:response[0].data, bittrex:response[1].data,coinmarketcap:response[2].data,bitfinex:response[3].data,hitbtc:response[4].data,gate:response[5].data,kuna:response[6].data,okex:response[7].data,binance:response[8].data,huobi:response[9].data,gemini:response[10].data,kraken:response[11].data,bitflyer:response[12].data,bithumb:response[13].data,bitstamp:response[14].data,bitz:response[15].data,lbank:response[16].data,coinone:response[17].data,wex:response[18].data,exmo:response[19].data,liqui:response[20].data,korbit:response[21].data,bitmex:response[22].data,livecoin:response[23].data,cex:response[24].data};
				var total_crypto_prices=[];
				
				_.forEach(Object.keys(exchange_objects),function(exchange){
					_.forEach(exchange_objects[exchange],function(ticker){
						var product='';
						var base_currency='';
						var quote_currency='';
						switch(exchange){
							case 'gdax': 
								product=_.toLower(_.replace(ticker.id,'-',''));
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.price,volume:ticker.volume,ask:ticker.ask,bid:ticker.bid,last:ticker.price});
							break;
							case 'bittrex':
								product=_.toLower(_.replace(ticker.MarketName,'-',''));
								base_currency=_.toLower(ticker.BaseCurrency);
								quote_currency=_.toLower(ticker.MarketCurrency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.Last,volume:ticker.Volume,high:ticker.High,low:ticker.Low,ask:ticker.Ask,bid:ticker.Bid,last:ticker.Last});
							break;
							case 'coinmarketcap':
								if(!_.isEmpty(ticker.market_cap_usd)){
									product=_.toLower(ticker.symbol+'USD');
									base_currency=_.toLower(ticker.symbol);
									quote_currency=_.toLower('USD');	
									total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.price_usd,volume:ticker['24h_volume_usd'],market_cap_usd:ticker.market_cap_usd});
								}	
							break;
							case 'bitfinex':
								product=_.toLower(ticker.product_id);
								base_currency=_.toLower(product.substr(0,3));
								quote_currency=_.replace(product,base_currency,'');	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last_price,volume:ticker.volume,high:ticker.high,low:ticker.low,ask:ticker.ask,bid:ticker.bid,last:ticker.last_price});
							break;
							case 'hitbtc':
								product=_.toLower(ticker.symbol);
								base_currency=_.toLower(ticker.baseCurrency);
								quote_currency=_.toLower(ticker.quoteCurrency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.volume,high:ticker.high,low:ticker.low,ask:ticker.ask,bid:ticker.bid,last:ticker.last});
							break;
							case 'gate':
								product=_.toLower(_.replace(ticker.product,'_',''));
								base_currency=_.toLower(_.join(_.split(ticker.product,'_',1)));
								quote_currency=_.replace(product,base_currency,'');	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.baseVolume,high:ticker.high24hr,low:ticker.low24hr,ask:ticker.lowestAsk,bid:ticker.highestBid,last:ticker.last});
							break;
							case 'okex':
								product=_.toLower(_.replace(ticker.product,'_',''));
								base_currency=_.toLower(_.join(_.split(ticker.product,'_',1)));
								quote_currency=_.replace(product,base_currency,'');	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.ticker.last,volume:ticker.ticker.vol,high:ticker.ticker.high,low:ticker.ticker.low,ask:ticker.ticker.sell,bid:ticker.ticker.buy,last:ticker.ticker.last});
							break;
							case 'binance':
								product=_.toLower(ticker.symbol);
								base_currency=_.toLower(ticker.baseAsset);
								quote_currency=_.toLower(ticker.quoteAsset);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.lastPrice,volume:ticker.volume,high:ticker.highPrice,low:ticker.lowPrice,ask:ticker.askPrice,bid:ticker.bidPrice,last:ticker.lastPrice});
							break;
							case 'huobi':
								product=_.toLower(ticker.product);
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.tick.bid[0],volume:ticker.tick.vol,high:ticker.high,low:ticker.low,ask:ticker.tick.ask[0],bid:ticker.tick.bid[0],last:ticker.tick.bid[0]});
							break;
							case 'gemini':
								product=_.toLower(ticker.product);
								base_currency=_.toLower(ticker.currency);
								quote_currency=_.toLower(_.replace(product,base_currency,''	));	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.vol,ask:ticker.ask,bid:ticker.bid,last:ticker.last});
							break;
							case 'kraken':
								product=_.toLower(ticker.product);
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.volume,high:ticker.high,low:ticker.low,ask:ticker.ask,bid:ticker.bid,last:ticker.last});
							break;
							case 'bitflyer':
								product=_.toLower(_.replace(ticker.product,'_'));
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.best_bid,volume:ticker.volume,ask:ticker.best_ask,bid:ticker.best_bid,last:ticker.best_bid});
							break;
							case 'bithumb':
								product=_.toLower(ticker.product);
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.buy_price,volume:ticker.volume_1day,high:ticker.max_price,low:ticker.min_price,ask:ticker.sell_price,bid:ticker.buy_price,last:ticker.buy_price});
							break;
							case 'bitstamp':
								product=_.toLower(ticker.product);
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.volume,high:ticker.high,low:ticker.low,ask:ticker.ask,bid:ticker.bid,last:ticker.last});
							break;
							case 'bitz':
								product=_.toLower(_.replace(ticker.product,'_',''));
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.vol,high:ticker.high,low:ticker.low,ask:ticker.sell,bid:ticker.buy,last:ticker.last});
							break;
							case 'lbank':
								product=_.toLower(_.replace(ticker.symbol,'_',''));
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.ticker.latest,volume:ticker.ticker.vol,high:ticker.ticker.high,low:ticker.ticker.low,last:ticker.ticker.latest});
							break;
							case 'coinone':
								product=_.toLower(ticker.product);
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.volume,high:ticker.high,low:ticker.low,last:ticker.last});
							break;
							case 'wex':
								product=_.toLower(_.replace(ticker.product,'_',''));
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.vol,high:ticker.high,low:ticker.low,ask:ticker.sell,bid:ticker.buy,last:ticker.last});
							break;
							case 'exmo':
								product=_.toLower(_.replace(ticker.product,'_',''));
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last_trade,volume:ticker.vol,high:ticker.high,low:ticker.low,ask:ticker.sell_price,bid:ticker.buy_price,last:ticker.last_trade});
							break;
							case 'liqui':
								product=_.toLower(_.replace(ticker.product,'_',''));
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.vol,high:ticker.high,low:ticker.low,ask:ticker.sell,bid:ticker.buy,last:ticker.last});
							break;
							case 'korbit':
								product=_.toLower(_.replace(ticker.product,'_',''));        
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.volume,high:ticker.high,low:ticker.low,ask:ticker.ask,bid:ticker.bid,last:ticker.last});
							break;
							case 'bitmex':
								product=_.toLower(_.replace(ticker.symbol,'_',''));        
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.lastPrice,volume:ticker.totalVolume,ask:ticker.askPrice,bid:ticker.bidPrice,last:ticker.lastPrice});
							break;
							case 'livecoin':
								product=_.toLower(ticker.product);        
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.volume,ask:ticker.best_ask,bid:ticker.best_bid,last:ticker.last});
							break;
							case 'cex':
								product=_.toLower(ticker.product);        
								base_currency=_.toLower(ticker.base_currency);
								quote_currency=_.toLower(ticker.quote_currency);	
								total_crypto_prices.push({product:product,base_currency:base_currency,quote_currency:quote_currency,price:ticker.last,volume:ticker.volume,high:ticker.high,low:ticker.low,ask:ticker.ask,bid:ticker.bid,last:ticker.last});
							break;
							default:
							break;
						}
					});	
				});
				
				var temp=[];
				var insert_array=[];
				_.forEach(total_crypto_prices,function(ticker){
					var exists=false;
					_.forEach(temp,function(data){
						if(data.product==ticker.product){
							if(!_.isEmpty(ticker.price)){data.prices.push(parseFloat(ticker.price));}
							if(!_.isEmpty(ticker.volume)){data.volumes.push(parseFloat(ticker.volume));}
							if(!_.isEmpty(ticker.high)){data.max_prices.push(parseFloat(ticker.high));}
							if(!_.isEmpty(ticker.low)){data.min_prices.push(parseFloat(ticker.low));}
							if(!_.isEmpty(ticker.ask)){data.asks.push(parseFloat(ticker.ask));}
							if(!_.isEmpty(ticker.bid)){data.bids.push(parseFloat(ticker.bid));}
							if(!_.isEmpty(ticker.last)){data.lasts.push(parseFloat(ticker.last));}
							if(!_.isEmpty(ticker.market_cap_usd)){data.market_cap_usds.push(parseFloat(ticker.market_cap_usd));}
							exists=true;
						}
					});
					if(!exists){
						var prices=[];
						var volumes=[];
						var max_prices=[];
						var min_prices=[];
						var asks=[];
						var bids=[];
						var lasts=[];
						var market_cap_usds=[];
						if(!_.isEmpty(ticker.price)){prices.push(parseFloat(ticker.price));}
						if(!_.isEmpty(ticker.volume)){volumes.push(parseFloat(ticker.volume));}
						if(!_.isEmpty(ticker.high)){max_prices.push(parseFloat(ticker.high));}
						if(!_.isEmpty(ticker.low)){min_prices.push(parseFloat(ticker.low));}
						if(!_.isEmpty(ticker.ask)){asks.push(parseFloat(ticker.ask));}
						if(!_.isEmpty(ticker.bid)){bids.push(parseFloat(ticker.bid));}
						if(!_.isEmpty(ticker.last)){lasts.push(parseFloat(ticker.last));}
						if(!_.isEmpty(ticker.market_cap_usd)){market_cap_usds.push(parseFloat(ticker.market_cap_usd));}
						temp.push({product:ticker.product,base_currency:ticker.base_currency,quote_currency:ticker.quote_currency,prices:prices,volumes:volumes,max_prices:max_prices,min_prices:min_prices,asks:asks,bids:bids,lasts:lasts,market_cap_usds:market_cap_usds});
					}
				});
				
				if(!_.isEmpty(temp)){ 
					_.forEach(temp,function(data){
						data.price=math.format(_.reduce(data.prices,function(sum,n){return sum+n;},0)/data.prices.length, {lowerExp: -100, upperExp: 100});
						data.volume=math.format(_.reduce(data.volumes,function(sum,n){return sum+n;},0)/data.volumes.length, {lowerExp: -100, upperExp: 100});
						data.high=math.format(Math.max.apply(Math,data.max_prices), {lowerExp: -100, upperExp: 100});
						data.low=math.format(Math.min.apply(Math,data.min_prices), {lowerExp: -100, upperExp: 100});
						
						if(data.asks.length>0){
							data.ask=math.format(_.reduce(data.asks,function(sum,n){return sum+n;},0)/data.asks.length, {lowerExp: -100, upperExp: 100});
						}
						
						if(data.bids.length>0){
							data.bid=math.format(_.reduce(data.bids,function(sum,n){return sum+n;},0)/data.bids.length, {lowerExp: -100, upperExp: 100});
						}
						
						if(data.lasts.length>0){
							data.last=math.format(_.reduce(data.lasts,function(sum,n){return sum+n;},0)/data.lasts.length, {lowerExp: -100, upperExp: 100});
						}
						
						if(data.market_cap_usds.length>0){
							data.market_cap_usd=math.format(_.reduce(data.market_cap_usds,function(sum,n){return sum+n;},0)/data.market_cap_usds.length, {lowerExp: -100, upperExp: 100});
						}	
						
						if(data.prices.length>0 && data.volumes.length>0 && data.max_prices.length>0 && data.min_prices.length>0){
							delete data.prices;
							delete data.volumes;
							delete data.max_prices;
							delete data.min_prices;
							delete data.asks;
							delete data.bids;
							delete data.lasts;
							delete data.market_cap_usds;
							insert_array.push(data);
						}
					});
					
					//PROCESS TO PREPARE CHART DATA/CHANGE 1 HOUR AND CHANGE 24 HOURS
					_.forEach(insert_array, function(data){
						var chart_data=[];
						_.forEach(charts,function(chart){
							chart=_.filter(chart.prices,{product:data.product});
							if(!_.isEmpty(chart)){
								chart=_.head(chart);
								chart_data.push(chart.price);
							}
						});
						
						chart_data.push(data.price);
						data.chart=chart_data;
						data.change_perc_1h=(chart_data[chart_data.length-1]-chart_data[chart_data.length-2])*100/chart_data[chart_data.length-2];
						data.change_perc_24h=(chart_data[chart_data.length-1]-chart_data[0])*100/chart_data[0];
					});
					
					TotalCryptoPrices.create({prices:insert_array,date_created:curDateTime},function(err,data){
						if(err){ 
							ApiService.exchangeErrors('totalcryptoprices','query_insert',err,'tickers_insert',curDateTime);
						}
						
						//PROCESS TO CREATE TOTALCRYPTO PRICES FOR FX DATA
						CronService.totalCryptoPricesCurrencies(insert_array, curDateTime, date_after);
					});
				}
			}).	
			catch(err => {  
				ApiService.exchangeErrors('totalcryptoprices','query_select',err,'tickers_select',curDateTime);
			});
		});	
	},
	
	totalCryptoPricesCurrencies:function(tickers, curDateTime, date_after){
		console.log('crone job for totalcrypto prices currency working');
		var moment = require('moment');
		var _ = require('lodash');
		var math = require('mathjs');
		
		TotalCryptoPricesCurrencies.find({ "date_created" : { ">": date_after } }).sort('id ASC').exec(function(err, charts){
			if(err){ 
				ApiService.exchangeErrors('totalcryptopricescurrencies','query_select',err,'tickers_select',curDateTime);
			}
			
			return Promise.all([
				ExchangeDataService.fxMarketDataRelativePrices()
			]
			).then(response => { 
				var fx_currencies_prices=response[0].data;
				var temp_price_array=[];
		
				if(!_.isEmpty(fx_currencies_prices)){
					var temp_tc_currency_array=[];
					_.forEach(tickers,function(ticker){
						if(_.indexOf(temp_tc_currency_array,ticker.base_currency)<0)
						{
							var fx_currency_price=_.filter(fx_currencies_prices,{currency:_.toUpper(ticker.quote_currency)});
							if(!_.isEmpty(fx_currency_price)){
								temp_tc_currency_array.push(ticker.base_currency);
								temp_price_array.push({base_currency:ticker.base_currency,quote_currency:ticker.quote_currency,price:ticker.price,chart:[]});
								fx_currency_price=_.head(fx_currency_price);
								_.forEach(fx_currency_price.prices,function(currency_price){
									temp_price_array.push({base_currency:ticker.base_currency,quote_currency:_.toLower(currency_price.currency),price:ticker.price*currency_price.price,chart:[]});
								});
							}
						}
					});
				}
				
				if(!_.isEmpty(temp_price_array)){
					//PROCESS TO PREPARE CHART DATA/CHANGE AND CHANGE 24 HOURS
					_.forEach(temp_price_array, function(data){
						_.forEach(charts,function(chart){
							chart=_.filter(chart.prices,{base_currency:data.base_currency,quote_currency:data.quote_currency});
							if(!_.isEmpty(chart)){
								chart=_.head(chart);	
								data.chart.push(chart.price);
							}
						});
						data.chart.push(data.price);
						if(data.chart.length>=2){
							data.change_perc_1h=(data.chart[data.chart.length-1]-data[data.chart.length-2])*100/data.chart[data.chart.length-2];
							data.change_perc_24h=(data.chart[data.chart.length-1]-data.chart[0])*100/data.chart[0];
						}
						else{
							data.change_perc_1h=0;
							data.change_perc_24h=0;
						}
						
						
					});
					
					TotalCryptoPricesCurrencies.create({prices:temp_price_array,date_created:curDateTime},function(err,data){
						if(err){ 
							ApiService.exchangeErrors('totalcryptopricescurrencies','query_insert',err,'tickers_insert',curDateTime);
						}
					});
				}
			}).	
			catch(err => {  
				ApiService.exchangeErrors('totalcryptopricescurrencies','query_select',err,'tickers_select',curDateTime);
			});
			
			
		});
	},
	
	createExchangeTickers3:function(){
		console.log('crone job for create tickers3 working');
		var moment = require('moment');
		var _ = require('lodash');
		var math = require('mathjs');
	
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		var date_after = moment().subtract(24*30, 'hours').toDate();
		
		//PROCESS TO CREATE FIX PRICES FOR PAID USERS
		TotalCryptoFix.find({ "date_created" : { ">": date_after } }).sort('id ASC').exec(function(err, charts){
			if(err){ 
				ApiService.exchangeErrors('totalcryptofix','query_select',err,'tickers_select',curDateTime);
			}
			
			return Promise.all([
				ExchangeDataService.totalCryptoPricesPairs(),
				ExchangeDataService.fxMarketDataRelativePrices()
			]
			).then(response => { 
				var exchange_objects={tc:response[0].data,fx:response[1].data};
				var fx_currencies_prices=exchange_objects.fx;
				var temp=[];
				var temp_price_array=[];
		
				if(!_.isEmpty(fx_currencies_prices)){
					var temp_tc_currency_array=[];
					_.forEach(exchange_objects.tc,function(ticker){
						if(_.indexOf(temp_tc_currency_array,ticker.base_currency)<0)
						{
							var fx_currency_price=_.filter(fx_currencies_prices,{currency:_.toUpper(ticker.quote_currency)});
							if(!_.isEmpty(fx_currency_price)){
								temp_tc_currency_array.push(ticker.base_currency);
								temp_price_array=[];
								temp_price_array.push({currency:_.toUpper(ticker.quote_currency),price:ticker.price,chart:[]});
								fx_currency_price=_.head(fx_currency_price);
								_.forEach(fx_currency_price.prices,function(currency_price){
									temp_price_array.push({currency:currency_price.currency,price:ticker.price*currency_price.price,chart:[]});
								});
								temp.push({currency:_.toUpper(ticker.base_currency),prices:temp_price_array});
							}
						}
					});
				}
				
				if(!_.isEmpty(temp)){
					//PROCESS TO PREPARE CHART DATA/CHANGE AND CHANGE 24 HOURS
					_.forEach(temp, function(data){
						_.forEach(charts,function(chart){
							chart=_.filter(chart.prices,{currency:data.currency});
							if(!_.isEmpty(chart)){
								chart=_.head(chart);
								_.forEach(chart.prices,function(chart_price){
									_.forEach(data.prices,function(data_price){
										if(data_price.currency==chart_price.currency){
											data_price.chart.push(chart_price.price);
										}
									});
								});
							}
						});
						_.forEach(data.prices,function(data_price){
							data_price.chart.push(data_price.price);
							data_price.change_perc_24h=(data_price.chart[data_price.chart.length-1]-data_price.chart[0])*100/data_price.chart[0];
						});
					});
					
					TotalCryptoFix.create({prices:temp,date_created:curDateTime},function(err,data){
						if(err){ 
							ApiService.exchangeErrors('totalcryptofix','query_insert',err,'tickers_insert',curDateTime);
						}
					});
				}
			}).	
			catch(err => {  
				ApiService.exchangeErrors('totalcryptofix','query_select',err,'tickers_select',curDateTime);
			});
		});	
	},
	
	socketUpdates:function(){
		FrontendService.socketData();
		//CronService.dataPrediction();
	},
	
	dataPrediction:function(){
		var _ = require('lodash');
		var moment = require('moment');
		const Json2csvParser = require('json2csv').Parser;
		var fs = require('fs');
		const fields = ['Timestamp','Open','High','Low','Volume_(BTC)','Volume_(Currency)','Weighted_Price'];
	
		var data_array=[];
		TotalCryptoPricesHistory.find().sort({id:1}).exec(function(err,totalCryptoPricesHistory){ 
			if(!_.isEmpty(totalCryptoPricesHistory)){ 
				_.forEach(totalCryptoPricesHistory,function(history){
					_.forEach(history.prices,function(price){
						var exists=false;
						_.forEach(data_array,function(data){
							if(data.base_currency==price.base_currency && data.quote_currency==price.quote_currency){
								exists=true;
								data.history.push({'Timestamp':moment(history.date_created, "YYYY-MM-DD h:i:s").format('X'),'Open':0,'High':price.high,'Low':price.low,'Volume_(BTC)':0,'Volume_(Currency)':price.volume,'Weighted_Price':price.price});
							}
						});
						if(!exists){
							var temp=[];
							temp.push({'Timestamp':moment(history.date_created, "YYYY-MM-DD h:i:s").format('X'),'Open':0,'High':price.high,'Low':price.low,'Volume_(BTC)':0,'Volume_(Currency)':price.volume,'Weighted_Price':price.price});
							data_array.push({base_currency:price.base_currency,quote_currency:price.quote_currency,history:temp});
						}
					});
				});
	
				//PROCESS TO CREATE CSV FILE
				//console.log(data_array[0].history);
				const json2csvParser = new Json2csvParser({fields, unwind: [], unwindBlank: true });
				const csv = json2csvParser.parse(data_array[0].history);
				fs.writeFile(process.cwd()+'/assets/excel/file.csv', csv, function(err) {
					if (err) {
						//throw err;
					}
					else{
						var fileUrl=process.env.HOST+':'+process.env.PORT+'/assets/excel/file.csv';
						console.log(fileUrl);
						ApiService.dataPredictionAPI(fileUrl,'file.csv').then(response => {console.log(response);}).catch(err => {});
						console.log('file saved');
					}
				  }); 
				//console.log(csv);
			}
		});
	},
	
	deleteData:function(){	
		console.log('crone job for delete records working');
		var moment = require('moment');
		var curDateTime=moment().format('YYYY-MM-DD HH:mm:ss');
		var delete_before = moment().subtract(24*15, 'hours').toDate();
		//DELETE API REQUESTS IPS
		ApiRequestIps.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){ 
				ApiService.exchangeErrors('api_request_ips','delete',err,'request_ips_delete',curDateTime);
			}
		});
		
		//DELETE EXCHANGE ERRORS
		ExchangeErrors.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){
				ApiService.exchangeErrors('exchange_errors','delete',err,'errors_delete',curDateTime);
			}
		});
		
		//DELETE EXCHANGE STATS
		ExchangeStats.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){
				ApiService.exchangeErrors('exchange_stats','delete',err,'stats_delete',curDateTime);
			}
		});
		
		//DELETE EXCHANGE TRADES
		ExchangeTrades.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){ console.log(err);
				ApiService.exchangeErrors('exchange_trades','delete',err,'trades_delete',curDateTime);
			}
		});
		
		//DELETE EXCHANGES TICKERS
		ExchangeTickers.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){
				ApiService.exchangeErrors('tickers','delete',err,'tickers_delete',curDateTime);
			}
		});
		
		//DELETE TOTALCRYPTO PRICES
		TotalCryptoPrices.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){
				ApiService.exchangeErrors('totalcryptoprices','delete',err,'tickers_delete',curDateTime);
			}
		});
		
		//DELETE TOTALCRYPTO PRICES CURRENCIES
		TotalCryptoPricesCurrencies.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){
				ApiService.exchangeErrors('totalcryptopricescurrencies','delete',err,'tickers_delete',curDateTime);
			}
		});
		
		//DELETE EXCHANGES TICKERS ALERTS
		ExchangeTickersAlerts.destroy({date_created:{'<':delete_before}}).exec(function(err){
			if(err){
				ApiService.exchangeErrors('alert_tickers','delete',err,'alert_tickers_delete',curDateTime);
			}
		});
	},
};
