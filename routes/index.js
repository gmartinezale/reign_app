var express = require('express');
var request = require('request');

var model_news = require('../models/news');
var newsHelper = require('../helpers/newsHelper');
var router = express.Router();

request({
    method:'GET',
    uri:'http://hn.algolia.com/api/v1/search_by_date?query=nodejs'
},function(error,response,body){
    var data=JSON.parse(body);
    model_news.initData(data.hits,function(){
        console.log("INSERTED DATA!");
    });
})

/* GET home page. */
router.get('/', function(req, res, next) {
    model_news.getData(function(news){
        var news_formated = newsHelper.formatNewsForIndex(news);
        res.render('index', { title: 'HN Feed',news:news_formated});
    });
});

router.get('/delete/:id',function(req,res){
    var id = req.params.id;
    model_news.deleteNews(id,function(){
        res.redirect('/');
    });
})

module.exports = router;
