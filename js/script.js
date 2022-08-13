const fetchPokemon = async (pokemon) => {
  // Criando a função para buscar o pokemon
  // Aqui usamos Async porque o fecth é uma funçao assincrona (uma promisse)
  // e para usarmos o await, é necessario usar o async

  const APIResponse = await fetch(
    // Atribuindo o valor de resposta do fecth a variavel
    // utilizamos o await para informar que ele precisa esperar a conclusão para continuar

    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    // Passando o endereço do fetch
  );

  const data = await APIResponse.json();
  // transformando os dados do APIResponse em json
  // mesma coisa, .json é assincrono então usamos o await para ele esperar

  return data;
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);
};

renderPokemon("25");
