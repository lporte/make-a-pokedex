
# Intro to APIs: GET Request Challenge!


## GET Challenge Learning Competencies
- Implement a GET request inside of a Node/Express app
- Customize a web app front end 

## Instructions
1. Install dependencies & run the server from within the project's root directory  
	```
	npm install
	npm start
	```
2. Start the challenge!
	- In the server.js file (line 62), add the correct GET request so that it successfully displays a pokemon & it's data in the pokedex when you press the 'CLICK ME!' button 
	- Once sucessfully implemented, the pokemon image, name, type, height, and weight will display in the Pokedex in your browser  
3. Level up!
	- Freestyle:  You just levelled up!  Through rigorous training you and your Pokedex can get much STRONGER!
		- Add a different GET request to your server.js file 
		- Try to display those results in the Pokedex view
	- Ideas:  
		- Use the Pokeapi [evolution chain](https://pokeapi.co/docsv2/#evolution-section) endpoint to display a pokemon's family tree 
		- Choose any unused button on the Pokedex and make it interactive 
			- i.e.) Every time a button is clicked, it Tweets the current pokemon name to your account
		- Paginate the Pokemon displayed by incrementing the id by one on each 'CLICK ME!' button click

## Credits
Pokedex CSS: [Bidji](http://codepen.io/Bidji/pen/MYdPwo) on Codepen 
