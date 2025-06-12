/*
//Initial list of Pokemons
let pokemonList = [
    {name: 'bulbasaur', height: 7, type: ['grass','poison']},
    {name: 'gothitelle', height: 1.5, type: 'psychic'},
    {name: 'lugia', height: 5.2, type: ['psychic','flying']},
    {name: 'mewtwo', height: 2, type: 'psychic'},
    {name: 'gardevoir', height: 1.6, type: ['psychic','fairy']},
    {name: 'furret', height: 1.8, type: 'normal'},
    {name: 'jynx', height: 1.4, type: ['psychic','ice']},
    {name: 'milotic', height: 2, type: 'water'},
    {name: 'swanna', height: 1.3, type: ['water','flying']}
];
*/

/*First version
// Printing out the details of each Pokemon
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<p>' + pokemonList[i].name + ' height ' + pokemonList[i].height);
}

//Highlighting the largest Pokemon
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 6) {
     document.write('<p>' + pokemonList[i].name + ' height ' + pokemonList[i].height + " wow, that's big!");
    }
}

//Second Version
for (let i = 0; i < pokemonList.length; i++) {
let message = '<p>' + pokemonList[i].name + ' height ' + pokemonList[i].height;
  if (pokemonList[i].height > 6) {
    message += " wow, that's big!";
  }
  document.write(message);
}

//Version with forEach function
pokemonList.forEach(function (pokemon) {
let message = `<p>${pokemon.name}: ${pokemon.height}`;
  if (pokemon.height > 6) {
    message += ` wow, that's big!`;
  }
  message += '</p>';
  document.write(message);
}
);*/

// Optional loading indicator
function showLoadingMessage() {
  let loadingMessage = document.createElement('p');
  loadingMessage.innerText = 'Loading...';
  loadingMessage.id = 'loading-message';
  document.body.appendChild(loadingMessage);
}

function hideLoadingMessage() {
  let loadingMessage = document.querySelector('#loading-message');
  if (loadingMessage) {
    loadingMessage.remove();
  }
}

//Pokemon List using IIFE
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid Pokémon:', pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'btn-block');

    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemon-modal');

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  /* function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  } */

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, 'Height: ' + pokemon.height, pokemon.imageUrl);
    });
  }
/*
  // Modal-related functions
  function showModal(title, text, imageUrl) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = '×';
    closeButton.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = title;
    imageElement.style.width = '100%';
    imageElement.style.height = 'auto';

    modal.appendChild(closeButton);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  document.querySelector('#modal-container').addEventListener('click', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.target === modalContainer) {
      hideModal();
    }
  });
*/

// Bootstrap replacement
  function showModal(title, text, imageUrl) {
    let modalTitle = document.querySelector('#pokemon-modal-label');
    let modalBodyText = document.querySelector('.pokemon-height');
    let modalImage = document.querySelector('.pokemon-image');

    modalTitle.innerText = title;
    modalBodyText.innerText = text;
    modalImage.src = imageUrl;
    modalImage.alt = title;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

// Load list from API and render
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

/*
//Version with forEach function adapted for pokemonRepository
pokemonRepository.getAll().forEach(function (pokemon) {
let message = `<p>${pokemon.name}: ${pokemon.height}`;
  if (pokemon.height > 6) {
    message += ` wow, that's big!`;
  }
  message += '</p>';
  document.write(message);
}
);*/