const pokemonClass = (() => {
    return class Pokemon {
        constructor(nickname, species, trainer_id) {
            this.nickname = nickname
            this.species = species
            this.trainer_id = trainer_id
            //find trainer by id and add to pokemon array
        }
    }
})()