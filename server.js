'use strict';
// BASIC SETUP
// =============================================================================
var express    = require('express');        
var app        = express();                 // initialize our app using express
var path 	   = require('path');			// helps make file and directory paths
var request    = require('request'); 		// makes http calls
var bodyParser = require('body-parser');	// grab incoming POST request input
var exphbs 	   = require('express-handlebars')  // setup for our views

var port = process.env.PORT || 8080;        // set our port

// tell express where our html and styles live
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// tell express what folder our views/styles live in
app.use(express.static('views'));

// use body parser to view our input
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

// ROUTES FOR OUR APP
// =============================================================================

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
app.get('/', function(req, res){
  res.render('pokedexInfo', {name:'fdgdfg'});
});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
app.post('/',function(req,res){
   var input = req.body.input,
   	 pokemon = {};

   request('http://pokeapi.co/api/v2/pokemon/' + input, function(err, results){
   		if (err) {
   			res.render('pokedexInfo', {err: err})
   		}

   		var results = JSON.parse(results.body),
   			keys = results.sprites ? Object.keys(results.sprites) : null,
   			random = Math.floor((Math.random() * keys.length) + 1);

   			pokemon.id = results.id || '';
   			pokemon.name = results.name || '';
   			pokemon.height = results.height || '';
   			pokemon.weight = results.weight || '';
   			pokemon.type = results.types[0].type.name || '';
   			pokemon.img = keys ? results.sprites[keys[random]] : '';

   			request('http://pokeapi.co/api/v2/pokemon-species/' + input, function(err, results) {
   					if (err) {
   						res.render('pokedexInfo', {err: err})
   					}
   					var results = JSON.parse(results.body);

   					pokemon.title = results.genera[0].genus;
   					pokemon.desc = results.flavor_text_entries[1].flavor_text || 'Cool';
   					res.render('pokedexInfo', {pokemon: pokemon})
   			}) 
	});
	
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Pokedex things are happening on ' + port);

