// Pokémon data , height is in Meters

let pokemonRepository = (function () {
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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).includes('name') && Object.keys(pokemon).includes('type') && Object.keys(pokemon).includes('height')) {
      pokemonList.push(pokemon);
    }
  }

  return {
    add: add,
    getAll: getAll,
    
  };
}) ();

// shows the pokemonList
pokemonList.forEach(function(pokemon) {
  (pokemon.name + ' is ' + pokemon.height + ' meters Tall ' +
  pokemon.types + ' => ability   ' );
});
