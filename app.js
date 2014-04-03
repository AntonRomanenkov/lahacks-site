/* comment */
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  engines = require('consolidate');

var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'blue')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
} 

//mailchimp stuff
app.post('/subscribe', api.subscribe);
app.post('/mail', api.mail);

// redirect all routes to index
app.get('*', routes.index);

/**
* Start Server
*/

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
