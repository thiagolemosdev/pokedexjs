const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImage = document.querySelector(".pokemon__image");
const searchPokemon = document.querySelector(".input__search");
const form = document.querySelector(".form");
// pegando os elementos do DOM que serao alterados

const fetchPokemon = async (pokemon) => {
  // Criando a função para buscar o pokemon
  // Aqui usamos Async porque o fecth é uma funçao assincrona (uma promisse)
  // e para usarmos o await, é necessario usar o async

  const APIResponse = await fetch(
    // Atribuindo o valor de resposta do fecth a variavel
    // utilizamos o await para informar que ele precisa esperar a conclusão para continuar

    `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
    // Passando o endereço do fetch e passando a variavel e minusculo
  );

  const data = await APIResponse.json();
  // transformando os dados do APIResponse em json
  // mesma coisa, .json é assincrono então usamos o await para ele esperar

  return data;
};

const renderPokemon = async (pokemon) => {
  // criando função para renderizar os dados do pokemon

  const data = await fetchPokemon(pokemon);
  // Variavel para receber os dados do pokemon

  pokemonNumber.innerHTML = data.id;
  pokemonName.innerHTML = data.name;
  // Atribuindo o valor coletado as variaveis e levando para o front
  pokemonImage.src =
    data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  // pegando o gif do pokemon, ne caso estamos usando colchete mas podemos usar ponto tambem

  searchPokemon.value = "";
  // limpando o campo de input
};

form.addEventListener("submit", (e) => {
  // adicionando
  e.preventDefault();
  renderPokemon(searchPokemon.value);
});
