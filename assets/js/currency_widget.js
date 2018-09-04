if(typeof jQuery=='undefined'){
	//IN THIS CASE WE NEED TO WRITE JQUERY BASED/AJAX CODE IN NEW FILE AS JAVASCRIPT WILL NOT WAIT TO COMPLETE THE WRITE PROCESS BUT WAIT TO COMPLETE LOADING OF THIS FILE BEFORE GOES TO OTHER
	//document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
	
	var head = document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.onload = show_ticker_widget;
    head.appendChild(script);
}
else{
	var $ = jQuery.noConflict();
	(function() { setTimeout(show_ticker_widget, 100)})();
}

function show_ticker_widget(){
	var currency=$("div").attr('totalcryptos-currency');
	var show_volume=$("div").attr('totalcryptos-volume');
	var show_ask_bid=$("div").attr('totalcryptos-ask_bid');
	$.ajax({
		type:'GET',
		url:'https://totalcryptos.com/api/symbolsUSDPrices/'+currency,
		success:function(data){ 
			if(data.errCode==1){
				var price=data.data;
				var str='<div style="display:block;text-align:center;overflow:hidden;">';
				str+='<div style="width:100%;overflow:hidden;"><h2><img src="https://totalcryptos.com/images/currencies/'+price.base_currency+'.png" onError="this.src=\'https://totalcryptos.com/images/currency.png\'" style="width:18px;" />&nbsp;'+price.base_currency.toUpperCase()+'</h2><h3>'+parseFloat(price.price).toFixed(5)+' ('+price.quote_currency.toUpperCase()+')</h3>'+'</div>';
				if(show_volume=='true' && show_ask_bid=='true'){
					str+='<div style="width:100%;overflow:hidden;">';
					str+='<div style="width:33%;float:left;overflow:hidden;">';
					str+='<h4>Volume: '+parseFloat(price.volume).toFixed(2)+'</h4>';
					str+='</div>';
					str+='<div style="width:67%;float:right;overflow:hidden;">';
					str+='<div style="width:50%;float:left;overflow:hidden;">';
					str+='<h4>Ask: '+parseFloat(price.ask).toFixed(2)+'</h4>';
					str+='</div>';
					str+='<div style="width:50%;float:right;overflow:hidden;">';
					str+='<h4>Bid: '+parseFloat(price.bid).toFixed(2)+'</h4>';
					str+='</div>';
					str+='</div>';
					str+='</div>';
				}
				else if(show_volume=='true'){
					str+='<div style="width:100%;overflow:hidden;">';
					str+='<h4>Volume: '+parseFloat(price.volume).toFixed(2)+'</h4>';
					str+='</div>';
				}
				else if(show_ask_bid=='true'){
					str+='<div style="width:100%;overflow:hidden;">';
					str+='<div style="width:50%;float:left;overflow:hidden;">';
					str+='<h4>Ask: '+parseFloat(price.ask).toFixed(2)+'</h4>';
					str+='</div>';
					str+='<div style="width:50%;float:right;overflow:hidden;">';
					str+='<h4>Bid: '+parseFloat(price.bid).toFixed(2)+'</h4>';
					str+='</div>';
					str+='</div>';
					str+='</div>';
				}
				str+='</div>';
				$("div[totalcryptos-currency]").replaceWith(str);
			}
			else{
				$("div[totalcryptos-currency]").replaceWith(data.message);
			}
		}
	});
}
