class Adapter {
    static getTrainers() {
        return fetch(TRAINERS_URL)
            .then(resp => resp.json())
    }

    static createPokemon(data) {
        return fetch(POKEMONS_URL, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
          })
          .then( resp => resp.json())
        //   .then(console.log)
    }

    static deletePokemon(data, id) {
        return fetch(POKEMONS_URL + `/${id}`, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
              'content-type': 'application/json'
            },
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          })
          .then( resp => resp.json())
          .then(console.log)
    }
}
