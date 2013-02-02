
/**
 * Module dependencies.
 */

var express = require('express')
  ,jsdom = require('jsdom')
  , request =require('request')
  , url = require('url') 
  , routes = require('./routes')
  , xml2js = require('xml2js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

/**
* teefury scraper
*/ 
app.get('/furyscraper', function(req, res){
   //Tell the request that we want to fetch teefury, send the results to a callback function
        request({uri: 'http://www.teefury.com'}, function(err, response, body){
                var self = this;
      self.items = new Array();//I feel like I want to save my results in an array
 
      //Just a basic error check
                if(err && response.statusCode !== 200){console.log('Request error.');}
                //Send the body param as the HTML code we will parse in jsdom
      //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
      jsdom.env({
                        html: body,
                        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js']
                }, function(err, window){
         //Use jQuery just as in a regular HTML page
                        var $ = window.jQuery;
                        var imgsrc = $("#zoom-pic").children().first().attr("src");
                        console.log("teefury"+imgsrc);
                        res.end(imgsrc);
                });
        });
});

/**
* shirt.woot scraper
*/ 
app.get('/shirtwootscraper', function(req, res){
   //Tell the request that we want to fetch youtube.com, send the results to a callback function
        request({uri: 'http://www.shirt.woot.com'}, function(err, response, body){
          //Just a basic error check
          if(err && response.statusCode !== 200){console.log('Request error.');}
            //Send the body param as the HTML code we will parse in jsdom
            //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
            jsdom.env({
                        html: body,
                        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js']
                      }, function(err, window){
                          //Use jQuery just as in a regular HTML page
                          var $ = window.jQuery;
                          var link = $(".wantone").attr("href");
                          //this link is actually a relative link
                          link = "http://shirt.woot.com"+link;
                          jsdom.env(link, [
                            'https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js'
                          ],
                          function(errors, window) {
                            var $ = window.$;
                            var imgsrc = $(".fullsize-1").children().first().attr("src");
                            console.log("shirt.woot\t"+imgsrc);
                            res.end(imgsrc);
                          });
                        });
                });
});

app.get('/qwerteescraper', function(req, res){
   //Tell the request that we want to fetch youtube.com, send the results to a callback function
        request({uri: 'http://www.qwertee.com'}, function(err, response, body){
                var self = this;
      self.items = new Array();//I feel like I want to save my results in an array
 
      //Just a basic error check
                if(err && response.statusCode !== 200){console.log('Request error.');}
                //Send the body param as the HTML code we will parse in jsdom
      //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
      jsdom.env({
                        html: body,
                        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js']
                }, function(err, window){
         //Use jQuery just as in a regular HTML page
                        var $ = window.jQuery;
                        var imgsrc = "http://www.qwertee.com"+$("#thumb-3").children().attr("href");
                        console.log("qwertee\t"+imgsrc);
                        res.end(imgsrc);
                });
        });
});


app.get('/riptscraper', function(req, res){
   //Tell the request that we want to fetch youtube.com, send the results to a callback function
        request({uri: 'http://www.riptapparel.com'}, function(err, response, body){
                var self = this;
      self.items = new Array();//I feel like I want to save my results in an array
 
      //Just a basic error check
                if(err && response.statusCode !== 200){console.log('Request error.');}
                //Send the body param as the HTML code we will parse in jsdom
      //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
      jsdom.env({
                        html: body,
                        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js']
                }, function(err, window){
         //Use jQuery just as in a regular HTML page
                        var $ = window.jQuery;
                        var imgsrc = $(".module-head.group").first().find("img").attr("src");
                        console.log("ript\t"+imgsrc);
                        res.end(imgsrc);
                });
        });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
