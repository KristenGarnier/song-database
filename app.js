var express = require('express');
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDb.DocumentClient({region: 'eu-west-1'});
var app = express();

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.post('/', function(req, res) {
  docClient.put({
      artiste: req.body.artist,
      song: req.body.song
  }, function(err, data) {
    if(err) {
        res.send({
            "error": err
        });
    } else {
        res.send(data);
    }
  })

});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
