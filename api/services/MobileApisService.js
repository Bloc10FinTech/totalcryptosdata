module.exports = {
	
	tcPrices:function(callBack,request){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'tcPrices').then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrice.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrice){ 
						if(!_.isEmpty(totalCryptoPrice)){ 
							totalCryptoPrice=_.head(totalCryptoPrice);
							callBack({errCode:1,message:'Request processed successfully.',data:{tc100:Math.round(totalCryptoPrice.tc100),total_usd_market_cap:Math.round(totalCryptoPrice.total_usd_market_cap),tcw100:Math.round(totalCryptoPrice.tcw100)}});
						}
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}
					});
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
		});
	},
	
	symbolsUSDPrices:function(callBack,request){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'symbolsUSDPrices').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.',data:[]});
						}
						if(!_.isEmpty(totalCryptoPrices)){ 
							totalCryptoPrices=_.head(totalCryptoPrices);
							totalCryptoPrices=totalCryptoPrices.prices;
							totalCryptoPrices=_.filter(totalCryptoPrices,{quote_currency:'usd'});
							totalCryptoPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							callBack({errCode:1,message:'Request processed successfully.',data:totalCryptoPrices});
						}
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}
					});
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
		});
	},
	
	symbolUSDPrice:function(callBack,request,currency){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'symbolUSDPrice').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.',data:[]});
						}
						if(!_.isEmpty(totalCryptoPrices)){ 
							totalCryptoPrices=_.head(totalCryptoPrices);
							totalCryptoPrices=totalCryptoPrices.prices;
							totalCryptoPrice=_.filter(totalCryptoPrices,{base_currency:currency,quote_currency:'usd'});
							if(!_.isEmpty(totalCryptoPrice)){
								totalCryptoPrice=_.head(totalCryptoPrice);
								callBack({errCode:1,message:'Request processed successfully.',data:totalCryptoPrice});
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}
					});
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
		});
	},
	
	productsPrices:function(callBack,request){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'productsPrices').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.',data:[]});
						}
						if(!_.isEmpty(productPrices)){ 
							productPrices=_.head(productPrices);
							productPrices=productPrices.prices;
							productPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							callBack({errCode:1,message:'Request processed successfully.',data:productPrices});
						}
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}
					});
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
		});
	},
	
	productPrice:function(callBack,request,product){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'productPrice').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.',data:[]});
						}
						if(!_.isEmpty(productPrices)){ 
							productPrices=_.head(productPrices);
							productPrices=productPrices.prices;
							productPrice=_.filter(productPrices,{product:product});
							if(!_.isEmpty(productPrice)){
								productPrice=_.head(productPrice);
								callBack({errCode:1,message:'Request processed successfully.',data:productPrice});
							}
							else{
								callBack({errCode:404,message:'Record not found.',data:[]});
							}
						}
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}
					});
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
		});
	},
	
	topProductsPrices:function(callBack,request){
		var _ = require('lodash');
		MobileApisService.checkUpdateApiCalls(request.ip,'topProductsPrices').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.',data:[]});
						}
						if(!_.isEmpty(productPrices)){ 
							productPrices=_.head(productPrices);
							productPrices=productPrices.prices;
							productPrices=_.filter(productPrices,{quote_currency:'usd'});
							productPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
							productPrices=_.slice(productPrices,0,10);
							callBack({errCode:1,message:'Request processed successfully.',data:productPrices});
						}
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}
					});
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
		});
	},
	
	tcHistory24H:function(callBack,request){
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
							callBack({errCode:500,message:'Server error. Please try again.',data:[]});
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
							callBack({errCode:1,message:'Request processed successfully.',data:{tc100_array:tc100_array,tcw100_array:tcw100_array,market_cap_array:market_cap_array}});
						} 
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}	
					});
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
		});
	},
	
	topGainersLosers:function(callBack,request){
		var _=require('lodash');
		
		MobileApisService.checkUpdateApiCalls(request.ip,'topGainersLosers').
		then(response => {
			if(response){
				return new Promise(function(resolve,reject){
					ExchangeList.findOne({name:'coinmarketcap'},function(err, coin_market_exchange){
						if(err){
							callBack({errCode:500,message:'Server error. Please try again.',data:[]});
						}
						if(!_.isEmpty(coin_market_exchange)){
							var tickers=ExchangeTickers.findOne();
							tickers.where({exchange_id:coin_market_exchange.id});
							tickers.sort('id DESC');
							tickers.then(function(tickers){
								var tickers=tickers.tickers;
								tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
								callBack({errCode:1,message:'Request processed successfully.',data:{gainers:_.slice(tickers,0,5),losers:_.slice(tickers.reverse(),0,5)}});
							}).
							catch(err => {callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
						}
						else{
							callBack({errCode:404,message:'Record not found.',data:[]});
						}
					});	
				});
			}
			else{
				callBack({errCode:300,message:'Api call limit exceeded.',data:[]});
			}
		}).
		catch(err => {
			callBack({errCode:500,message:'Server error. Please try again.',data:[]});
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
	}
};
