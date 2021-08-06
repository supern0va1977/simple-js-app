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
//adds list of pokemon buttons
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li')
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    button.classList.add('class-selector')
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
// event listen for button, display name,height,type,and if taller than 1.6m = true
  }
  function showDetails(pokemon) {
    console.log ((pokemon.name),(pokemon.height),(pokemon.types),(pokemon.height > 1.6));
  }



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
}) ();
//adds in a pokemon to the list
pokemonRepository.add({name: "pikachu", height: .8, types: ["electric"] });
//returns the entire pokemon list
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
