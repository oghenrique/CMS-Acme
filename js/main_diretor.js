import { getDiretores, postDiretor, deleteDiretor, putDiretor } from './diretores.js'
import { formatarData} from './tratamento.js'
import { getSexos } from './sexo.js'

// Função para preencher a tabela com os Diretores
async function preencherTabela() {
    const diretores = await getDiretores()
    const diretoresBody = document.getElementById('diretoresBody')

    diretores.forEach(diretor => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = diretor.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = diretor.nome_artistico
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(diretor))
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirDiretor(diretor.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        diretoresBody.appendChild(tr)
    })
}

// Função para abrir o modal de edição com os detalhes do Diretor preenchidos
async function abrirModalEdicao(diretor) {
    console.log("Diretor:", diretor)
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoDiretor'))

    document.getElementById('DiretorId').value = diretor.id
    document.getElementById('nomeCompletoEditar').value = diretor.nome_completo
    document.getElementById('nomeArtisticoEditar').value = diretor.nome_artistico
    document.getElementById('biografiaEditar').value = diretor.biografia
    document.getElementById('data_nascimentoEditar').value = formatarData(diretor.data_nascimento)
    document.getElementById('fotoEditar').value = diretor.foto
    
    // Preencher as opções de sexo antes de abrir o modal
    await preencherOpcoesSexoEditar(diretor)

    // Verificar se a sexo do Diretor está sendo acessada corretamente
    console.log("ID da sexo selecionada:", diretor.id_sexo)

    // Exibir a sexo do Diretor selecionada
    const idSexoSelecionado = diretor.id_sexo // Supondo que a sexo seja a primeira da lista
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


// Função para atualizar um Diretor
async function atualizarSexo(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const diretorAtualizado = {}
    formData.forEach((value, key) => {
        diretorAtualizado[key] = value
    })

    // Verificar os dados do Diretor atualizado
    console.log('Dados do Diretor atualizado:', diretorAtualizado)

    // Envia os dados para a API
    const sucesso = await putDiretor(diretorAtualizado)
    if (sucesso) {
        console.log('Diretor atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoDiretor'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o Diretor')
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovoDiretor)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarDiretor = document.getElementById('formEditarDiretor')
    if (formEditarDiretor) {
        formEditarDiretor.addEventListener('submit', atualizarSexo)
    } else {
        console.error('Elemento com ID formEditarDiretor não encontrado.')
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



async function salvarNovoDiretor() {
    // Coletar os dados do formulário
    const form = document.getElementById('formNovoDiretor')
    const formData = new FormData(form)
    const novoDiretor = {}
    formData.forEach((value, key) => {
        novoDiretor[key] = value
    })

    // Formatar a data e o tempo antes de enviar para a API
    novoDiretor['data_nascimento'] = formatarData(novoDiretor['data_nascimento'])
    
    // Obter o ID da sexo selecionada
    const idSexoSelecionado = formData.get('id_sexo')
    novoDiretor['id_sexo'] = idSexoSelecionado


    // Enviar os dados para a API
    const sucesso = await postDiretor(novoDiretor)
    if (sucesso) {
        console.log('Diretor adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o Diretor')
    }
}

// Função para excluir um Diretor
async function excluirDiretor(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteDiretor(id)
        if (sucesso) {
            console.log('Diretor excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o Diretor')
        }
    })
}
