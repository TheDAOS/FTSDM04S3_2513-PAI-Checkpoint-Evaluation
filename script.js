let baseURL = 'https://pokeapi.co/api/v2/pokemon';
let pokemonDataList = [];
// let pokemonCardDataList = [];

let pageControl = {
    nextURL: '',
    prevURL: '',
    pageNo: 0,
    nextPage() {
        this.pageNo++;
        loadPage(this.nextURL);
        document.getElementById('pageNo').innerText = this.pageNo + 1;
        // console.log(this.prevPageStack);
        // console.log(this.pageNo);
    },
    previousPage() {
        if (this.pageNo > 0) {
            this.pageNo--;
            document.getElementById('pageNo').innerText = this.pageNo + 1;
            loadPage(this.prevURL);
        }
    }
}

async function loadPage(url) {
    await fetchPokemonData(url);
    // await fetchPokemonCardData();
    displayCard();
    // console.log(pokemonData);
}

async function fetchPokemonData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        pageControl.nextURL = data.next;
        pageControl.prevURL = data.previous;
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
        // console.log(pokemon);

        let typeFilter = document.getElementById('pokemonType').value;
        // console.log(typeFilter);
        if ((typeFilter === "All" || pokemon.types.indexOf(typeFilter) !== -1) && search(pokemon.name, pokemon.types, pokemon.id)) {

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
        }
    })
}

window.onload = () => {
    loadPage(baseURL);
    getDataInOptions();
};




// filter
function getDataInOptions() {
    fetch('https://pokeapi.co/api/v2/type?limit=21')
        .then(response => response.json())
        .then(data => {
            let option = document.getElementById('pokemonType');
            // console.log(data);

            data.results.forEach(type => {
                let select = document.createElement('option')
                select.value = type.name;
                select.innerText = type.name;

                option.appendChild(select);
            })

        }).catch(error => console.log(error))
}


function search(name, type, id) {
    let value = document.getElementById('SearchBar').value;
    if (value === "") return true;

    if (name.includes(value) || id.includes(value*1)) return true

    return false;
}


document.getElementById('pokemonType').addEventListener('change', () => {
    displayCard();
})

let limit;
document.getElementById('SearchBar').addEventListener('keyup', () => {
    clearTimeout(limit);

    limit = setTimeout(() => {
        displayCard();
    }, 500);
    // displayCard();
})