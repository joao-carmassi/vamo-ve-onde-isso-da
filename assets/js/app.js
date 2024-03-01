// Importa a função conectaApi do módulo específico
import { conectaApi } from "../../backend/conectaApi.js";

// Declaração da variável global categoriaItem
var categoriaItem;
var nomeChaves;

// Função assíncrona que cria o cardápio
async function criaCardapio() {
    // Função interna assíncrona que obtém os dados do cardápio da API
    async function getApiCardapio() {
        try {
            // Chama a função conectaApi para obter os itens do cardápio
            var itensDoCardapio = await conectaApi.getApiItem();
            console.log(itensDoCardapio)
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
        // Chama a função para criar o container UL com os itens do cardápio
        criaContainerUl(itensDoCardapio);
    }
    // Chama a função interna para obter os dados do cardápio da API
    getApiCardapio();
}
// Chama a função para criar o cardápio
criaCardapio();

// Função que cria o container UL com os itens do cardápio
function criaContainerUl(itensDoCardapio) {
    // Extrai as palavras ordenadas e os nomes das chaves dos itens do cardápio
    var { palavrasOrdenadas, nomeChaves } = pegaNomeDasListas(itensDoCardapio);

    // Itera sobre as palavras ordenadas para criar o container UL
    for (let index = 0; index < palavrasOrdenadas.length; index++) {
        const listaASerPesquisada = itensDoCardapio[nomeChaves[index]];

        const container1 = document.querySelector('.container1');
        container1.innerHTML += `
            <ul class="container1__lista-${palavrasOrdenadas[index]}">
                <div class="div-item-titulo">
                    <h2 class="item-titulo">${palavrasOrdenadas[index]}</h2>
                </div>
            </ul>
        `;

        // Chama a função para gerar os itens na tela
        geraItensNaTelas(listaASerPesquisada, palavrasOrdenadas[index]);
    }
}

// Função que obtém os nomes das listas do cardápio
function pegaNomeDasListas(itensDoCardapio) {
    // Obtém as chaves dos itens do cardápio
    nomeChaves = Object.keys(itensDoCardapio);

    // Ordena as chaves com base no número inicial
    nomeChaves.sort((a, b) => {
        let numA = parseInt(a.split(' ')[0]);
        let numB = parseInt(b.split(' ')[0]);
        return numA - numB;
    });

    // Extrai as palavras ordenadas dos nomes das chaves
    let palavrasOrdenadas = nomeChaves.map(item => item.split(' ')[1]);
    return { palavrasOrdenadas, nomeChaves };
}

// Função que gera os itens na tela
function geraItensNaTelas(itensDoCardapio, chave) {
    const containerUl = document.querySelector(`.container1__lista-${chave}`);

    // Ordena os elementos do menor ao maior com base no preco
    const itensOrdenados = itensDoCardapio.sort((a, b) => parseFloat(a.preco.replace(',', '.')) - parseFloat(b.preco.replace(',', '.')));

    // Itera sobre os itens do cardápio para criar os elementos HTML
    itensOrdenados.forEach(element => {
        containerUl.innerHTML += `
            <div id="${element.id}" class="container1__lista__container-itens ${itensDoCardapio[0].categoria}" data-pagina>
                <li class="container1__lista__itens">
                    <div class="container1__lista__itens__div-conteudo">
                        <h2 class="container1__lista__itens__div-conteudo__nome">
                            ${element.nome}
                        </h2>
                        <p class="container1__lista__itens__div-conteudo__descricao">
                            ${element.descricao}
                        </p>
                        <p class="container1__lista__itens__div-conteudo__preco">
                            R$ ${element.preco}
                        </p>
                    </div>
                    <div class="container1__lista__itens__div-img">
                        <img src="${element.imagem}" alt="">
                    </div>
                </li>
            </div>
            <hr>
        `;
    });
    // Chama a função para gerar os dados das páginas
    gerarDadosPaginas();
}

// Função que gera os dados das páginas
function gerarDadosPaginas() {
    // Seleciona todos os elementos com atributo data-pagina e adiciona um evento de clique
    const paginas = document.querySelectorAll('[data-pagina]')
    paginas.forEach(pagina => pagina.addEventListener('click', procuraItem));
}

// Função assíncrona que trata do evento de clique em um item
async function procuraItem() {
    const idItem = this.id
    const classesItem = this.className.split(' ');
    const segundaClasseItem = classesItem[1];

    function encontrarElemento(lista, x) {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].includes(x)) {
                return lista[i];
            }
        }
    }

    const resultado = encontrarElemento(nomeChaves, segundaClasseItem);

    // Define as informações do item a serem armazenadas
    const infoItem = {
        id: idItem,
        classe: resultado
    }

    // Armazena as informações do item no armazenamento local
    localStorage.setItem('idItem', JSON.stringify(infoItem));

    // Redireciona para a página do item
    window.location.href = 'item.html';
}