
# Make a Pokedex with the Pokeapi API!

## Learning Competencies
- consume an API 
- use HTTP GET requests
- customize a front end display

## Summary

Learn the basics of consuming an API and customizing it on the front end by customizing a Pokedex app using the [Pokeapi API](https://pokeapi.co/). 

## Installation

Download the repo

Install the dependencies & start the server
```bash
$ npm install
$ node server.js
```

See the site in your browser at [http://localhost:8080](http://localhost:8080).

## Getting Started
1.  Check out the (Pokeapi documentation)[http://pokeapi.co/docsv2/#] 
    - Read about what the API does and the shape of the data returned.
2.  In the server.js file, add a GET request to the challenge section so that it displays a pokemon & it's data in the pokedex
    - Read the (request documentation)[https://github.com/request/] to get a sense of the HTTP formatting
3.  Decide how to adapt the API to fit your current needs.

## Question time
What information can you get out of the API? How can you manipulate it? What are this APIs limitations?

#### Stretch Challenges: 

Now that you have a fully functional GET request working, you have the perfect canvas on which to experiment. 

Implement any of the following:

  - **Use an endpoint that requires authentication**. Implement the 
      [Twitter API](https://dev.twitter.com/rest/public) to post to your account every time you like a pokemon in your pokedex
  - **Customize the front end.** Can you catch em all?  Animate the Pokemon avatars?  Refactor the styling with SASS or LESS?
  - **Add Additional Routes and Views** Add a splash page with a welcome message

