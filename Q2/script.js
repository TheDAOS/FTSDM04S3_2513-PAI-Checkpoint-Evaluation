const displayPokemon = {
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
    pokemonDataList: [],
    pokemonCardDataList: new Array(),
    async loadPage() {
        await this.fetchPokemonData();
        await this.fetchPokemonCardData();
        this.displayCard();
        // console.log(this.pokemonData);
    },
    async fetchPokemonData() {
        try {
            const response = await fetch(this.baseURL);
            const data = await response.json();

            this.pokemonDataList = data.results;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPokemonCardData() {
        this.pokemonDataList.forEach(async (pokemon) => { 
            let data = await this.fetchPokemonInfo(pokemon.url)
            this.pokemonCardDataList.push("sad");
        })
    },
    async fetchPokemonInfo(url) {
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
            // this.pokemonCardDataList.push(obj);
            return obj;
        } catch (error) {
            console.log(error);
        }
    },
    displayCard() {
        const container = document.getElementById('displayPokemon');
        container.innerHTML = "";

        // console.log(displayPokemon.pokemonCardDataList);
        this.pokemonCardDataList.forEach((pokemon) => {
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
}

window.onload = () => {
    displayPokemon.loadPage();
};