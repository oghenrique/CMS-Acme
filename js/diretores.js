export async function getDiretores() {
    const url = 'http://localhost:8080/v2/acmefilmes/diretores'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.diretores
}

export async function getDiretor(id) {
    const url = `http://localhost:8080/v2/acmefilmes/diretor/${id}`

    const response = await fetch(url)
    const data = await response.json()

    return data.diretores[0]
}

export async function postDiretor(diretores) {
    const url = 'http://localhost:8080/v2/acmefilmes/diretor'
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(diretores),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function putDiretor(diretor) {
    const url = `http://localhost:8080/v2/acmefilmes/diretor/${diretor.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(diretor),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function deleteDiretor(id) {
    const url = `http://localhost:8080/v2/acmefilmes/diretor/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options)

    return response.ok

}