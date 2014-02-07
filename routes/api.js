/*
 * Subscribe
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

/*
 * Contact
 */

var mailer = require('nodemailer');
var smtpTransport = mailer.createTransport('SMTP',{
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS 
    }
});

exports.mail = function(req, res) {
	if (!req.body.name)
		res.send('Please enter a name');
	if (!req.body.email)
		res.send('Please enter an email');
	if (!req.body.message)
		res.send('Please enter a message');

	var mailOptions = {
	    from: req.body.name, 
	    to: "info@lahacks.com",
	    subject: "Site Contact from " + req.body.name, // Subject line
	    html: 
	    ['<b>DO NOT REPLY TO THIS EMAIL</b>',
	     '<p>From: '+req.body.name+'</p>',
	     '<p>Phone: '+req.body.phone+'</p>',
	     '<p>Reply To: '+req.body.email+'</p>',
	     '<br>',
	     '<p>'+req.body.message+'</p>',
	     '<br>',
	     '<p><i>Yoav is the bees knees</i></p>'
	    ].join('\n')
	}
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        res.send('ERROR');
	    }else{
	        res.send('OK');
	    }
	    smtpTransport.close(); // shut down the connection pool, no more messages
	});
}





