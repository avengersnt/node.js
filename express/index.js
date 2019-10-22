const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
var request = require('request');



app.post('/test', function(req, res) {
  var lat =  req.body.lat
  var lng =  req.body.lng
  var options = {
      url: 'https://map.yahooapis.jp/search/local/V1/localSearch?output=json&appid=dj00aiZpPWk0clhRdTdrVVd0ZiZzPWNvbnN1bWVyc2VjcmV0Jng9ZDA-&gc=0306005&lat='+ lat +'&lon='+ lng +'&dist=0.5&results=5&sort=dist',
      method: 'GET',
      json: true
  }
  var lat = [];
  var lng = [];
  var Feature;
  var Coordinates;
  request(options, function (error, response, body) {


    Feature = body.Feature;

    var ResultInfo = body.ResultInfo;
    var Count = ResultInfo.Count;
    for ( var i=0;  i<Count;   i++)  {

  // 繰り返す処理を書く
    var Feature_JSON = Feature[i]
    var Geometry = Feature_JSON.Geometry;
    Coordinates = Geometry.Coordinates;
    var result = Coordinates.split(',');
    lat[i] = result[0];
    lng[i] = result[1]

  }

  console.log(lat);
　console.log(lng);
  res.send({
    lat: lat,
    lng: lng,

  })



  })



})
app.listen(process.env.PORT || 3000)
