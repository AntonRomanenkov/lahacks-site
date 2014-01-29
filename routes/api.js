/*
 * Serve JSON to our AngularJS client
 */
var mcapi = require('mailchimp-api');
var mc = new mcapi.Mailchimp(process.env.MAILCHIMP_API_KEY);
var list_id = process.env.LIST_ID

exports.subscribe = function(req, res){
  mc.lists.subscribe({id: list_id, email:{email:req.body.email}}, function(data) {
      res.contentType('json');
      res.send({ some: JSON.stringify({response:'success'}) });
    },
    function(error) {
      res.contentType('json');
      res.send({ some: JSON.stringify({response:error.error}) });
    });
};
