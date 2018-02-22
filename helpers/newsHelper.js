var _ = require('lodash');
var moment = require('moment');

function formatNewsForIndex(dataNews){
    var formated_news = [];
    _.forEach(dataNews,function(news,key){
        news.use_story = "";

        if(news.story_title != null){
            news.use_story = news.story_title;
        }else if(news.title != null){
            news.use_story = news.title;
        }else{
            return; //DISCARD THIS NEWS
        }

        if(news.story_url != null){
            news.use_url = news.story_url;
        }else{
            news.use_url = news.url;
        }

        var today = moment();
        var date_news = moment(news.created_at);
        if(today.format('YYYY-MM-DD') == date_news.format('YYYY-MM-DD')){
            news.create_format = date_news.format('HH:MM A');
        }else if(today.subtract(1,'days').format('YYYY-MM-DD') == date_news.format('YYYY-MM-DD')){
            news.create_format = 'Yesterday';
        }else{
            news.create_format = date_news.format('MMM DD');
        }
        formated_news.push(news);
    });

    return formated_news;
}

exports.formatNewsForIndex = formatNewsForIndex;