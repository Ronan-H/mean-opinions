var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://ronanh:mean-opinionsdbpwd123@ds159293.mlab.com:59293/mean-opinions';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    description: String,
    optionA: String,
    optionB: String,
    aVotes: Number,
    bVotes: Number
})
var PostModel = mongoose.model('post', postSchema);


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
    
app.post('/name', function(req, res){
    res.send("Hello you sent " +
    req.body.firstname + " " +
    req.body.lastname);
})

app.get('/', function (req, res) {
   res.send('Hello from Express');
})

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.optionA);
    console.log(req.body.optionB);
    console.log(req.body.aVotes);
    console.log(req.body.bVotes);

    PostModel.create({
        title: req.body.title,
        description: req.body.description,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        aVotes: req.body.aVotes,
        bVotes: req.body.bVotes
    });
    res.send('Item added');


})

app.get('/api/posts', function(req, res){
    PostModel.find(function(err, data){
        res.json(data);
    });
})

app.get('/api/posts/vote/:id/:option', function(req, res){
    console.log("Vote received");
    console.log("id: " + req.params.id);
    console.log("option: " + req.params.option);

    PostModel.findOneAndUpdate({_id:req.params.id},
        (req.params.option === "A") ? {$inc: {aVotes: 1}} : {$inc: {bVotes: 1}},
        function(err, data){
        console.log("Found poll: " + data.title);

        res.json(data);
    });
})

app.delete('/api/posts/:id', function(req, res){
    console.log(req.params.id);

    PostModel.deleteOne({_id:req.params.id},
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
   
   console.log("Example app listening at http://%s:%s", host, port)
})