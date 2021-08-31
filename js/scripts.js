// Pokémon data , height is in Meters

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  function getAll() {
    return pokemonList;
  }

  function add (pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }

  function remove(start, number) {
    document.write(`<br><p>${pokemonList[start].name} has been removed.
      </p><p> This is the updated list:</p><br>`);
    pokemonList.splice(start, number);
  }



  function showModal(title, text, image) {

    let modalContent = document.querySelector('.modal-content');

    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");

    let buttonClose = document.querySelector('#close');
    let buttonX = document.querySelector('#button-x');

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imgElement = document.createElement('img');
    imgElement.src = image;

    // modalContent.innerHTML = '';
    modalHeader.innerHTML = '';
    modalBody.innerHTML = '';

    modalHeader.appendChild(titleElement);
    modalBody.appendChild(contentElement);
    modalBody.appendChild(imgElement);
    modalHeader.appendChild(buttonX);
    modalFooter.appendChild(buttonClose);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
  }


  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    });
  }

//adds list of pokemon buttons and information
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    listItem.classList.add('col-lg-4', 'col-md-6', 'col');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-lg', 'btn-primary');
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }
  //loads data from listed URL
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    });
  }
  // Fucntion created for eventListener
  function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    showModal((`${pokemon.name}`), (`height: ${pokemon.height} m`), pokemon.imageUrl);
  });
}

  return {
    add: add,
    getAll: getAll,
    remove: remove,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
  };
}) ();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
