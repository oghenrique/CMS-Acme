import { getFilmes, postFilme, deleteFilme, putFilme } from './filmes.js'
import { formatarData, formatarTempo } from './tratamento.js'


// Função para preencher a tabela com os filmes
async function preencherTabela() {
    const filmes = await getFilmes()
    const filmesBody = document.getElementById('filmesBody')

    filmes.forEach(filme => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = filme.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = filme.titulo
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(filme)) 
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirFilme(filme.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        filmesBody.appendChild(tr)
    })
}

// Função para abrir o modal de edição com os detalhes do filme preenchidos
function abrirModalEdicao(filme) {
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoFilme'))
    
    document.getElementById('filmeId').value = filme.id
    document.getElementById('tituloEditar').value = filme.titulo
    document.getElementById('sinopseEditar').value = filme.sinopse
    document.getElementById('data_lancamentoEditar').value = formatarData(filme.data_lancamento)
    document.getElementById('duracaoEditar').value = formatarTempo(filme.duracao)
    document.getElementById('foto_capaEditar').value = filme.foto_capa
    document.getElementById('valor_unitarioEditar').value = filme.valor_unitario
    
    modalEdicao.show()
}

// Função para atualizar um filme
async function atualizarFilme(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const filmeAtualizado = {}
    formData.forEach((value, key) => {
        filmeAtualizado[key] = value
    })

    // Envia os dados para a API
    const sucesso = await putFilme(filmeAtualizado)
    if (sucesso) {
        console.log('Filme atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoFilme'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o filme')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovoFilme)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarFilme = document.getElementById('formEditarFilme')
    if (formEditarFilme) {
        formEditarFilme.addEventListener('submit', atualizarFilme)
    } else {
        console.error('Elemento com ID formEditarFilme não encontrado.')
    }
})


// Função para salvar um novo filme
async function salvarNovoFilme() {
    console.log('Função salvarNovoFilme() chamada.')
    // Coletar os dados do formulário
    const form = document.getElementById('formNovoFilme')
    const formData = new FormData(form)
    const novoFilme = {}
    formData.forEach((value, key) => {
        novoFilme[key] = value
    })

    console.log('Novo filme:', novoFilme)


    // Formatar a data e o tempo antes de enviar para a API
    novoFilme['data_lancamento'] = formatarData(novoFilme['data_lancamento'])
    novoFilme['duracao'] = formatarTempo(novoFilme['duracao'])

    // Enviar os dados para a API
    const sucesso = await postFilme(novoFilme)
    if (sucesso) {
        console.log('Filme adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o filme')
    }
}

// Função para excluir um filme
async function excluirFilme(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteFilme(id)
        if (sucesso) {
            console.log('Filme excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o filme')
        }
    })
}
