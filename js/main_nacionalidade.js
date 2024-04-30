import { getNacionalidades, postNacionalidade, deleteNacionalidade, putNacionalidade } from './nacionalidade.js'

// Função para preencher a tabela com os nacionalidades
async function preencherTabela() {
    const nacionalidades = await getNacionalidades()
    console.log(nacionalidades)
    const nacionalidadesBody = document.getElementById('nacionalidadesBody')

    nacionalidades.forEach(nacionalidade => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = nacionalidade.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = nacionalidade.nome
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(nacionalidade)) 
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirNacionalidade(nacionalidade.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        nacionalidadesBody.appendChild(tr)
    })
}

function abrirModalEdicao(nacionalidade) {
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoNacionalidade'))
    
    document.getElementById('nacionalidadeId').value = nacionalidade.id
    document.getElementById('nomeEditar').value = nacionalidade.nome
        
    modalEdicao.show()
}

// Função para atualizar um nacionalidade
async function atualizarNacionalidade(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const nacionalidadeAtualizado = {}
    formData.forEach((value, key) => {
        nacionalidadeAtualizado[key] = value
    })

    // Envia os dados para a API
    const sucesso = await putNacionalidade(nacionalidadeAtualizado)
    if (sucesso) {
        console.log('nacionalidade atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoNacionalidade'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o nacionalidade')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovaNacionalidade)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarNacionalidade = document.getElementById('formEditarNacionalidade')
    if (formEditarNacionalidade) {
        formEditarNacionalidade.addEventListener('submit', atualizarNacionalidade)
    } else {
        console.error('Elemento com ID formEditarNacionalidade não encontrado.')
    }
})


// Função para salvar um novo nacionalidade
async function salvarNovaNacionalidade() {
    console.log('Função salvarNovaNacionalidade() chamada.')
    // Coletar os dados do formulário
    const form = document.getElementById('formNovaNacionalidade')
    const formData = new FormData(form)
    const novaNacionalidade = {}
    formData.forEach((value, key) => {
        novaNacionalidade[key] = value
    })

    console.log('Novo nacionalidade:', novaNacionalidade)

    const sucesso = await postNacionalidade(novaNacionalidade)
    if (sucesso) {
        console.log('nacionalidade adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o nacionalidade')
    }
}

// Função para excluir um nacionalidade
async function excluirNacionalidade(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteNacionalidade(id)
        if (sucesso) {
            console.log('nacionalidade excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o nacionalidade')
        }
    })
}
