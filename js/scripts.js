// Pokémon data , height is in Meters
let pokemonRepository = (function() {
  let pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=42";
  let searchInput = document.querySelector('#searchBar');

  // shows a loading message
  function showLoadingMessage() {
    document.querySelector(".loading-message").classList.add("visible");
  }

  // hides message once data is displayed
  function hideLoadingMessage() {
    document.querySelector(".loading-message").classList.add("hidden");
  }

  // returns an array of all the Pokémon in pokemonList
  function getAll() {
    return pokemonList;
  }

  // adds new Pokémon to the pokemonList array
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  }

  // adds the list of Pokémon to the DOM, as buttons in an unordered list.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");

    let listItem = document.createElement("li");
    listItem.classList.add("group-list-item");

    let pokemonButton = document.createElement("button");
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add("pokemon-button", "btn", "btn-primary");

    pokemonButton.setAttribute("data-target", "#pokemonModal");
    pokemonButton.setAttribute("data-toggle", "modal");

    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);
    // show details on button click
    pokemonButton.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  // loads the Pokémon list from the API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        hideLoadingMessage();
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
      });
  }

  // Pokémon details
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        hideLoadingMessage();
        // specifies the details we want to see
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
      })
      .catch(function(e) {
    });
  }

  // this is used to open the modal and show all the Pokémon details
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }

  // makes the modal visiable
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    let heightElement = $("<p>" + "Height : " + item.height + "</p>");
    let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
    let typesElement = $("<p>" + "Types : " + item.types.join(", ") + "</p>");
    let abilitiesElement = $(
      "<p>" + "Abilities : " + item.abilities.join(", ") + "</p>"
    );

    // display all details of the pokemon inside the modal
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  searchInput.addEventListener('input', function() {
    let listPokemon = document.querySelectorAll('li');
    let value = searchInput.value.toUpperCase();

    listPokemon.forEach(function(pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
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
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//Get button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, go to the top of the page
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
