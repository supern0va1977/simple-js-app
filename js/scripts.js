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
    height: 1.0,
    types: ['grass', 'poison']
  },
]

for (let i=0; i < pokemonList.length; i++) {
  // generates the pokemon list from the array //

  document.write(pokemonList[i].name + '(height :' + pokemonList[i].height + ')');

  if (pokemonList[i].height > 1.7) {
// adds a doubble line break between each pokemon from the array
  }
  document.write ('<br><br><br><br>');
  
}
