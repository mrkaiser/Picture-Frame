var restify  = require('restify');
var shirts = require('./util/shirts.js');
var reddit = require('./util/reddit.js');

//BUILD A SERVER
var server = restify.createServer({
	name: 'PictureFrameServices'
});

//START THE SERVER!
server.listen(3000);

server.get('/hello',function(req,res,next){
	var returnable = {'name': 'hello'};
	//res.send(JSON.stringify(returnable));
	return next();
});


server.get('/teefury',function(req,res,next){
	shirts.teefury(res);
	return next();
});

server.get('/qwertee',function(req,res,next){
	shirts.qwertee(res);
	return next();
});

server.get('/shirtwoot',function(req,res,next){
	shirts.woot(res);
	return next();
});

server.get('/reddithot/:subredditName/:stories',function(req,res,next){
	console.log(req.params.subredditName+"|"+req.params.stories);
	reddit.subreddit_hot(res,req.params.subredditName,req.params.stories);
	return next();
});
