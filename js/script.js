const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImage = document.querySelector(".pokemon__image");
const searchPokemon = document.querySelector(".input__search");
const form = document.querySelector(".form");
const nextButton = document.querySelector(".btn-next");
const prevButton = document.querySelector(".btn-prev");
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

  if (APIResponse.status === 200) {
    // se o status do response for 200 (success)

    const data = await APIResponse.json();
    // transformando os dados do APIResponse em json
    // mesma coisa, .json é assincrono então usamos o await para ele esperar

    return data;
  }
};

const renderPokemon = async (pokemon) => {
  // criando função para renderizar os dados do pokemon
  pokemonImage.src =
    "https://pa1.narvii.com/6618/792033cfa9e0199d425108ae0b9a111f624107c1_hq.gif";
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  // o que demora é o fetch, então colocamos um load enquanto carrega

  const data = await fetchPokemon(pokemon);
  // Variavel para receber os dados do pokemon

  if (data) {
    pokemonImage.style.display = "block";
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    // Atribuindo o valor coletado as variaveis e levando para o front
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    // pegando o gif do pokemon, ne caso estamos usando colchete mas podemos usar ponto tambem
  } else {
    pokemonName.innerHTML = "Not found 😞";
    pokemonNumber.innerHTML = "0";
    pokemonImage.style.display = "none";
    // se o pokemon não existir
  }

  searchPokemon.value = "";
  // limpando o campo de input
};

form.addEventListener("submit", (e) => {
  // adicionando
  e.preventDefault();
  renderPokemon(searchPokemon.value);
});

nextButton.addEventListener("click", (e) => {
  renderPokemon((parseInt(pokemonNumber.innerHTML) + 1).toString());
});

prevButton.addEventListener("click", (e) => {
  if (parseInt(pokemonNumber.innerHTML) > 1) {
    renderPokemon((parseInt(pokemonNumber.innerHTML) - 1).toString());
  }
});

renderPokemon("1");
