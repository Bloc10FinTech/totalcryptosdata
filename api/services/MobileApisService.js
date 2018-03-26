module.exports = {
	symbolsUSDPrices:function(callBack){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,totalCryptoPrices){ 
				if(err){
					callBack({errCode:500,message:'Server error. Please try again.',data:[]});
				}
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
					callBack({errCode:1,message:'request processed successfully.',data:temp});
				}
				else{
					callBack({errCode:1,message:'request processed successfully.',data:[]});
				}
			});
		});
	},
	
	productsPrices:function(callBack){
		var _ = require('lodash');
		return new Promise(function(resolve,reject){
			TotalCryptoPrices.find().limit(1).sort({id:-1}).exec(function(err,productPrices){ 
				if(err){
					callBack({errCode:500,message:'Server error. Please try again.',data:[]});
				}
				if(!_.isEmpty(productPrices)){ 
					productPrices=_.head(productPrices);
					productPrices=productPrices.prices;
					productPrices.sort(function(a,b){ if(parseFloat(a.volume)>parseFloat(b.volume)){return -1;}else {return 1;}});
					callBack({errCode:1,message:'request processed successfully.',data:productPrices});
				}
				else{
					callBack({errCode:1,message:'request processed successfully.',data:[]});
				}
			});
		});
	}
};
