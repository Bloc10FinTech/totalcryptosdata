var head = document.getElementsByTagName("head")[0];
//LOAD BOOTSTRAP CSS	
var link1  = document.createElement('link');
link1.rel  = 'stylesheet';
link1.type = 'text/css';
link1.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
link1.media = 'all';
head.appendChild(link1);
//LOAD DATA TABLE CSS	
var link2  = document.createElement('link');
link2.rel  = 'stylesheet';
link2.type = 'text/css';
link2.href = 'https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css';
link2.media = 'all';
head.appendChild(link2);

if(typeof jQuery=='undefined'){
	//IN THIS CASE WE NEED TO WRITE JQUERY BASED/AJAX CODE IN NEW FILE AS JAVASCRIPT WILL NOT WAIT TO COMPLETE THE WRITE PROCESS BUT WAIT TO COMPLETE LOADING OF THIS FILE BEFORE GOES TO OTHER
	//document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
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
	var base_url='https://totalcryptos.com';
	var gainers_losers=$("div").attr('totalcryptos-gainers-losers');
	
	if(gainers_losers=='gainersp'){
		var url='/widget/gainers_data';
		var title='<h5><b>Top Gainers</b></h5>';
	}
	else if(gainers_losers=='losersp'){
		var url='/widget/losers_data';
		var title='<h5><b>Top Losers</b></h5>';
	}
	else if(gainers_losers=='gainersp_losersp'){
		var url='/widget/gainers_losers_data';
	}
	else if(gainers_losers=='gainersmp'){
		var url='/widget/gainers_data';
		var title='<h5><b>Top Gainers</b></h5>';
	}
	else if(gainers_losers=='losersmp'){
		var url='/widget/losers_data';
		var title='<h5><b>Top Losers</b></h5>';
	}
	else if(gainers_losers=='gainersmp_losersmp'){
		var url='/widget/gainers_losers_data';
	}
	
	$.ajax({
		type:'GET',
		url:base_url+url,
		success:function(data){  
			if(data.errCode==1){
				if(['gainersp_losersp','gainersmp_losersmp'].indexOf(gainers_losers)==-1){
					var str='<div class="table-responsive" style="margin-top:50px;">';
					str+=title;
					str+='<table class="display table-custom dataTable no-footer" style="width: 100%;" role="grid">';
					str+='<thead>';
					str+='<tr>';
					str+='<th>#</th>';
					if(['gainersp','losersp','gainersp_losersp'].indexOf(gainers_losers)>=0){
						str+='<th>Name</th>';
					}
					str+='<th>Symbol</th>';
					str+='<th>Price</th>';
					str+='<th>% 24h</th>';
					str+='</tr>'
					str+='</thead>';
					str+='<tbody>';
					data.data.forEach(function(gainer_loser,index){
						var even_odd_class='even';
						if(index%2==0){
							even_odd_class='odd';
						}
						var color='green';
						if(gainers_losers.indexOf('loser')>=0){
							color='red';
						}
						str+=table_row(index,even_odd_class,gainers_losers,color,gainer_loser);
					});
					str+='</tbody>';
					str+='</table>';
					str+='<h6>Powered by <a href="https://totalcryptos.com">totalcryptos.com<img src="https://totalcryptos.com/images/logo.png" style="width:15px;"/></a></h6>';
					str+='</div>';
					$("div[totalcryptos-gainers-losers]").replaceWith(str);
				}
				else{
					var str='<div class="table-responsive" style="margin-top:50px;">';
					str+='<h5><b>Top Gainers</b></h5>';
					str+='<table class="display table-custom dataTable no-footer" style="width: 100%;" role="grid">';
					str+='<thead>';
					str+='<tr>';
					str+='<th>#</th>';
					if(['gainersp_losersp'].indexOf(gainers_losers)>=0){
						str+='<th>Name</th>';
					}
					str+='<th>Symbol</th>';
					str+='<th>Price</th>';
					str+='<th>% 24h</th>';
					str+='</tr>'
					str+='</thead>';
					str+='<tbody>';
					data.data.gainers.forEach(function(gainer,index){
						var even_odd_class='even';
						if(index%2==0){
							even_odd_class='odd';
						}
						
						str+=table_row(index,even_odd_class,gainers_losers,'green',gainer);
					});
					str+='</tbody>';
					str+='</table>';
					str+='</div>';
					
					str+='<div class="table-responsive" style="margin-top:50px;">';
					str+='<h5><b>Top Losers</b></h5>';
					str+='<table class="display table-custom dataTable no-footer" style="width: 100%;" role="grid">';
					str+='<thead>';
					str+='<tr>';
					str+='<th>#</th>';
					if(['gainersp_losersp'].indexOf(gainers_losers)>=0){
						str+='<th>Name</th>';
					}
					str+='<th>Symbol</th>';
					str+='<th>Price</th>';
					str+='<th>% 24h</th>';
					str+='</tr>'
					str+='</thead>';
					str+='<tbody>';
					data.data.losers.forEach(function(loser,index){
						var even_odd_class='even';
						if(index%2==0){
							even_odd_class='odd';
						}
						
						str+=table_row(index,even_odd_class,gainers_losers,'red',loser);
					});
					str+='</tbody>';
					str+='</table>';
					str+='<h6>Powered by <a href="https://totalcryptos.com">totalcryptos.com<img src="https://totalcryptos.com/images/logo.png" style="width:15px;"/></a></h6>';
					str+='</div>';
					$("div[totalcryptos-gainers-losers]").replaceWith(str);
				}
			}
			else{
				$("div[totalcryptos-gainers-losers]").replaceWith(data.message);
			}
		}
	});	
}

function table_row(index,even_odd_class,gainers_losers,color,data){
	var str='<tr role="row" class="'+even_odd_class+'">';
	str+='<td class="sorting_1">'+(index+1)+'</td>';
	if(['gainersp','losersp','gainersp_losersp'].indexOf(gainers_losers)>=0){
		str+='<td><b>'+data.name+'</b></td>';
	}
	str+='<td>'+data.symbol+'</td>';
	str+='<td>'+parseFloat(data.price_usd).toFixed(5)+'</td>';
	str+='<td><span style="color:'+color+';font-weight:bold;">'+data.percent_change_24h+'%</span></td>';
	str+='</tr>';
	return str;
}
