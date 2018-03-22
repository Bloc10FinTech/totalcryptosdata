/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	doLogin:function(request, response){
		var params = request.params.all();
		sails.models.Auth.findByusername(params.username).done(function(err, user){
			if(err){
				response.send(500, { error: "DB Error" });
			}
			else{
				if(user){
					var hasher = require("password-hash");
					if (hasher.verify(password, user.password)) {
						req.session.user = usr;
						res.send(usr);
					} 
					else {
						res.send(400, { error: "Wrong Password" });
					}
				}
				else{
					res.send(404, { error: "User not Found" });
				}
			}
			
		});
		response.send(params);
	}
};

