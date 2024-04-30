import { getClassificacoes, postClassificacao, deleteClassificacao, putClassificacao } from './classificacoes.js'


// Função para preencher a tabela com os classificacoes
async function preencherTabela() {
    const classificacoes = await getClassificacoes()
    const classificacoesBody = document.getElementById('classificacoesBody')

    classificacoes.forEach(classificacao => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = classificacao.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = classificacao.nome
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(classificacao)) 
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirClassificacao(classificacao.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        classificacoesBody.appendChild(tr)
    })
}

// Função para abrir o modal de edição com os detalhes do classificacao preenchidos
function abrirModalEdicao(classificacao) {
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoClassificacao'))
    
    document.getElementById('classificacaoId').value = classificacao.id
    document.getElementById('nomeEditar').value = classificacao.nome
    document.getElementById('siglaEditar').value = classificacao.sigla
    document.getElementById('descricaoEditar').value = classificacao.descricao
    document.getElementById('iconeEditar').value = classificacao.icone
       
    modalEdicao.show()
}

// Função para atualizar um classificacao
async function atualizarClassificacao(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const classificacaoAtualizado = {}
    formData.forEach((value, key) => {
        classificacaoAtualizado[key] = value
    })

    // Envia os dados para a API
    const sucesso = await putClassificacao(classificacaoAtualizado)
    if (sucesso) {
        console.log('classificacao atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoClassificacao'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o classificacao')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovaClassificacao)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarclassificacao = document.getElementById('formEditarClassificacao')
    if (formEditarclassificacao) {
        formEditarclassificacao.addEventListener('submit', atualizarClassificacao)
    } else {
        console.error('Elemento com ID formEditarclassificacao não encontrado.')
    }
})


// Função para salvar um novo classificacao
async function salvarNovaClassificacao() {
    console.log('Função salvarNovaClassificacao() chamada.')
    // Coletar os dados do formulário
    const form = document.getElementById('formNovaClassificacao')
    const formData = new FormData(form)
    const novaClassificacao = {}
    formData.forEach((value, key) => {
        novaClassificacao[key] = value
    })

    console.log('Novo classificacao:', novaClassificacao)

    // Enviar os dados para a API
    const sucesso = await postClassificacao(novaClassificacao)
    if (sucesso) {
        console.log('classificacao adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o classificacao')
    }
}

// Função para excluir um classificacao
async function excluirClassificacao(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteClassificacao(id)
        if (sucesso) {
            console.log('classificacao excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o classificacao')
        }
    })
}
