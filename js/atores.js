export async function getAtores() {
    const url = 'http://localhost:8080/v2/acmefilmes/atores'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.atores
}

export async function getAtor(id) {
    const url = `http://localhost:8080/v2/acmefilmes/ator/${id}`

    const response = await fetch(url)
    const data = await response.json()

    return data.atores[0]
}

export async function postAtor(atores) {
    const url = 'http://localhost:8080/v2/acmefilmes/ator'
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(atores),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function putAtor(ator) {
    const url = `http://localhost:8080/v2/acmefilmes/ator/${ator.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(ator),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function deleteAtor(id) {
    const url = `http://localhost:8080/v2/acmefilmes/ator/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options)

    return response.ok

}