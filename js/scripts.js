// Pokémon data , height is in Meters
let pokemonRepository = (function () {

  //creates an empty array that is populated with data from the API URL
 let pokemonList = [];
 let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
 let searchInput = document.querySelector("#searchBar");

 // displays a loading message until the content has loaded
 function showLoadingMessage() {
   document.querySelector('.loading-message').classList.add('visible');
 }

 // hides the loading message as soon as the content is loaded
 function hideLoadingMessage() {
   document.querySelector('.loading-message').classList.add('hidden');
 }

 // returns an array of all the Pokémon in pokemonList
  function getAll() {
    return pokemonList;
  }

  function add (pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }

  // function that adds the list of Pokémon to the DOM, as buttons in an unordered list.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');

    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button', 'btn', 'btn-primary');
    // pokemonButton.id = 'open-modal';
    pokemonButton.setAttribute('data-target', '#pokemonModal');
    pokemonButton.setAttribute('data-toggle', 'modal');

    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);

    pokemonButton.addEventListener('click', function() { // the showDetails() function will be executed when the user clicks on the Pokemon's button
      showDetails(pokemon);
    })
  }

  //function used to call the pokemon and add to pokemonList
   function loadList() {
     showLoadingMessage();
     return fetch(apiUrl).then(function (response) {
       return response.json();
     }).then(function (json) {
       hideLoadingMessage();
       json.results.forEach(function (item) {
         let pokemon = {
           name: item.name,
           detailsUrl: item.url
         };
         add(pokemon);
       });
     }).catch(function (e) {
       console.log(e);
     });
   }

   //loads data from listed URL
   function loadDetails(item) {
     showloadingMessage();
     let url = item.detailsUrl;
     return fetch(url).then(function (response) {
       return response.json();
     }).then(function (details) {
       hideLoadingMessage();
       item.imageUrlFront = details.sprites.front_default;
       item.imageUrlBack = details.sprites.back_default;
       item.height = details.height;
       item.weight = details.weight;
       item.types = [];
       for (let i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
    }).catch(function(e) {
      console.error(e);
    });
  }

  // Fucntion created for eventListener
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {

    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');
    let typesElement = $('<p>' + 'Types : ' + item.types.join(', ') + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities : ' + item.abilities.join(', ') + '</p>');


    // display the separate Pokémon details inside the modal
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // search bar
  searchInput.addEventListener("input", function() {
    let listPokemon = document.querySelectorAll("li");
    let value = searchInput.value.toUpperCase();

    listPokemon.forEach(function(pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = "";
      } else {
        pokemon.style.display = "none";
      }
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
}) ();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


function changeColor() {
  let body = document.querySelector('body');
  body.classList.toggle('change-color');
}

let buttonColor = document.querySelector('#change-color');
buttonColor.addEventListener('click', changeColor);
