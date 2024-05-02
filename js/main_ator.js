import { getAtores, postAtor, deleteAtor, putAtor } from './atores.js'
import { formatarData} from './tratamento.js'
import { getSexos } from './sexo.js'

// Função para preencher a tabela com os atores
async function preencherTabela() {
    const atores = await getAtores()
    const atoresBody = document.getElementById('atoresBody')

    atores.forEach(ator => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = ator.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = ator.nome_artistico
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(ator))
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirAtor(ator.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        atoresBody.appendChild(tr)
    })
}

// Função para abrir o modal de edição com os detalhes do ator preenchidos
async function abrirModalEdicao(ator) {
    console.log("ator:", ator)
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoAtor'))

    document.getElementById('atorId').value = ator.id
    document.getElementById('nomeCompletoEditar').value = ator.nome_completo
    document.getElementById('nomeArtisticoEditar').value = ator.nome_artistico
    document.getElementById('biografiaEditar').value = ator.biografia
    document.getElementById('data_nascimentoEditar').value = formatarData(ator.data_nascimento)
    document.getElementById('fotoEditar').value = ator.foto
    
    // Preencher as opções de sexo antes de abrir o modal
    await preencherOpcoesSexoEditar(ator)

    // Verificar se a sexo do ator está sendo acessada corretamente
    console.log("ID da sexo selecionada:", ator.id_sexo)

    // Exibir a sexo do ator selecionada
    const idSexoSelecionado = ator.id_sexo // Supondo que a sexo seja a primeira da lista
    console.log("ID da sexo selecionada:", idSexoSelecionado)
    document.getElementById('sexoEditar').value = idSexoSelecionado

    modalEdicao.show()
}

async function preencherOpcoesSexoEditar() {
    const sexos = await getSexos()
    const selectSexo = document.getElementById('sexoEditar')
    selectSexo.innerHTML = '' // Limpa quaisquer opções anteriores

    sexos.forEach(sexo => {
        const option = document.createElement('option')
        option.value = sexo.id
        option.textContent = sexo.nome
        selectSexo.appendChild(option)
    })
}


// Função para atualizar um ator
async function atualizarSexo(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const atorAtualizado = {}
    formData.forEach((value, key) => {
        atorAtualizado[key] = value
    })

    // Verificar os dados do ator atualizado
    console.log('Dados do ator atualizado:', atorAtualizado)

    // Envia os dados para a API
    const sucesso = await putAtor(atorAtualizado)
    if (sucesso) {
        console.log('ator atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoAtor'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o ator')
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovoAtor)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarAtor = document.getElementById('formEditarAtor')
    if (formEditarAtor) {
        formEditarAtor.addEventListener('submit', atualizarSexo)
    } else {
        console.error('Elemento com ID formEditarAtor não encontrado.')
    }

    // Preencher as opções de sexo quando o documento for carregado
    await preencherOpcoesSexo()
})


async function preencherOpcoesSexo() {
    const sexos = await getSexos()
    console.log('Sexos retornados:', sexos) // Adicionando o console.log aqui
    const selectSexo = document.getElementById('sexo')
    selectSexo.innerHTML = '' // Limpa quaisquer opções anteriores
    sexos.forEach(sexo => {
        const option = document.createElement('option')
        option.value = sexo.id
        option.textContent = sexo.nome
        selectSexo.appendChild(option)
    })
}



async function salvarNovoAtor() {
    // Coletar os dados do formulário
    const form = document.getElementById('formNovoAtor')
    const formData = new FormData(form)
    const novoAtor = {}
    formData.forEach((value, key) => {
        novoAtor[key] = value
    })

    // Formatar a data e o tempo antes de enviar para a API
    novoAtor['data_nascimento'] = formatarData(novoAtor['data_nascimento'])
    
    // Obter o ID da sexo selecionada
    const idSexoSelecionado = formData.get('id_sexo')
    novoAtor['id_sexo'] = idSexoSelecionado


    // Enviar os dados para a API
    const sucesso = await postAtor(novoAtor)
    if (sucesso) {
        console.log('ator adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o ator')
    }
}

// Função para excluir um ator
async function excluirAtor(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteAtor(id)
        if (sucesso) {
            console.log('ator excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o ator')
        }
    })
}
