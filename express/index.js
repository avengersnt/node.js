const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
var request = require('request');
var Coordinates;
var lat = 35.665662327484;
var options = {
    url: 'https://map.yahooapis.jp/search/local/V1/localSearch?output=json&appid=dj00aiZpPWk0clhRdTdrVVd0ZiZzPWNvbnN1bWVyc2VjcmV0Jng9ZDA-&gc=0306005&lat='+ lat +'&lon=139.73091159273&dist=3',
    method: 'GET',
    json: true
}

var array = [];
var Coordinates;
request(options, function (error, response, body) {


  var Feature = body.Feature;
  var ResultInfo = body.ResultInfo;
  var Count = ResultInfo.Count;
  for ( var i=0;  i<Count;   i++)  {

// 繰り返す処理を書く
  var Feature_JSON = Feature[i]
  var Geometry = Feature_JSON.Geometry;
  Coordinates = Geometry.Coordinates;
  array[i] = Coordinates;
  console.log(Coordinates);
}
  console.log(array);
})


app.post('/test', function(req, res) {
  res.send({
    message: array
  })
})
app.listen(process.env.PORT || 3000)
