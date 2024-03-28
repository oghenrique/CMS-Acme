// Função para formatar a data no formato esperado pela API
export function formatarData(data) {
    const dataFormatada = new Date(data)
    const ano = dataFormatada.getFullYear()
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0')
    const dia = dataFormatada.getDate().toString().padStart(2, '0')
    return `${ano}-${mes}-${dia}`
}

// Função para formatar o tempo no formato esperado pela API
export function formatarTempo(tempo) {
    return tempo + ':00'
}
