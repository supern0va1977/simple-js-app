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
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li')
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    button.classList.add('class-selector')
    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
}) ();

pokemonRepository.add({name: "pikachu", height: .8, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//to check code us commands below

//console.log(pokemonRepository.getAll());
//pokemonRepository.add({ name: 'CookieMonster  height: 10, ability => he can eat cookies all day ' });
//console.log(pokemonRepository.getAll());
