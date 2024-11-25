document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.box__form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formInput = document.querySelector('.box__form__input').value.toLowerCase();
        const pokemonImage = document.querySelector('.box__pokemon__image');
        const pokemonName = document.querySelector('.box__name');
        const pokemonStats = document.querySelector('.box__right__container');

        function acharPoke() {
            fetch(`https://pokeapi.co/api/v2/pokemon/${formInput}`)
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error('Pokémon não encontrado');
                    }
                    return res.json();
                })
                .then(function (json) {
                    const pokemonTypes = json.types.map(typeInfo => typeInfo.type.name).join(', ');
                    const pokemonAbilities = json.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

                    pokemonImage.innerHTML = `<img class="box__pokemon__image__img" src="${json.sprites.front_default}" alt="${json.name}">`;
                    pokemonName.innerHTML = `<span class="box__name__text"> Nome : ${json.name} </span>`;

                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${formInput}`)
                        .then(function (res) {
                            if (!res.ok) {
                                throw new Error('Erro ao buscar espécies');
                            }
                            return res.json();
                        })
                        .then(function (speciesJson) {
                            const generation = speciesJson.generation.name;

                            pokemonStats.innerHTML = `
                            <span class="box__right__item"> Número : ${json.id} </span>
                                  <span class="box__right__item"> Altura : ${json.height * 10}cm </span>
                            <span class="box__right__item"> Tipo : ${pokemonTypes} </span>
                            <span class="box__right__item"> Habilidades : ${pokemonAbilities} </span>
                            <span class="box__right__item"> Geração : ${generation} </span>
                            `;
                        })
                        .catch(function (erro) {
                            alert(`Erro ao buscar geração do Pokémon: ${erro.message}`);
                        });
                })
                .catch(function (erro) {
                    alert(`Erro ao buscar Pokémon: ${erro.message}`);
                });
        }

        acharPoke();
    });
});
