'use strict';
// BASIC SETUP
// =============================================================================
var express    = require('express');        
var app        = express();                     // initialize our app using express
var path 	   = require('path');			    // helps make file and directory paths
var request    = require('request'); 		    // makes http calls
var bodyParser = require('body-parser');	    // grab incoming POST request input
var exphbs 	   = require('express-handlebars')  // setup for our views

var port = process.env.PORT || 8080;        // set our port

// tell express what template engine we want to use and where to find the default
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// tell express what folder our views/styles live in
app.use(express.static('views'));

// use body parser to view our form input easily
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

// define some default values to use for our app
var defaultPokemon = {
      id: 54,
      height: '2"072',
      weight: '43.2',
      type: 'water',
      name: 'Psyduck',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/psykokwak.gif',
      title: 'the duck pokemon',
      desc: 'Uses mysterious powers to perform various attacks.'
   },
   defaultImg = 'https://media.giphy.com/media/JukJD3YfnXPkA/giphy.gif';

// ROUTES FOR OUR APP
// =============================================================================

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
app.get('/', function(req, res){
   res.render('pokedexInfo', { pokemon: defaultPokemon });
});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
app.post('/', function(req, res) {
   var randomNum = Math.floor(Math.random() * 250) + 1;
   getPokemonData(randomNum, res);
	
});

function getPokemonData(randomNum, res) {
	// ***************************************
	// CHALLENGE 1:  Replace the blank line below with your GET request
	// Once sucessfully implemented, the pokemon name, type, height, 
	// and weight will display in the Pokedex!
	// Feel free to use your own debugging methods here (like console.log).
	// ***************************************
   request(______________________ + randomNum + "/", function(err, results) {
         // Handling an invalid pokemon API call
         if (err || results.statusCode === 404) {
            var err = err || "Pokemon not found",
                pokemon = { img: defaultImg };
            
            res.render('pokedexInfo', {err: err, pokemon: pokemon});
         } else {
         	// Successful GET request results end up here!
            var parsedData = JSON.parse(results.body),
                pokemonObj = createPokemon(parsedData);

                console.log("POKEMON from createPokemon method on line 93: ", pokemonObj)

                res.render('pokedexInfo', {pokemon: pokemonObj});

         }        
   });
};

// ***************************************
// CHALLENGE 2:  Implement a different GET request here
// Hint:  Read the Pokeapi documentation to see other types of GET requests, or choose another API
// Try to display the results from that call in the views/layouts/pokedexInfo.handlebars file
// ***************************************

// Helper method for grabbing data from our JSON results
function createPokemon(results) {
   var pokemon = {},
   keys = results.sprites ? Object.keys(results.sprites) : [],
   random = Math.floor(Math.random() * keys.length) + 1;

   pokemon.id = results.id || '';
   pokemon.name = results.name || '';
   pokemon.height = results.height || '';
   pokemon.weight = results.weight || '';
   pokemon.type = results.types[0].type.name || '';
   pokemon.img = !results.sprites[keys[random]] ? defaultImg : results.sprites[keys[random]];

   return pokemon;
};


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Pokedex things are happening on port ' + port);

