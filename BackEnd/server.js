var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://ronanh:mean-opinionsdbpwd123@ds159293.mlab.com:59293/mean-opinions';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
var pollSchema = new Schema({
    title: String,
    description: String,
    optionA: String,
    optionB: String,
    aVotes: Number,
    bVotes: Number,
    aWinText: String,
    bWinText: String
})
var PollModel = mongoose.model('post', pollSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// handles request to add add poll
app.post('/api/polls', function(req, res){
    PollModel.create({
        title: req.body.title,
        description: req.body.description,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        aVotes: req.body.aVotes,
        bVotes: req.body.bVotes,
        aWinText: req.body.aWinText,
        bWinText: req.body.bWinText
    });
    res.status(201).json({message: 'Item added'});
})

// handles request to get all poll details
app.get('/api/polls', function(req, res){
    PollModel.find(function(err, data){
        res.json(data);
    });
})

// handles poll vote request, done with an updating get request
app.get('/api/polls/vote/:id/:option', function(req, res){
    PollModel.findOneAndUpdate({_id:req.params.id},
        // increment either aVotes or bVotes depending on which option was passed
        // up in the request
        (req.params.option === "A") ? {$inc: {aVotes: 1}} : {$inc: {bVotes: 1}},
        function(err, data){
            res.json(data);
        });
})

// handles request to get a specific poll by id
app.get('/api/polls/:id', function(req, res){
    PollModel.findById(req.params.id,
        function (err, data) {
            res.json(data);
        });
})

// handles request to update specific post
app.put('/api/polls/:id', function(req, res){
    PollModel.findByIdAndUpdate(req.params.id, req.body, 
        function(err, data){
            res.send(data);
        })
})

// handldes request to delete poll by id
app.delete('/api/polls/:id', function(req, res){
    PollModel.deleteOne({_id:req.params.id},
    function(err, data)
    {
        if(err)
            res.send(err);
        res.send(data);
    })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("MEAN Opinions server listening at http://%s:%s", host, port)
})