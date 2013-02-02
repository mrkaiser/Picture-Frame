//includes functions for obtaining the images for any daily shirts
var $ = require('jquery');
var request = require('request');





module.exports = {
	teefury: function(serverResponse){
		request('http://www.teefury.com',function (err,response,body){
			var imgsrc = $("#zoom-pic",body).children().first().attr("src");
			console.log("TEEFURY:"+imgsrc);
			serverResponse.send(imgsrc)
			//return imgsrc;
		});
	},
	qwertee: function(serverResponse){
		request('http://www.qwertee.com',function (err,response,body){
			var imgsrc = "http://www.qwertee.com"+$("#thumb-3",body).children().attr("href");
			console.log("qwertee:"+imgsrc);
			serverResponse.send(imgsrc);
		});
	},
	woot: function(serverResponse){
		request('http://www.shirt.woot.com', function (err,response,body){
			//we gotta make another request to the "full size page"
			var link = $(".wantone",body).attr("href");
			//this link is actually a relative link
            link = "http://shirt.woot.com"+link;
            request(link, function(err,response,body){
            	var imgsrc = $(".fullsize-1",body).children().first().attr("src");
				console.log("woot:"+imgsrc);
				serverResponse.send(imgsrc);
            });
		});
	}

};