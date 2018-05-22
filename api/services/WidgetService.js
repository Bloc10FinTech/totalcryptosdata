module.exports = {
	gainers_data:function(callBack){
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
						
						tickers=_.reject(tickers,{percent_change_24h:null});
						tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
						
						callBack({errCode:1,message:'Request processed successfully.',data:_.slice(tickers,0,10)});
					}).
					catch(err => {callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
				}
				else{
					callBack({errCode:404,message:'Record not found.',data:[]});
				}
			});	
		});
	},
	
	losers_data:function(callBack){
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
						
						tickers=_.reject(tickers,{percent_change_24h:null});
						tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
						
						callBack({errCode:1,message:'Request processed successfully.',data:_.slice(tickers.reverse(),0,10)});
					}).
					catch(err => {callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
				}
				else{
					callBack({errCode:404,message:'Record not found.',data:[]});
				}
			});	
		});
	},
	
	gainers_losers_data:function(callBack){
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
						
						tickers=_.reject(tickers,{percent_change_24h:null});
						tickers.sort(function(a,b){if(parseFloat(a.percent_change_24h)>parseFloat(b.percent_change_24h)){return -1;}else {return 1;}});
						
						callBack({errCode:1,message:'Request processed successfully.',data:{gainers:_.slice(tickers,0,10),losers:_.slice(tickers.reverse(),0,10)}});
					}).
					catch(err => {callBack({errCode:500,message:'Server error. Please try again.',data:[]});});
				}
				else{
					callBack({errCode:404,message:'Record not found.',data:[]});
				}
			});	
		});
	}
};
