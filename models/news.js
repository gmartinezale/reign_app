var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient
 , assert = require('assert');

var url = 'mongodb://localhost:27017/';

var mongo = {};

MongoClient.connect(url,function(err,client){
    if (err) throw err;
    var db = client.db('hnews');
    db.dropDatabase(function(error,result){
        if (error) throw error;
        console.log("DB clean!");
        var db = client.db('hnews');
        db.createCollection("news", function(err, result) {
            if (err) throw err;
            console.log("Collection is created!");
            client.close();
        });
    });
});

mongo.initData = function(data,callback){
    MongoClient.connect(url,function(err,client){
        var db = client.db('hnews');
        db.collection('news').insertMany(data,function(err,res){
            if(err) throw err;
            client.close();
            callback();
        });
    });
}

mongo.getData = function(callback){
    MongoClient.connect(url,function(err,client){
        var db = client.db('hnews');
        db.collection('news').find().sort({'created_at':-1}).toArray(function(err,res){
            if(err) throw err;
            client.close();
            callback(res);
        });
    });
}

mongo.deleteNews = function(id,callback){
    MongoClient.connect(url,function(err,client){
        var db = client.db('hnews');
        var query = {"_id":new mongodb.ObjectID(id) };
        db.collection('news').remove(query,function(err,res){
            console.log(err);
            if(err) throw err;
            client.close();
            callback();
        });
    });
}
module.exports = mongo;