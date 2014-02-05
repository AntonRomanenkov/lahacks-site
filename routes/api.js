/*
 * Serve JSON to our AngularJS client
 */
var mcapi = require('mailchimp-api');
var mc = new mcapi.Mailchimp(process.env.MAILCHIMP_API_KEY);
var list_id = process.env.LIST_ID;

exports.subscribe = function(req, res){
  if (req.body && req.body.email) {
	  mc.lists.subscribe({id: list_id, email:{email:req.body.email}}, function(data) {
	      res.contentType('json');
	      res.send({response:'success'});
	    },
	    function(error) {
	      res.contentType('json');
	      res.send({response:error.error});
	  });
  } else {
    res.send({response:'could not find email'});
  }
};
