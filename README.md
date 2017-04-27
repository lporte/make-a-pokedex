
# Intro to APIs: Make a Pokedex with the Pokeapi!

## GET Challenge Learning Competencies
- consume an API 
- implement a HTTP GET request
- retrieve data from a JSON response

## Instructions
1. Check out the (Pokeapi documentation)[http://pokeapi.co/docsv2/#]
2. **CHALLENGE 1**
	- In the server.js file (line 65), add the correct GET request so that it successfully displays a pokemon & it's data in the pokedex when you press the 'CLICK ME!' button 
	- Once sucessfully implemented, the pokemon image, name, type, height, and weight will display in the Pokedex in your browser  
3. **CHALLENGE 2**
	- Freestyle:  You just leveled up!  Through rigorous training you and your Pokemon can get much STRONGER!
		- Add a different GET request to your server.js file
		- Try to display those results in the Pokedex view
	- Ideas:  
		- Use the Pokeapi evolution chains display a pokemon's family tree https://pokeapi.co/docsv2/#evolution-section
		- Choose any unused button on the Pokedex and make it interactive 
			- i.e.) Every time a button is clicked, it Tweets the current pokemon name to your account
		- Paginate the Pokemon displayed by incrementing the id by one on each 'CLICK ME!' button click
