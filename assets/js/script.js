const API_URL = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';
let pokeList = { pokemon: [] };

// Função executada quando carrega a página
window.onload = async () => {
  pokeList = await getPokeList();
}

// Carrega os Pokémons da local storage. Caso não tenha, realiza a requisição e salva na local storage.
async function getPokeList() {
  // Obtém os Pokémons da local storage
  const pokemonsLocalStorage = JSON.parse(localStorage.getItem('pokeList'));

  // Se for verdadeiro é porque os Pokémons foram salvos na local storage
  const pokemonsEstaoArmazenados = pokemonsLocalStorage !== null
  if (pokemonsEstaoArmazenados) {
    return pokemonsLocalStorage;
  }

  const pokemons = await requestPokeList();

  // Salva os Pokémons na local storage
  localStorage.setItem('pokeList', JSON.stringify(pokemons))
  return pokemons;
}

// Obtém os Pokémons realizando uma requisição para uma URL que contém as
// informações em JSON
async function requestPokeList() {
  const response = await fetch(API_URL)
    .then((response) => response.json())
  return response;
}

// Retorna um pokemon aleatorio da lista
function obterPokemonAleatorio(pokemons) {
  const random = getRandomIntInclusive(0, pokemons.length - 1); // Números mágicos não são legais
  return pokeList.pokemon[random];
}

// Evento do HTML. Ao clicar no botão atualiza o card do Pokémon
function getPokemonInfo() {
  showPokeInfo(obterPokemonAleatorio(pokeList.pokemon));
}

// Valor aleatório de min até max, ambos inclusos
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function showPokeInfo(pokemon) {
  const imagemCard = document.getElementById('imagemPokemon');
  imagemCard.setAttribute('src', pokemon.img);

  const nomePokemon = document.getElementById('nomePokemon');
  nomePokemon.innerHTML = pokemon.name;
  
  const tipoPokemon = document.getElementById('tipoPokemon');
  tipoPokemon.innerHTML = pokemon.type[0];
}