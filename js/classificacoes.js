export async function getClassificacoes() {
    const url = 'http://localhost:8080/v2/acmefilmes/classificacoes'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.classificacoes
}

export async function getClassificacao(id) {
    const url = `http://localhost:8080/v2/acmefilmes/classificacao/${id}`

    const response = await fetch(url)
    const data = await response.json()

    return data.classificacoes[0]
}

export async function postClassificacao(classificacoes) {
    const url = 'http://localhost:8080/v2/acmefilmes/classificacao'
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(classificacoes),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function putClassificacao(classificacao) {
    const url = `http://localhost:8080/v2/acmefilmes/classificacao/${classificacao.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(classificacao),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function deleteClassificacao(id) {
    const url = `http://localhost:8080/v2/acmefilmes/classificacao/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options)

    return response.ok

}