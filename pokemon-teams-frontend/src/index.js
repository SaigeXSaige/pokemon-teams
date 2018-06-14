const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', init)


function init() {
    renderTrainers().then(handleBtns)
}

function handleBtnClick() {
    function getId(element) {
        return element.slice(8)
    }
    
    const firstParent = this.parentElement;
    let trainerId;
    let pokemonId;
    
    if (this.className === 'release') {
        pokemonId = getId(firstParent.id)
        trainerId = getId(firstParent.parentElement.id)
        Adapter.deletePokemon({trainer_id: trainerId}, pokemonId)
        .then(() => firstParent.remove())
    } else {
        trainerId = getId(firstParent.id)
        Adapter.createPokemon({trainer_id: trainerId})
        .then( x => {
            if (!x.error) {
                renderPokemon( x ,firstParent)
                document.querySelector(`li#pokemon-${x.id} button`).addEventListener('click', handleBtnClick)
            } 
        })
    }
}

function handleBtns(){
    const btns = main.querySelectorAll('button')
    btns.forEach( btn => btn.addEventListener('click', handleBtnClick))
}

function renderTrainers() {
    main.innerHTML = ""
    return Adapter.getTrainers()
        .then( trainers => 
            trainers.forEach(trainer => {
                appendDiv(trainer)
                //create new instance of trainer
            })
        )

}

function appendDiv(trainer) {
    div = document.createElement('div')
    div.className = 'card'
    div.id = `trainer-${trainer.id}`
    div.innerHTML = `<p>${trainer.name}</p> <button>Add Pokemon</button>`
    main.appendChild(div)
    listPokemon(trainer.pokemons, div);
}

function listPokemon(pokemons, el) {
    pokemons.forEach((pokemon) => renderPokemon(pokemon, el))
}

function renderPokemon(pokemon, el) {
    const li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release">Release</button>`
    li.id = `pokemon-${pokemon.id}`
    el.appendChild(li)
}

