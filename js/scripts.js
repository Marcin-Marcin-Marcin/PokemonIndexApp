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
}*/

//Second Version
for (let i = 0; i < pokemonList.length; i++) {
let message = '<p>' + pokemonList[i].name + ' height ' + pokemonList[i].height;
  if (pokemonList[i].height > 6) {
    message += " wow, that's big!";
  }
  document.write(message);
}