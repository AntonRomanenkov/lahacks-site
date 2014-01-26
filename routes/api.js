/*
 * Serve JSON to our AngularJS client
 */
var mcapi = require('mailchimp-api');
var mc = new mcapi.Mailchimp(require('../config').MC_API_KEY());
var list_id = require('../config').LIST_ID()

exports.subscribe = function(req, res){
  mc.lists.subscribe({id: list_id, email:{email:req.body.email}}, function(data) {
      res.contentType('json');
      res.send({ some: JSON.stringify({response:'success'}) });
      console.log('success');
    },
    function(error) {
      if (error.error) {
        //req.session.error_flash = error.code + ": " + error.error;
      } else {
        //req.session.error_flash = 'There was an error subscribing that user';
      }
      console.log(error);
    });
};