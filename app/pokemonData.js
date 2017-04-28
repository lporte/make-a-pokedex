function getJSON() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'http://pokeapi.co/api/v2/pokemon/1/', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var data = xhr.responseText;
			var pokemon = JSON.parse(data);
			// innerText does not let the attacker inject HTML elements.
			document.getElementById("pokemonName").innerText = ____________;
			document.getElementById("pokemonWeight").innerText = ___________;
			document.getElementById("pokemonHeight").innerText = _____________;
		}
	}
	xhr.send();
}

