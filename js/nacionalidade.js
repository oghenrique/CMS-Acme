export async function getNacionalidades() {
    const url = 'http://localhost:8080/v2/acmefilmes/nacionalidades'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.nacionalidades
}

export async function getNacionalidade(id) {
    const url = `http://localhost:8080/v2/acmefilmes/nacionalidade/${id}`

    const response = await fetch(url)
    const data = await response.json()

    return data.nacionalidades[0]
}

export async function postNacionalidade(nacionalidades) {
    const url = 'http://localhost:8080/v2/acmefilmes/nacionalidade'
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(nacionalidades),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function putNacionalidade(nacionalidade) {
    const url = `http://localhost:8080/v2/acmefilmes/nacionalidade/${nacionalidade.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(nacionalidade),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function deleteNacionalidade(id) {
    const url = `http://localhost:8080/v2/acmefilmes/nacionalidade/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options)

    return response.ok

}