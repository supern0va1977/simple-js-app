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
  function add (pokemon) {
    pokemonList.push (item);
  }
  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write (pokemon.name + ' is ' + pokemon.height + ' meters Tall '
  + ' ability => ' + pokemon.types);
});
