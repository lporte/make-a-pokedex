// BASIC SETUP
// =============================================================================

// declare the packages we need
var express    = require('express');        
var app        = express();                 // initialize our app using express
var path 	   = require('path');			//
var request    = require('request'); 		//

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR APP
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// default route to make sure everything is working (http://localhost:8080/pokedex)
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/app/index.html'))
});

// pokeapi route that will return pokemon metadata
app.get('/pokeapi/connect', function(req, res){
  request('http://pokeapi.co/api/v2/pokemon/3', function(err, body){
      res.send(JSON.parse(body.body)); //res is the response object, and it passes info back to client side
  });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /pokedex
app.use('/pokedex', router);

// tell express where our views/styles live
app.use(express.static('app'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Pokedex things are happening on ' + port);