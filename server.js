'use strict';
// BASIC SETUP
// =============================================================================

// DECLARE WHAT WE NEED ------------------------------
var express    = require('express');        
var app        = express();                 // initialize our app using express
var path 	   = require('path');			// helps make file and directory paths
var request    = require('request'); 		// makes http calls
var bodyParser = require('body-parser');	// grab incoming POST request input
var exphbs 	   = require('express-handlebars')

var port = process.env.PORT || 8080;        // set our port

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// tell express what folder our views/styles live in
app.use(express.static('views'));

// use body parser to view our input
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('pokedexInfo', {name:'fdgdfg'});
});

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

   			console.log("DONE POKEMON")

   			request('http://pokeapi.co/api/v2/pokemon-species/' + input, function(err, results) {
   					if (err) {
   						res.render('pokedexInfo', {err: err})
   					}
   					var results = JSON.parse(results.body);

   					pokemon.title = results.genera[0].genus;
   					pokemon.desc = results.flavor_text_entries[1].flavor_text || 'Cool';
   					console.log("DONE SCPECIES: ", results.flavor_text_entries)
   					res.render('pokedexInfo', {pokemon: pokemon})
   			}) 
	});

	
});

app.listen(port);
console.log('Pokedex things are happening on ' + port);






   			
// app.use(bodyParser.json());
// // tell express where our views/styles live
// app.use(express.static('app'));


// // ROUTES FOR OUR APP
// // =============================================================================
// var router = express.Router();              // get an instance of the express Router

// default route to make sure everything is working (http://localhost:8080/pokedex)
// router.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname+'/app/index.html'))
// });

// // pokeapi route that will return pokemon metadata
// app.post('/search', function(req, res){
// 	var input = req.body;
// 	res.send("C'MON " + input);
// 	// request('' + param, function(err, body){
// 	//   res.send(JSON.parse(body.body)); //res is the response object, and it passes info back to client side
// 	// });
// });

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /pokedex
// app.use('/pokedex', router);

// // START THE SERVER
// // =============================================================================
// app.listen(port);

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
// app.get('/', function(req, res){
//   // The form's action is '/' and its method is 'POST',
//   // so the `app.post('/', ...` route will receive the
//   // result of our form
//   var html = '<form action="/" method="post">' +
//                'Enter your name:' +
//                '<input type="text" name="userName" placeholder="..." />' +
//                '<br>' +
//                '<button type="submit">Submit</button>' +
//             '</form>';
               
//   res.send(html);
// });

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
// app.post('/', function(req, res){
//   var userName = req.body.userName;
//   var html = 'Hello: ' + userName + '.<br>' +
//              '<a href="/">Try again.</a>';
//   res.send(html);
// });