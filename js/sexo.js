export async function getSexos() {
    const url = 'http://localhost:8080/v2/acmefilmes/sexos'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.sexo
}

export async function getSexo(id) {
    const url = `http://localhost:8080/v2/acmefilmes/sexo/${id}`

    const response = await fetch(url)
    const data = await response.json()

    return data.sexo[0]
}