export async function getGeneros() {
    const url = 'http://localhost:8080/v2/acmefilmes/generos'
    
    const response = await fetch(url)
    const data = await response.json()
    
    return data.generos
}

export async function getGenero (id){
    const url = `http://localhost:8080/v2/acmefilmes/genero/${id}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    return data.generos[0]
}

export async function postGenero (generos) {
    const url = 'http://localhost:8080/v2/acmefilmes/genero'
    const options = {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(generos),
    }

    const response = await fetch (url, options)

    return response.ok

}

export async function putGenero (genero) {
    const url = `http://localhost:8080/v2/acmefilmes/genero/${genero.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(genero),
    }

    const response = await fetch (url, options)

    return response.ok

}

export async function deleteGenero (id) {
    const url = `http://localhost:8080/v2/acmefilmes/genero/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch (url, options)

    return response.ok

}