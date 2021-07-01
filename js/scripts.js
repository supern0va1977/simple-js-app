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

for (let i=0; i < pokemonList.length; i++) {
    // generates the pokemon list from the array //
    document.write(pokemonList[i].name + '(height :' + pokemonList[i].height + ')');
    // used to check height in meters
    if (pokemonList[i].height > 1.6) {
      // if height is above 1.6m add text to page
    document.write(" <=== Wow, that's big!");
  }
    //adds double spacing
    document.write('<br><br><br><br>');
}
