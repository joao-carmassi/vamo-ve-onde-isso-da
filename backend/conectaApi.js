async function getApiItem(categoria) {
    const conexao = await fetch(`https://api.npoint.io/af7b014f8f4c822b5bdb`);
    const conexaoConvertida = await conexao.json()

    return conexaoConvertida;
}

async function pesquisaItem(categoria, id) {
    const conexao = await fetch(`https://api.npoint.io/af7b014f8f4c822b5bdb/${categoria}/${(id - 1)}`);
    const conexaoConvertida = await conexao.json()

    return conexaoConvertida;
}

export const conectaApi = {
    getApiItem,
    pesquisaItem
}