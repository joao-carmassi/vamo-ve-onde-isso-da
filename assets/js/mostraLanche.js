// Importa a função conectaApi do módulo específico
import { conectaApi } from "../../backend/conectaApi.js";

// Seleciona o botão de voltar página no cabeçalho
const botaoVoltarPagina = document.querySelector('.header-item__container__div__botao');

// Adiciona um evento de clique ao botão para voltar à página inicial
botaoVoltarPagina.addEventListener('click', voltaPagina);

// Função que redireciona para a página inicial ao clicar no botão de voltar
function voltaPagina() {
    window.location.href = 'index.html'
}

// Chama a função para criar a tela do lanche
criaTelaLanche();

// Função assíncrona que cria a tela do lanche
async function criaTelaLanche() {
    // Seleciona o container de informações do lanche na página HTML
    const containerInfo = document.querySelector('.container1__lanche');

    // Obtém as informações do lanche armazenadas no armazenamento local
    const lancheInfo = JSON.parse(localStorage.getItem('idItem'));

    try {
        // Obtém os detalhes do item do cardápio da API
        const itensDoCardapio = await conectaApi.pesquisaItem(lancheInfo.classe, lancheInfo.id);

        // Atualiza o conteúdo do container de informações do lanche na página HTML
        containerInfo.innerHTML = `
            <div class="container1__lanche__imagem">
                <img src="${itensDoCardapio.imagem}" alt="">
            </div>
            <div class="container1__lanche__conteudo">
                <h2 class="container1__lanche__conteudo__nome">${itensDoCardapio.nome}</h2>
                <p class="container1__lanche__conteudo__descricao">${itensDoCardapio.descricao}</p>
                <p class="container1__lanche__conteudo__preco">R$ ${itensDoCardapio.preco}</p>
            </div>
        `;
    } catch (e) {
        // Exibe uma mensagem de erro caso ocorra um erro na conexão com a API
        document.querySelector('.container1').innerHTML = `
            <div class="error">
                <p>Eita! Parece que algo deu errado no nosso site. 😬</p>
                <p>Error: ${e}</p>
                <p>Aguenta aí, estamos trabalhando pra resolver isso! 😉</p>
            </div>
        `;
    }
}
