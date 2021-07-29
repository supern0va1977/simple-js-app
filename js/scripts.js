// Pokémon data , height is in Meters

let pokemonList = [
  {
    name: 'Charizard',
    height: 1.7,
    types: ['fire', 'flying']
  },
  {
    name:'Beedrill',
    height: 1.0,
    types: ['bug', 'poison']
  },
  {
    name:'Nidoking',
    height: 1.4,
    types: ['poison', 'ground']
  },
  {
    name:'Ivysaur',
    height: 1.1,
    types: ['grass', 'poison']
  },
];

pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + ' is ' + pokemon.height + ' meters Tall ' +
  pokemon.types + ' => ability   ' );
});

// shows the pokemonList
