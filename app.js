var express = require('express');
var bodyParser = require('body-parser')
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
var app = express();
app.use(bodyParser)

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.post('/', function(req, res) {
  docClient.put({
      TableName: 'song',
      Item: {
          'itemId': 0,
          'song': req.body.song,
          'artist': req.body.artist
      }
  }, function(err, data) {
    if(err) {
        console.log('Error !')
        res.send({
            "error": err
        });
    } else {
        console.log('Success !')
        res.send(data);
    }
  })

});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
