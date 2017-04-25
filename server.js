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
   var input = req.body.input;
   getPokemonData(input, res);
	
});

function getPokemonData(input, res) {
   request('http://pokeapi.co/api/v2/pokemon/' + input, function(err, results) {
         // Handling an invalid pokemon API call
         if (err || results.statusCode === 404) {
            var err = err || "Pokemon not found",
                pokemon = { img: defaultImg };
            
            res.render('pokedexInfo', {err: err, pokemon: pokemon});
         } else {
            var parsedData = JSON.parse(results.body),
                pokemon = createPokemon(parsedData);

                getSpeciesData(input, pokemon, res);
         }        
   });
};

function getSpeciesData(input, pokemon, res) {
   var pokemonObj = pokemon;
   request('http://pokeapi.co/api/v2/pokemon-species/' + input, function(err, results) {
         if (err || results.statusCode === 404) {
            var err = err || "Pokemon not found",
                pokemon = { img: defaultImg };
         
            res.render('pokedexInfo', {err: err, pokemon: pokemon});
         } else {
            var results = JSON.parse(results.body);

            pokemonObj.title = results.genera[0].genus;
            pokemonObj.desc = results.flavor_text_entries[1].flavor_text || 'Cool';
            res.render('pokedexInfo', {pokemon: pokemonObj});
      }
   }); 
};

function createPokemon(results) {
   var pokemon = {},
   keys = results.sprites ? Object.keys(results.sprites) : [],
   random = Math.floor(Math.random() * keys.length) + 2;

   pokemon.id = results.id || '';
   pokemon.name = results.name || '';
   pokemon.height = results.height || '';
   pokemon.weight = results.weight || '';
   pokemon.type = results.types[0].type.name || '';
   pokemon.img = keys.length && 
      (results.sprites[keys[random]] !== null || results.sprites[keys[random]] !== undefined) ? 
         results.sprites[keys[random]] : defaultImg;

   return pokemon;
};


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Pokedex things are happening on port ' + port);

