/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
module.exports = {
	predators_data:function(request, response){
		PredatorTradeService.predators_data(request.param('currencies'),function(data){
		  return response.send(data);
		});
	},
	
	subscribe_room:function(request,response){
		var roomName=request.param('roomName');
		sails.sockets.join(request, roomName, function(err) {
			if (err){ return response.serverError(err);}
		});
		PredatorTradeService.predators_data_alerts(request);
		return response.json({message: 'Subscribed to a room called '+roomName+' at '+request.param('today')});
	}
};

