
let baseURL = 'https://pokeapi.co/api/v2/pokemon';
let pokemonDataList =  [];
let pokemonCardDataList = [];

async function loadPage() {
    await fetchPokemonData();
    await fetchPokemonCardData();
    displayCard();
    // console.log(pokemonData);
}

async function fetchPokemonData() {
    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        pokemonDataList = data.results;
    } catch (error) {
        console.log(error);
    }
}

async function fetchPokemonCardData() {
    pokemonDataList.forEach(async (pokemon) => { 
        let data = await fetchPokemonInfo(pokemon.url)
        console.log(data);
        
        // pokemonCardDataList.push("sad");
    })
}


async function fetchPokemonInfo(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        let obj = {
            image: data.sprites.front_default,
            name: data.name,
            types: data.types.map(type => type.type.name),
            base_experience: data.base_experience,
            id: data.id,
        };
        // pokemonCardDataList.push(obj);
        return obj;
    } catch (error) {
        console.log(error);
    }
}
function displayCard() {
    const container = document.getElementById('displayPokemon');
    container.innerHTML = "";

    // console.log(pokemonCardDataList);
    pokemonDataList.forEach(async (data) => {
        // console.log(pokemon);
        let pokemon = await fetchPokemonInfo(data.url)
        console.log(pokemon);

        const card = document.createElement('div');
        card.className = 'pokemonCard';

        const image = document.createElement('img');
        image.src = pokemon.image;
        image.alt = pokemon.name;
        card.appendChild(image);

        const name = document.createElement('h2');
        name.innerText = pokemon.name;
        card.appendChild(name);

        const types = document.createElement('p');
        types.innerText = "Types: " + pokemon.types.join();
        card.appendChild(types);

        const base_experience = document.createElement('p');
        base_experience.innerText = "Base experience: " + pokemon.base_experience;
        card.appendChild(base_experience);

        const id = document.createElement('p');
        id.innerText = "Pokémon id: " + pokemon.id;
        card.appendChild(id);

        container.appendChild(card);
    })
}

window.onload = () => {
    loadPage();
};