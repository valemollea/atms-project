const express = require('express')
const request = require('request')
const fs = require('fs')
const server = express()
const bodyParser = require('body-parser')
const port = 3001
const cajerosdb = JSON.parse(fs.readFileSync('./cajeros.json', 'UTF-8'))

// parse application/json
server.use(bodyParser.json())

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//Gets the three nearest atms (max distance 500m around)
function getATMs(red, long, lat) {
  return cajerosdb.cajeros.reduce((acc, c) => {
    if (c.red != red) {
      return acc;
    }

    var distance = getDistance(lat, long, c.lat, c.long);
    if (distance <= 500) {
      c.dist = distance;
      acc.push(c);
    }

    return acc;
  }, []).sort((a, b) => {
    return a.distance - b.distance;
  }).slice(0, 3);
}

//Gets ditance in meters from one geographic point to other
function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1); 
  var a = 
    Math.sin(dLat/2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) ** 2
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c * 1000; // Distance in meters
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

//Return the three nearest atms (max distance 500m around)
server.post('/cajeros', (req, res) => {
  const { long, lat, red } = req.body;
  if (!long || !lat || !red) {
    return res.status(400).send({ error: 'Algo salio mal!' });
  }
  if (red.toUpperCase() != "LINK" && red.toUpperCase() != "BANELCO") {
    return res.status(400).send({ error: 'La Red ingresada no existe' });
  }
  res.status(200).json(getATMs(red.toUpperCase(), long, lat))
}) 

//ReCatchap Validation
server.post('/recaptcha', (req, res) => {
  const { value } = req.body;
  const secretKey = ""; //Add your secret keys
  const qs = { secret: secretKey, response: value };
  request({
    url: 'https://www.google.com/recaptcha/api/siteverify',
    qs: qs,
  }, function (error, response, body) {
    var body = JSON.parse(body);
    if (body.success) {
      res.status(200).json({success: true})
    } else {
      res.status(400).json({error: "Algo salio mal"})
    }
  });
})

server.listen(port, () => {
  console.log(`Api Server listening at http://localhost:${port}`)
})