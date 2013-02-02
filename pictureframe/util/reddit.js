//includes functions for obtaining the images for any daily shirts
var $ = require('jquery');
var url = require('url');
var request = require('request');
var DEFAULT_SUBREDDIT_STORIES = 5;
var DEFAULT_SUBREDDIT_NAME = 'beer';
var REDDIT_URL = 'http://www.reddit.com';

module.exports = {
	subreddit_hot: function (serverResponse,subreddit,stories) {
		//default stories
		stories = typeof stories !== 'undefined' ? stories : DEFAULT_SUBREDDIT_STORIES;
		subreddit = typeof subreddit !== 'undefined' ? subreddit : DEFAULT_SUBREDDIT_NAME;
		//make the request
		var options ={
			url : url.parse(REDDIT_URL+"/r/"+subreddit+"/hot.json"+"?"+"limit="+stories),
			headers : {'User-Agent' :  'Super Cool Reddit Service for Local Widgets! by /u/mrkaiser'}, 
			json: true
		};
		request(options,function(err,response,body){
			serverResponse.send(body);
		});
	} 

};
