import { getGeneros, postGenero, deleteGenero, putGenero } from './generos.js'

// Função para preencher a tabela com os generos
async function preencherTabela() {
    const generos = await getGeneros()
    console.log(generos)
    const generosBody = document.getElementById('generosBody')

    generos.forEach(genero => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = genero.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = genero.nome
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(genero)) 
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirGenero(genero.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        generosBody.appendChild(tr)
    })
}

function abrirModalEdicao(genero) {
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoGenero'))
    
    document.getElementById('generoId').value = genero.id
    document.getElementById('nomeEditar').value = genero.nome
        
    modalEdicao.show()
}

// Função para atualizar um genero
async function atualizarGenero(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const generoAtualizado = {}
    formData.forEach((value, key) => {
        generoAtualizado[key] = value
    })

    // Envia os dados para a API
    const sucesso = await putGenero(generoAtualizado)
    if (sucesso) {
        console.log('genero atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoGenero'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o genero')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovoGenero)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarGenero = document.getElementById('formEditarGenero')
    if (formEditarGenero) {
        formEditarGenero.addEventListener('submit', atualizarGenero)
    } else {
        console.error('Elemento com ID formEditarGenero não encontrado.')
    }
})


// Função para salvar um novo genero
async function salvarNovoGenero() {
    console.log('Função salvarNovoGenero() chamada.')
    // Coletar os dados do formulário
    const form = document.getElementById('formNovoGenero')
    const formData = new FormData(form)
    const novoGenero = {}
    formData.forEach((value, key) => {
        novoGenero[key] = value
    })

    console.log('Novo genero:', novoGenero)

    const sucesso = await postGenero(novoGenero)
    if (sucesso) {
        console.log('genero adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o genero')
    }
}

// Função para excluir um genero
async function excluirGenero(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteGenero(id)
        if (sucesso) {
            console.log('genero excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o genero')
        }
    })
}
